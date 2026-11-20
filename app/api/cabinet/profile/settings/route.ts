import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireUser } from "@/lib/auth-guard";

const optionalString = (value: unknown, max = 200) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" && value.length <= max);

export async function PATCH(req: Request) {
  try {
    const { user: currentUser, error } = await requireUser();
    if (error) return error;

    const body = await req.json();

    const { username, email, phone, name } = body ?? {};

    if (
      !optionalString(username, 100) ||
      !optionalString(email, 254) ||
      !optionalString(phone, 30) ||
      !optionalString(name, 100)
    ) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new NextResponse("Invalid email", { status: 400 });
    }

    const user = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        username,
        phone,
        name,
        email,
        notifications: [
          ...currentUser.notifications,
          {
            type: "Аккаунт",
            text: "Данные аккаунта были изменены",
            isOpened: false,
          },
        ],
      },
      select: { id: true, username: true, email: true, phone: true, name: true },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[user_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
