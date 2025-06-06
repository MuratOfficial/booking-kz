import Image from "next/image";
import React from "react";

import { ArrowLeft, Check, CheckCheck } from "lucide-react";
import { fetchChat, fetchChatUsers } from "@/lib/fetchChats";
import { fetchAnnoncement } from "@/lib/fetchAnnoncement";
import DropdownChatButtons from "./components/dropdown-chat-button";
import SendMessageButton from "./components/send-message";
import { fetchUserData } from "@/lib/fetchUserData";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { chatId: string; annoncementId: string };
}) {
  const chat = await fetchChat(params.chatId, params.annoncementId);

  return {
    title: `${chat ? `Чат ID ${chat?.id}` : "Новый чат"}`,
  };
}

const ChatPage = async ({
  params,
}: {
  params: { chatId: string; annoncementId: string };
}) => {
  const chat = await fetchChat(params.chatId, params.annoncementId);

  const postUpdate = chat ? true : false;

  const user = await fetchUserData();

  const annoncement = await fetchAnnoncement(params.annoncementId);

  const anotherUser = await fetchChatUsers(params.chatId);

  return (
    <div className="grid grid-rows-9 h-full w-full ">
      <div className="border-b-2 border-slate-300 px-4 py-2 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-x-4 h-fit w-60 items-center">
          <Link href="/cabinet/chats" className="xs:flex md:hidden lg:hidden">
            <ArrowLeft className="w-4" />
          </Link>
          <Image
            src={annoncement?.images[0].url || ""}
            alt="chat thumb"
            width={200}
            height={160}
            className="aspect-[4/3] w-20  rounded-md object-cover"
          />
          <p className="font-semibold text-slate-900">
            {anotherUser?.name || anotherUser?.username}
          </p>
        </div>
        <DropdownChatButtons
          chatId={chat?.id}
          annoncementId={annoncement?.id}
        />
      </div>
      <div className="row-span-7 bg-slate-100 w-full h-full  ">
        {chat && chat?.messages.length > 0 && (
          <ScrollArea className=" h-[550px] py-2 px-4">
            <div className="flex flex-col gap-2">
              {chat.messages.map((el, ind) => (
                <div key={ind}>
                  {el.author === user?.id ? (
                    <div className=" w-full flex flex-row justify-end ">
                      <p className="rounded-xl pt-2 pb-0 px-4 flex flex-col items-end  w-fit text-neutral-50 bg-blue-500">
                        {el.text}
                        <span className=" bottom-0 flex flex-row items-center gap-0.5 text-[10px] text-neutral-100 font-light">
                          {el?.createdAt.toLocaleTimeString()}{" "}
                          {el.status === "pending" && (
                            <Check className="w-3 ml-1" />
                          )}
                          {el.status === "send" && (
                            <CheckCheck className="w-3 ml-1" />
                          )}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div className=" w-full flex flex-row justify-start">
                      <p className="rounded-xl pt-2 pb-0 px-4 flex flex-col items-start  w-fit text-neutral-50 bg-slate-700">
                        {el.text}
                        <span className=" bottom-0 flex flex-row items-center gap-0.5 text-[10px] text-neutral-100 font-light">
                          {el?.createdAt.toLocaleTimeString()}{" "}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        {chat && chat?.messages.length === 0 && (
          <div className="w-full h-full justify-center flex flex-col items-center">
            <p className=" text-neutral-400 text-sm">
              Пока сообщении нету в этом чате
            </p>
          </div>
        )}
        {!chat && (
          <div className="w-full h-full justify-center flex flex-col items-center">
            <p className=" text-neutral-400 text-sm">
              Пока сообщении нету в этом чате
            </p>
          </div>
        )}
      </div>
      <SendMessageButton
        authorId={user?.id}
        type={postUpdate}
        annoncementId={params.annoncementId}
        chatId={chat?.id}
      />
    </div>
  );
};

export default ChatPage;
