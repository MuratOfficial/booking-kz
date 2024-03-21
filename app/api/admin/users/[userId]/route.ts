import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
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

    const user = await prismadb.user.delete({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[user_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();

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

    if (!params.userId) {
      return new NextResponse("user id is required", { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    const user = await prismadb.user.update({
      where: {
        id: params.userId,
      },
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
          type: "Аккаунт",
          text: "Данные аккаунта были изменены",
          isOpened: false,
        },
        accessType,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[user_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
