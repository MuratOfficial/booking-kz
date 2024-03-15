"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { chatList } from "@/lib/externalData";
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function ChatList() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ScrollArea className="h-[690px] w-full   text-slate-600 ">
      <ul className="">
        {chatList.length > 0 ? (
          chatList.map((item, index) => (
            <li
              className={cn(
                "grid grid-cols-4 gap-2 items-center h-20 group cursor-pointer opacity-70 hover:opacity-100 transition-all delay-100 duration-300",
                pathname === `/cabinet/chats/${item.id}` && "opacity-100"
              )}
              key={index}
              onClick={() => {
                router.push(`/cabinet/chats/${item.id}`);
              }}
            >
              <Image
                src={item.img}
                alt="chat-image"
                width={140}
                height={100}
                className="rounded-md object-cover aspect-[4/3] "
              />
              <div className=" col-span-3 w-full h-full flex flex-col justify-between px-2 pt-2 border  ">
                <div className="flex flex-row justify-between items-center">
                  <p className="text-slate-900 font-semibold text-sm line-clamp-1 ">
                    {item.name}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {item.lastChatDate.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-row gap-x-2 items-center">
                  {!item.fromUser &&
                    (item.lastMessageStatus === "pending" ? (
                      <Check size={16} className="stroke-blue-500" />
                    ) : (
                      <CheckCheck size={16} className="stroke-blue-500" />
                    ))}
                  <p className="text-slate-500 text-sm line-clamp-1">
                    {item.lastMessage}
                  </p>
                </div>
                <Separator
                  className={cn(
                    "bg-slate-300 group-hover:bg-blue-500 transition-all delay-100 duration-300",
                    pathname === `/cabinet/chats/${item.id}` && "bg-blue-500"
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
