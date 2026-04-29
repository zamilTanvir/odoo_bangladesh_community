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

    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {
        name: body?.name || null,
        source: body?.source || null,
      },
      create: {
        email,
        name: body?.name || null,
        source: body?.source || null,
      },
      select: { id: true, email: true, createdAt: true },
    });

    return Response.json({ ok: true, subscriber });
  } catch (error) {
    console.error("[api/newsletter] error", error);
    return Response.json(
      { ok: false, error: "Failed to submit newsletter signup." },
      { status: 500 }
    );
  }
}

