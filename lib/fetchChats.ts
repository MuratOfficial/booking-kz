import { getServerSession } from "next-auth";
import prismadb from "./prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { fetchUserData } from "./fetchUserData";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function fetchChat(chatId: string, annoncementId: string) {
  const user = await fetchUserData();
  if (!user) return null;

  // const users = await prismadb.user.findMany();
  // const anotherUser = await prismadb.user.findUnique({
  //   where: {
  //     id: annoncement?.user.id || "",
  //   },
  // });
  const possibleChat = await prismadb.chat.findFirst({
    where: {
      userIds: {
        hasEvery: [user.id, chatId],
      },
      annoncementId: annoncementId,
    },
  });

  if (!possibleChat) {
    return null;
    // try {
    //   await prismadb.chat.create({
    //     data: {
    //       userIds: [user?.id || "", annoncement?.userId || ""],
    //     },
    //   });
    // } catch (error) {
    //   console.error("Database Error:", error);
    //   throw new Error("Failed to fetch chat");
    // } finally {
    //   const chat = await prismadb.chat.findFirst({
    //     where: {
    //       userIds: {
    //         hasEvery: [user?.id || "", annoncement?.userId || ""],
    //       },
    //     },
    //     include: {
    //       messages: true,
    //     },
    //   });
    //   return chat;
    // }
  } else {
    const chat = await prismadb.chat.findUnique({
      where: {
        id: possibleChat.id,
      },
      include: {
        messages: true,
      },
    });
    return chat;
  }
}

export async function fetchUserChats() {
  const user = await fetchUserData();

  // await prismadb.chat.deleteMany({
  //   where: {
  //     userIds: {
  //       has: user?.id,
  //     },
  //     messages: undefined,
  //   },
  // });

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
              user: { select: { id: true, name: true, username: true } },
            },
          },
          messages: true,
          users: { select: { id: true, name: true, username: true } },
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
      const anotherUser = await prismadb.user?.findUnique({
        where: { id: chatId },
        select: { id: true, name: true, username: true },
      });

      return anotherUser;
    } catch (error) {
      console.error("Database Error:", error);
      return null;
    }
  }
}

export async function fetchSupportChat(requestedUserId: string) {
  // A user may only open their own support chat; admins may open anyone's.
  const currentUser = await fetchUserData();
  if (!currentUser) return null;
  if (
    requestedUserId !== currentUser.id &&
    currentUser.accessType !== "admin"
  ) {
    return null;
  }
  const userId = requestedUserId;

  const possibleChat = await prismadb.chat.findFirst({
    where: {
      userIds: {
        equals: [userId],
      },
    },
  });

  if (!possibleChat) {
    try {
      await prismadb.chat.create({
        data: {
          userIds: [userId],
        },
      });
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch chat");
    } finally {
      const chat = await prismadb.chat.findFirst({
        where: {
          userIds: {
            equals: [userId],
          },
        },
        include: {
          messages: true,
        },
      });
      return chat;
    }
  } else {
    const chat = await prismadb.chat.findFirst({
      where: {
        userIds: {
          equals: [userId],
        },
      },
      include: {
        messages: true,
      },
    });
    return chat;
  }
}
