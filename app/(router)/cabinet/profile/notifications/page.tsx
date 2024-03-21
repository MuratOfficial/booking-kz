import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Badge } from "@/components/ui/badge";
import prismadb from "@/lib/prismadb";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import NotificationButton from "./components/notification-button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Оповещения",
};

const NotificationsPage = async () => {
  const session = await getServerSession(authOptions);
  const userIdData = JSON.parse(JSON.stringify(session))?.user;

  let userData;

  if (session?.user) {
    userData = await prismadb?.user?.findUnique({
      where: {
        id: userIdData?.id,
      },
    });
  } else {
    userData = null;
  }

  const user = await prismadb.user.findUnique({
    where: {
      id: userData?.id,
    },
  });

  const notifications = user?.notifications;

  return (
    <div className="w-full min-h-screen bg-white rounded-2xl p-4 flex flex-col gap-2">
      <h2 className="uppercase font-bold text-2xl"> Оповещения</h2>
      {notifications?.map((item, index) => (
        <div
          className={cn(
            "w-full border rounded-xl px-4 py-3 flex flex-col  text-slate-500"
          )}
          key={index}
        >
          <div className="flex flex-row justify-between">
            <Badge variant="outline" className="w-fit flex flex-row gap-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
              {item.type}
            </Badge>
            <p className="text-sm ">{item.createdAt.toLocaleDateString()}</p>
          </div>
          <div className="flex flex-row justify-between mt-2">
            <p className="text-sm font-medium">{item.text}</p>
            {!item.isOpened && (
              <NotificationButton
                createdAt={item.createdAt}
                notifications={notifications}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPage;
