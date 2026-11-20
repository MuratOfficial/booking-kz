import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireUser } from "@/lib/auth-guard";

export async function PATCH(req: Request) {
  try {
    const { user, error } = await requireUser();
    if (error) return error;

    const body = await req.json();

    const { createdAt } = body ?? {};

    if (!createdAt) {
      return new NextResponse("createdAt is required", { status: 400 });
    }

    const target = new Date(createdAt).getTime();
    if (Number.isNaN(target)) {
      return new NextResponse("Invalid createdAt", { status: 400 });
    }

    // Only the stored notifications are modified — the client can no longer
    // overwrite the whole list with arbitrary content.
    const updatedNotifications = user.notifications.map((notification) =>
      new Date(notification.createdAt).getTime() === target
        ? { ...notification, isOpened: true }
        : notification
    );

    await prismadb.user.update({
      where: {
        id: user.id,
      },
      data: {
        notifications: updatedNotifications,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("[user_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
