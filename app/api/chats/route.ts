import prismadb from "@/lib/prismadb";
import { requireUser } from "@/lib/auth-guard";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { user, error } = await requireUser();
    if (error) return error;

    const body = await req.json();

    const { text, annoncementId } = body ?? {};

    if (typeof text !== "string" || !text.trim() || text.length > 5000) {
      return new NextResponse("Invalid message", { status: 400 });
    }

    if (typeof annoncementId !== "string" || !annoncementId) {
      return new NextResponse("annoncementId is required", { status: 400 });
    }

    const annoncement = await prismadb.annoncement
      .findUnique({
        where: {
          id: annoncementId,
        },
        select: { id: true, userId: true },
      })
      .catch(() => null);

    if (!annoncement) {
      return new NextResponse("Not found", { status: 404 });
    }

    if (annoncement.userId === user.id) {
      return new NextResponse("Cannot start a chat with yourself", {
        status: 400,
      });
    }

    // The author is always the signed-in user — never taken from the body.
    const chat = await prismadb.chat.create({
      data: {
        userIds: [user.id, annoncement.userId],
        annoncementId: annoncement.id,
        messages: {
          create: {
            author: user.id,
            text,
          },
        },
      },
    });

    return NextResponse.json({ id: chat.id });
  } catch (error) {
    console.log("[MESSAGE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
