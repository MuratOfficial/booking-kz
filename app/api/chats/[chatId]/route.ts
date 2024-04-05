import { fetchUserData } from "@/lib/fetchUserData";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const chat = await prismadb.chat.delete({
      where: {
        id: params.chatId,
      },
    });

    return NextResponse.json(chat);
  } catch (error) {
    console.log("[chat_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  } finally {
    revalidatePath(`/cabinet/chats`);
    redirect(`/cabinet/chats`);
  }
}

export async function POST(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const body = await req.json();

    const { author, text } = body;

    if (!params.chatId) {
      return new NextResponse("chat id is required", { status: 400 });
    }

    const message = await prismadb.message.create({
      data: {
        author: author,
        text,
        chatId: params.chatId,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.log("[MESSAGE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
