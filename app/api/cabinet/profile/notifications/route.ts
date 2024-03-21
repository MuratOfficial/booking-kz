import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const session = await getServerSession(authOptions);
    const userIdData = JSON.parse(JSON.stringify(session))?.user;

    // const admin = await prismadb.user.findUnique({
    //   where: {
    //     id: userIdData?.user?.id,
    //   },
    // });

    // if (admin?.isAdmin === false) {
    //   return new NextResponse("Access denied", { status: 401 });
    // }

    const { createdAt, notifications } = body;

    if (!createdAt) {
      return new NextResponse("createdAt is required", { status: 400 });
    }

    if (!userIdData) {
      return new NextResponse("userIdData is required", { status: 400 });
    }

    interface Notification {
      type: string;
      isOpened: boolean;
      text: string;
      createdAt: Date;
    }

    const updateNotificationByDate = (
      notifications: Notification[],
      createdAt: Date,
      updatedNotification: Partial<Notification>
    ): Notification[] => {
      const index = notifications.findIndex(
        (notification) => notification.createdAt === createdAt
      );
      if (index === -1) {
        return notifications;
      }

      const updatedNotifications = [...notifications];
      updatedNotifications[index] = {
        ...updatedNotifications[index],
        ...updatedNotification,
      };
      return updatedNotifications;
    };

    const updatedNotifications = updateNotificationByDate(
      notifications,
      createdAt,
      { isOpened: true }
    );

    const notification = await prismadb.user.update({
      where: {
        id: userIdData.id,
      },
      data: {
        notifications: updatedNotifications,
      },
    });

    return NextResponse.json(notification);
  } catch (error) {
    console.log("[user_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
