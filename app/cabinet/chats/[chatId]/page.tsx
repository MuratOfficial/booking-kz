import { chatList } from "@/lib/externalData";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImagePlus, MoreHorizontal, Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";

export function generateMetadata({ params }: { params: { chatId: string } }) {
  const chat = chatList.filter((el) => el.id === params.chatId)[0];

  return {
    title: `Чат ID ${chat?.id}`,
  };
}

function ChatPage({ params }: { params: { chatId: string } }) {
  const chat = chatList.filter((el) => el.id === params.chatId)[0];

  return (
    <div className="grid grid-rows-9 h-full w-full ">
      <div className="border-b-2 border-slate-300 px-4 py-2 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-x-4 h-fit w-20 items-center">
          <Image
            src={chat.img}
            alt="chat thumb"
            width={200}
            height={160}
            className="aspect-[4/3]  rounded-md object-cover"
          />
          <p className="font-semibold text-slate-900">{chat.name}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="group/1 p-2 rounded-full hover:bg-slate-300">
              <MoreHorizontal className="group-hover/1:stroke-blue-500 stroke-slate-900" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-slate-700 text-sm font-semibold">
            <DropdownMenuItem>Перейти к обьявлению</DropdownMenuItem>
            <DropdownMenuItem>Удалить чат</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="row-span-7 bg-slate-100">В разработке...</div>
      <div className="border-t-2 border-slate-300 px-4 py-2 flex flex-row gap-2 justify-between items-center">
        <button className="group p-2 rounded-full hover:bg-slate-300 transition delay-100 duration-300">
          <Paperclip className="group-hover:stroke-blue-500 stroke-slate-700 transition delay-100 duration-300" />
        </button>
        <Input className="rounded-xl bg-slate-100" />
        <button className="group p-2 rounded-full hover:bg-slate-300 transition delay-100 duration-300">
          <ImagePlus className="group-hover:stroke-blue-500 stroke-slate-700 transition delay-100 duration-300" />
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
