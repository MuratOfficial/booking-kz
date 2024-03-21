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
        password,
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
