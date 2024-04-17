import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { author, text, annoncementId } = body;

    const annoncement = await prismadb.annoncement.findFirst({
      where: {
        id: annoncementId,
      },
    });

    const chat = await prismadb.chat.create({
      data: {
        userIds: [author || "", annoncement?.userId || ""],
        annoncementId,
        messages: {
          create: {
            author,
            text,
          },
        },
      },
    });

    return NextResponse.json(chat);
  } catch (error) {
    console.log("[MESSAGE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
