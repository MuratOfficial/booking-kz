"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { chatList } from "@/lib/externalData";
import { cn } from "@/lib/utils";
import { Annoncement, Chat, Message, User } from "@prisma/client";
import { Check, CheckCheck, Circle } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface ChatListProps {
  chats:
    | (Chat & {
        annoncement: Annoncement;
        users: User[];
        messages: Message[];
      })[]
    | null;
  userId: string | null | undefined;
}

function ChatList({ chats, userId }: ChatListProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ScrollArea className="h-[690px] w-full   text-slate-600 ">
      <ul className="">
        {chats && chats?.length > 0 ? (
          chats?.map((item, index) => (
            <li
              className={cn(
                "grid grid-cols-4 relative gap-2 items-center h-20 group cursor-pointer grayscale opacity-80 hover:opacity-100 transition-all delay-100 duration-300",
                pathname ===
                  `/cabinet/chats/${item.annoncementId}/${item.id}` &&
                  "opacity-100 grayscale-0",
                item?.messages?.findLast((el) => el)?.status === "pending" &&
                  item?.messages?.findLast((el) => el)?.author === userId &&
                  "  grayscale-0"
              )}
              key={index}
              onClick={() => {
                router.push(`/cabinet/chats/${item.annoncementId}/${item.id}`);
              }}
            >
              <Image
                src={item.annoncement.images[0]?.url || ""}
                alt="chat-image"
                width={140}
                height={100}
                className="rounded-md object-cover aspect-[4/3] "
              />
              <div className=" col-span-3 w-full h-full flex flex-col justify-between px-2 pt-2 border  ">
                <div className="flex flex-row justify-between items-center">
                  <p className="text-slate-900 font-semibold text-sm line-clamp-1 ">
                    {item.users.find((el) => el.id !== userId)?.name ||
                      item.users.find((el) => el.id !== userId)?.username ||
                      "Вы"}
                  </p>
                  <p className="text-slate-500 text-xs ">
                    {item.messages
                      .findLast((el) => el)
                      ?.createdAt.toLocaleDateString() || ""}
                    <span className="ml-2">
                      {item.messages
                        .findLast((el) => el)
                        ?.createdAt.toLocaleTimeString() || ""}
                    </span>
                  </p>
                </div>
                <div className="flex flex-row gap-x-2 items-center">
                  {item.messages.findLast((el) => el)?.author === userId && (
                    <>
                      {item.messages &&
                        item?.messages?.findLast((el) => el)?.status ===
                          "pending" && (
                          <Check size={16} className="stroke-blue-500" />
                        )}
                      {item.messages &&
                        item?.messages?.findLast((el) => el)?.status ===
                          "send" && (
                          <CheckCheck size={16} className="stroke-blue-500" />
                        )}
                    </>
                  )}

                  <p className="text-slate-500 text-sm line-clamp-1">
                    {item?.messages.findLast((el) => el)?.text}
                  </p>
                </div>
                <Separator
                  className={cn(
                    "bg-slate-300 group-hover:bg-blue-500 transition-all delay-100 duration-300",
                    pathname ===
                      `/cabinet/chats/${item.annoncementId}/${item.id}` &&
                      "bg-blue-500"
                  )}
                />
              </div>
            </li>
          ))
        ) : (
          <p className="text-slate-600 text-xs">
            У вас еще нету активных чатов.
          </p>
        )}
      </ul>
    </ScrollArea>
  );
}

export default ChatList;
