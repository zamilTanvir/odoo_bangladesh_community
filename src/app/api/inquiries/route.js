import { prisma } from "@/lib/prisma";

function isValidEmail(email) {
  return typeof email === "string" && email.includes("@") && email.includes(".");
}

export async function POST(req) {
  try {
    const body = await req.json();

    const email = body?.email;
    if (!isValidEmail(email)) {
      return Response.json(
        { ok: false, error: "Valid email is required." },
        { status: 400 }
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

