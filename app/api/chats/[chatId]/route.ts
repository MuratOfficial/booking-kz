import prismadb from "@/lib/prismadb";
import { isAdmin, requireUser } from "@/lib/auth-guard";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Loads the chat and checks that the signed-in user may access it:
 * participants always, admins only for support chats (no announcement).
 */
async function loadChatForUser(chatId: string) {
  const { user, error } = await requireUser();
  if (error) return { user: null, chat: null, error };

  const chat = await prismadb.chat
    .findUnique({ where: { id: chatId } })
    .catch(() => null);

  if (!chat) {
    return {
      user: null,
      chat: null,
      error: new NextResponse("Not found", { status: 404 }),
    };
  }

  const isParticipant = chat.userIds.includes(user.id);
  const isSupportChat = !chat.annoncementId;

  if (!isParticipant && !(isSupportChat && isAdmin(user))) {
    return {
      user: null,
      chat: null,
      error: new NextResponse("Forbidden", { status: 403 }),
    };
  }

  return { user, chat, error: null };
}

export async function DELETE(req: Request, props: { params: Promise<{ chatId: string }> }) {
  const params = await props.params;
  try {
    const { chat, error } = await loadChatForUser(params.chatId);
    if (error) return error;

    await prismadb.chat.delete({
      where: {
        id: chat.id,
      },
    });

    revalidatePath(`/cabinet/chats`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("[chat_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request, props: { params: Promise<{ chatId: string }> }) {
  const params = await props.params;
  try {
    const { user, chat, error } = await loadChatForUser(params.chatId);
    if (error) return error;

    const body = await req.json();

    const { text } = body ?? {};

    if (typeof text !== "string" || !text.trim() || text.length > 5000) {
      return new NextResponse("Invalid message", { status: 400 });
    }

    const message = await prismadb.message.create({
      data: {
        author: user.id,
        text,
        chatId: chat.id,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.log("[MESSAGE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// The announcement chat UI sends follow-up messages with PATCH.
export const PATCH = POST;
