import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/auth";

export async function POST(req: Request) {
  try {
    // const session = await getServerSession(authOptions);

    // const userIdData = JSON.parse(JSON.stringify(session));

    // const admin = await prismadb.user.findUnique({
    //   where: {
    //     id: userIdData?.user?.id,
    //   },
    // });

    // if (admin?.isAdmin === false) {
    //   return new NextResponse("Access denied", { status: 401 });
    // }

    const body = await req.json();

    const { username, email, phone, name, password } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const hashedPassword = await hash(password.password, 12);

    const users = await prismadb.user.create({
      data: {
        username,
        email,
        phone,
        name,
        password: password.password,
        passwordHash: hashedPassword,
        notifications: {
          text: "Добро пожаловать в etazhi.kz",
          type: "Аккаунт",
          isOpened: false,
        },
      },
    });

    // try {
    //   await sendWhatsAppNotification(
    //     userPhoneNumber,
    //     "Автошкола TORE приветствует вас!"
    //   );
    //   NextResponse.json({ message: "Registration successful!" });
    // } catch (error) {
    //   console.error("Failed to send welcome notification:", error);
    //   NextResponse.json({ error: "Failed to send welcome notification" });
    // }

    return NextResponse.json(users);
  } catch (error) {
    console.log("[REGISTER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
