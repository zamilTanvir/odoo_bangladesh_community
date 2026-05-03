import { prisma } from "@/lib/prisma";

function isValidEmail(email) {
  return typeof email === "string" && email.includes("@") && email.includes(".");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const email = body?.email;

    // Honeypot (bot trap).
    const hp = body?.hp || body?.website || "";
    if (typeof hp === "string" && hp.trim().length > 0) {
      return Response.json({ ok: true });
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
        inquiryType: "WORKSHOP",
        name: body?.name || null,
        email,
        phone: body?.phone || null,
        company: body?.company || null,
        role: body?.role || null,
        source: body?.source || null,
        utmSource: body?.utmSource || null,
        utmMedium: body?.utmMedium || null,
        utmCampaign: body?.utmCampaign || null,
        message: body?.message || null,
      },
      select: { id: true, email: true, createdAt: true },
    });

    const registration = await prisma.workshopRegistration.create({
      data: {
        eventId: body?.eventId || null,
        track: body?.track || null,
        topic: body?.topic || null,
        cohort: body?.cohort || null,
        leadInquiryId: lead.id,
      },
      select: { id: true, createdAt: true, track: true, topic: true, cohort: true },
    });

    return Response.json({ ok: true, lead, registration });
  } catch (error) {
    console.error("[api/workshops/register] error", error);
    return Response.json(
      { ok: false, error: "Failed to register for workshop." },
      { status: 500 }
    );
  }
}

