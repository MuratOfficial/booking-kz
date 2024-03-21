import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { hash } from "bcrypt";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const session = await getServerSession(authOptions);
    const userIdData = JSON.parse(JSON.stringify(session))?.user;

    let userData;

    if (session?.user) {
      userData = await prismadb?.user?.findUnique({
        where: {
          id: userIdData?.id,
        },
      });
    } else {
      userData = null;
    }

    const currentUser = await prismadb.user.findUnique({
      where: {
        id: userData?.id,
      },
    });

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

    const { password } = body;

    if (!currentUser) {
      return new NextResponse("user id is required", { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    const user = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        password,
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

    return NextResponse.json(user);
  } catch (error) {
    console.log("[user_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
