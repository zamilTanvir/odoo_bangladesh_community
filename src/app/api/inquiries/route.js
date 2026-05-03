import { prisma } from "@/lib/prisma";

function isValidEmail(email) {
  return typeof email === "string" && email.includes("@") && email.includes(".");
}

export async function POST(req) {
  try {
    const body = await req.json();

    // Honeypot (bot trap). If filled, pretend success but do nothing.
    const hp = body?.hp || body?.website || "";
    if (typeof hp === "string" && hp.trim().length > 0) {
      return Response.json({ ok: true });
    }

    const email = body?.email;
    if (!isValidEmail(email)) {
      return Response.json(
        { ok: false, error: "Valid email is required." },
        { status: 400 }
      );
    }

    // Lightweight throttle by email to reduce spam bursts.
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
        inquiryType: body?.type || "CONSULTATION",
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

    return Response.json({ ok: true, lead });
  } catch (error) {
    console.error("[api/inquiries] error", error);
    return Response.json(
      { ok: false, error: "Failed to submit inquiry." },
      { status: 500 }
    );
  }
}

