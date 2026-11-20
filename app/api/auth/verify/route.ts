import { NextResponse } from "next/server";
import { compare } from "bcrypt";

import prismadb from "@/lib/prismadb";

const MAX_ATTEMPTS = 5;

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { email, verificationCode } = body ?? {};

    if (typeof email !== "string" || typeof verificationCode !== "string") {
      return new NextResponse("Email and code are required", { status: 400 });
    }

    const user = await prismadb.user.findUnique({
      where: { email },
      omit: {
        verificationCode: false,
        verificationCodeExpires: false,
        verificationAttempts: false,
      },
    });

    const invalid = new NextResponse("Invalid or expired code", {
      status: 400,
    });

    if (!user || user.isVerified !== false || !user.verificationCode) {
      return invalid;
    }

    if (
      (user.verificationAttempts ?? 0) >= MAX_ATTEMPTS ||
      !user.verificationCodeExpires ||
      user.verificationCodeExpires.getTime() < Date.now()
    ) {
      return new NextResponse(
        "Code expired or too many attempts. Please register again.",
        { status: 429 }
      );
    }

    const isValid = await compare(verificationCode, user.verificationCode);

    if (!isValid) {
      await prismadb.user.update({
        where: { id: user.id },
        data: { verificationAttempts: { increment: 1 } },
      });
      return invalid;
    }

    await prismadb.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationCode: null,
        verificationCodeExpires: null,
        verificationAttempts: 0,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("[VERIFY_USER]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
