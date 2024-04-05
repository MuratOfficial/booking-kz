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

  const users = await prismadb.user.findMany();
  const anotherUser = await prismadb.user.findUnique({
    where: {
      id: annoncement?.user.id || "",
    },
  });
  const possibleChat = await prismadb.chat.findMany({
    where: {
      OR: [
        {
          user1Id: user?.id,
          user2Id: anotherUser?.id,
          annoncementId: annoncementId,
        },
        {
          user1Id: anotherUser?.id,
          user2Id: user?.id,
          annoncementId: annoncementId,
        },
      ],
    },
  });

  if (chatId === "new") {
    if (possibleChat.length === 0) {
      try {
        await prismadb.chat.create({
          data: {
            annoncementId: annoncementId,
            user1Id: user?.id || "",
            user2Id: annoncement?.userId || "",
            user1Name:
              users.find((el) => el.id === user?.id)?.name ||
              users.find((el) => el.id === user?.id)?.username ||
              "Неизвестно",
            user2Name:
              users.find((el) => el.id === annoncement?.userId)?.name ||
              users.find((el) => el.id === annoncement?.userId)?.username ||
              "Неизвестно",
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
      orderBy: {
        createdAt: "desc",
      },
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

export async function fetchChatUsers(chatId: string) {
  const user = await fetchUserData();
  try {
    const chat = await prismadb?.chat?.findUnique({
      where: {
        id: chatId,
      },
    });

    const anotherUserId =
      user?.id === chat?.user1Id ? chat?.user2Id : chat?.user1Id;

    const anotherUser = await prismadb.user?.findUnique({
      where: { id: anotherUserId },
    });

    return anotherUser;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}
