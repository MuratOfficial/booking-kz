import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/auth";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { username, email, phone, name, password, verificationCode } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const users = await prismadb.user.update({
      where: {
        email: email,
      },
      data: {
        isVerified: true,
        verificationCode: verificationCode,
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
    console.log("[VERIFY_USER]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
