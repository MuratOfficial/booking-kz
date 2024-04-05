import { getServerSession } from "next-auth";
import prismadb from "./prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { fetchUserData } from "./fetchUserData";
import { fetchAnnoncement } from "./fetchAnnoncement";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function fetchChat(chatId: string, annoncementId: string) {
  const user = await fetchUserData();
  const annoncement = await fetchAnnoncement(annoncementId);
  if (chatId === "new") {
    try {
      await prismadb.chat.create({
        data: {
          annoncementId: annoncementId,
          user1Id: user?.id || "",
          user2Id: annoncement?.userId || "",
        },
      });
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch chat");
    } finally {
      const chat = await prismadb.chat.findMany({
        where: {
          annoncementId: annoncementId,
        },
      });
      revalidatePath(`/cabinet/chats/${annoncementId}/${chat[0].id}`);
      redirect(`/cabinet/chats/${annoncementId}/${chat[0].id}`);
    }
  } else {
    try {
      const chat = await prismadb.chat.findUnique({
        where: {
          id: chatId,
        },
        include: {
          messages: true,
        },
      });

      await prismadb.message.updateMany({
        where: {
          chatId: chatId,
          author: {
            not: user?.id,
          },
        },
        data: {
          status: "send",
        },
      });

      return chat;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch chat");
    }
  }
}

export async function fetchUserChats() {
  const user = await fetchUserData();
  try {
    const chats = await prismadb.chat.findMany({
      where: {
        OR: [
          {
            user1Id: user?.id,
          },
          {
            user2Id: user?.id,
          },
        ],
      },
      include: {
        annoncement: {
          include: {
            user: true,
          },
        },
        messages: true,
      },
    });

    return chats;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch chat");
  }
}
