import { prisma } from "@/lib/prisma";

// Minimal valid PDF (placeholder). For real course syllabi, replace with actual PDFs.
const MINIMAL_PDF_BASE64 =
  "JVBERi0xLjEKJcKlwrHDqwoKMSAwIG9iagoKPDwgL1R5cGUgL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PCAvVHlwZSAvUGFnZXMKICAgIC9LaWRzIFszIDAgUl0KICAgIC9Db3VudCAxCiAgICAgL01lZGlhQm94IFswIDAgMzAwIDE0NF0KICA+PgplbmRvYmoKMyAwIG9iagoKICA8PCAvVHlwZSAvUGFnZQogICAgIC9QYXJlbnQgMiAwIFIKICAgICAgL1Jlc291cmNlcyA8PCAvRm9udCA8PCAvRjEgMTggMCBSPiAKICAgICAgICAgIDw8IC9UeXBlIC9Gb250CiAgICAgICAgICAgICAgIC9TdWJ0eXBlIC9UeXBlMQogICAgICAgICAgICAgICAgIC9CYXNlRm9udCAvVGltZXNSb21hbgogICAgICAgICAgICAgID4+CiAgICAgICA+PgogICAgICA+PgogICAgIC9Db250ZW50cyA0IDAgUgovICAgPj4KZW5kb2JqCgo0IDAgb2JqCgo8PCAvTGVuZ3RoIDU1ID4+CnN0cmVhbQogIEJUCiAgICAvRjEgMTggVGYKICAgIDAgMCBUZAogICAgKEhlbGxvIFdvcmxkKSBUagogICAgRVQKZW5kc3RyZWFtCmVuZG9iagoK eHJlZgowIDUgCjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxOCAwMDAwMCBuIAowMDAwMDAwMDc3IDAwMDAwIG4gCjAwMDAwMDAxNzggMDAwMDAgbiAKMDAwMDAwMDQ1NyAwMDAwMCBuIAp0cmFpbGVyCiAgPDwgL1Jvb3QgMSAwIFIKICAgIC9TaXplIDUKICA+PgpzdGFydHhyZWYKNjY1CiUlRU9GCg==";

function isValidEmail(email) {
  return typeof email === "string" && email.includes("@") && email.includes(".");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const email = body?.email;
    const topic = body?.topic || body?.topicSlug || null;

    // Honeypot (bot trap).
    const hp = body?.hp || body?.website || "";
    if (typeof hp === "string" && hp.trim().length > 0) {
      return Response.json({ ok: true, downloadUrl: "/api/downloads/syllabus" });
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { ok: false, error: "Valid email is required." },
        { status: 400 }
      );
    }

    const recentCount = await prisma.leadInquiry.count({
      where: {
        email,
        createdAt: { gt: new Date(Date.now() - 60 * 1000) },
      },
    });
    if (recentCount >= 3) {
      return Response.json(
        { ok: false, error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const lead = await prisma.leadInquiry.create({
      data: {
        inquiryType: "ASSESSMENT",
        name: body?.name || null,
        email,
        phone: body?.phone || null,
        company: body?.company || null,
        role: body?.role || null,
        source: body?.source || null,
        utmSource: body?.utmSource || null,
        utmMedium: body?.utmMedium || null,
        utmCampaign: body?.utmCampaign || null,
        message:
          body?.message ||
          (topic ? `Requested syllabus for: ${topic}` : "Requested syllabus"),
      },
      select: { id: true, email: true },
    });

    const download = await prisma.freeAssessmentDownload.create({
      data: {
        downloadType: topic ? `SYLLABUS:${topic}` : "SYLLABUS",
        leadInquiryId: lead.id,
      },
      select: { id: true, createdAt: true },
    });

    return Response.json({
      ok: true,
      downloadId: download.id,
      downloadUrl: `/api/downloads/syllabus?downloadId=${download.id}`,
    });
  } catch (error) {
    console.error("[api/downloads/syllabus] POST error", error);
    return Response.json(
      { ok: false, error: "Failed to request syllabus." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const downloadId = searchParams.get("downloadId");

    if (!downloadId) {
      return Response.json({ ok: false, error: "Missing downloadId." }, { status: 400 });
    }

    const download = await prisma.freeAssessmentDownload.findUnique({
      where: { id: downloadId },
      select: { id: true },
    });

    if (!download) {
      return Response.json({ ok: false, error: "Download token not found." }, { status: 404 });
    }

    const pdfBytes = Buffer.from(
      MINIMAL_PDF_BASE64.replace(/\s+/g, ""),
      "base64"
    );

    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=\"Odoo-Syllabus.pdf\"",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[api/downloads/syllabus] GET error", error);
    return Response.json(
      { ok: false, error: "Failed to generate syllabus PDF." },
      { status: 500 }
    );
  }
}

