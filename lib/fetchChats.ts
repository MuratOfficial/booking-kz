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

  // const users = await prismadb.user.findMany();
  // const anotherUser = await prismadb.user.findUnique({
  //   where: {
  //     id: annoncement?.user.id || "",
  //   },
  // });
  const possibleChat = await prismadb.chat.findMany({
    where: {
      userIds: {
        hasEvery: [annoncement?.userId || "", user?.id || ""],
      },
      annoncementId: annoncementId,
    },
  });

  if (chatId === "new") {
    if (possibleChat.length === 0) {
      try {
        await prismadb.chat.create({
          data: {
            annoncementId: annoncementId,
            userIds: [user?.id || "", annoncement?.userId || ""],
          },
        });
        // console.log(user!.id, annoncement!.userId);
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
  if (user) {
    try {
      const chats = await prismadb.chat.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userIds: {
            has: user!.id,
          },
        },
        include: {
          annoncement: {
            include: {
              user: true,
            },
          },
          messages: true,
          users: true,
        },
      });

      return chats;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch chat");
    }
  }
}

export async function fetchChatUsers(chatId: string) {
  const user = await fetchUserData();
  if (user) {
    try {
      const chat = await prismadb.chat.findUnique({
        where: {
          id: chatId,
        },
      });

      const anotherUserId = chat?.userIds.find((el) => el !== user?.id)
        ? chat?.userIds.find((el) => el !== user?.id)
        : user?.id;

      const anotherUser = await prismadb.user?.findUnique({
        where: { id: anotherUserId },
      });

      return anotherUser;
    } catch (error) {
      console.error("Database Error:", error);
      return null;
    }
  }
}
