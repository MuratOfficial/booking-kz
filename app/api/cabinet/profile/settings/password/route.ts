import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireUser } from "@/lib/auth-guard";
import { compare, hash } from "bcrypt";

export async function PATCH(req: Request) {
  try {
    const { user: sessionUser, error } = await requireUser();
    if (error) return error;

    const body = await req.json();
    const { password, currentPassword } = body ?? {};

    if (
      typeof password !== "string" ||
      password.length < 6 ||
      password.length > 128
    ) {
      return new NextResponse("Password must be 6-128 characters", {
        status: 400,
      });
    }

    if (typeof currentPassword !== "string" || !currentPassword) {
      return new NextResponse("Current password is required", {
        status: 400,
      });
    }

    const currentUser = await prismadb.user.findUnique({
      where: { id: sessionUser.id },
      omit: { passwordHash: false },
    });

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isCurrentValid = await compare(
      currentPassword,
      currentUser.passwordHash
    );
    if (!isCurrentValid) {
      return new NextResponse("Current password is incorrect", {
        status: 403,
      });
    }

    const hashedPassword = await hash(password, 12);

    await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        password: null,
        passwordHash: hashedPassword,
        notifications: [
          ...currentUser.notifications,
          {
            type: "Аккаунт",
            text: "Пароль был изменен",
            isOpened: false,
          },
        ],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("[user_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
