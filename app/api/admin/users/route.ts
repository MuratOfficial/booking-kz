import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireAdmin } from "@/lib/auth-guard";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const body = await req.json();

    const {
      username,
      email,
      phone,
      name,
      password,
      accessType,
      status,
      totalBalance,
      bonusBalance,
    } = body;

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    if (typeof password !== "string" || password.length < 6) {
      return new NextResponse("Password must be at least 6 characters", {
        status: 400,
      });
    }

    const hashedPassword = await hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        username,
        status,
        phone,
        totalBalance,
        bonusBalance,
        name,
        email,
        passwordHash: hashedPassword,
        isVerified: true,
        notifications: {
          type: "Регистрация",
          text: "Вы успешно зарегистрировались в системе",
          isOpened: false,
        },
        accessType,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
