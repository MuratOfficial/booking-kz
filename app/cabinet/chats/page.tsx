import { ScrollArea } from "@/components/ui/scroll-area";
import { Metadata } from "next";
import React from "react";
import ChatList from "./components/chat-list";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Чаты",
  description: "booking.kz | booking.kz",
};

function ChatsPage() {
  return (
    <div className="w-full h-full items-center justify-center flex flex-col py-4">
      <Image
        width={480}
        height={600}
        src="/svg/chat.svg"
        alt="not-found"
        className="max-w-[360px]"
      />
      <p className=" text-slate-800 text-lg uppercase font-bold text-center mx-auto">
        Начните общение выбрав чат
      </p>
    </div>
  );
}

export default ChatsPage;
