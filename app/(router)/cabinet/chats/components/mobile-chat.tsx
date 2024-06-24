"use client";
import { Loader } from "lucide-react";
import React, { Suspense } from "react";
import ChatList from "./chat-list";
import { Annoncement, Chat, Message, User } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";

interface MobileChatProps {
  children: React.ReactNode;
  chats:
    | (Chat & {
        annoncement: Annoncement | null;
        users: User[];
        messages: Message[];
      })[]
    | null
    | undefined;
  userId: string | null | undefined;
}

function MobileChat({ children, chats, userId }: MobileChatProps) {
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className="w-full h-[720px] shadow-2xl rounded-3xl mt-2 lg:hidden md:hidden xs:flex">
      {pathname.endsWith("/cabinet/chats") ? (
        <div
          className={cn(
            " w-full h-full  rounded-3xl border-2 bg-slate-200 border-slate-300 py-3 pl-4"
          )}
        >
          <ChatList chats={chats} userId={userId} />
        </div>
      ) : (
        <div
          className={cn(
            "h-full w-full  border-2 border-slate-300  rounded-3xl col-span-2 bg-slate-200"
          )}
        >
          <Suspense
            fallback={
              <div className="w-full h-full justify-center items-center flex flex-col">
                <Loader className="w-12 h-12 text-blue-500 animate-spin" />
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default MobileChat;
