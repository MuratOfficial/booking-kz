import { Metadata } from "next";
import ChatList from "./components/chat-list";
import { Suspense } from "react";
import { fetchUserChats } from "@/lib/fetchChats";
import { Headset, Loader } from "lucide-react";
import { fetchUserData } from "@/lib/fetchUserData";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | Сообщения | etazhi.kz",
    default: "Сообщения",
  },
  description: "etazhi.kz | etazhi.kz",
};

interface ChatsLayoutProps {
  children: React.ReactNode;
}

export default async function ChatsLayout({ children }: ChatsLayoutProps) {
  //   const session = await getServerSession(authOptions);

  //   const userIdData = JSON.parse(JSON.stringify(session));

  //   const isAdmin = await prismadb.user.findUnique({
  //     where: {
  //       id: userIdData?.user?.id,
  //     },
  //   });

  //   if (isAdmin?.isAdmin === false) {
  //     return <NotFound />;
  //   }

  const chatList = await fetchUserChats();
  const user = await fetchUserData();

  return (
    <>
      <div className="flex flex-col items-center gap-2 w-full pb-4">
        <div className="flex flex-row justify-between w-full items-center">
          <h2 className="text-2xl text-slate-900 uppercase font-bold">
            Сообщения
          </h2>
          <Link
            href={`/cabinet/chats/support/${user?.id}`}
            className="flex flex-row gap-x-1 text-xs text-neutral-600 items-center hover:text-blue-500 font-medium"
          >
            <Headset className="w-3" />
            Написать в поддержку
          </Link>
        </div>
        <div className="w-full h-[720px] shadow-2xl rounded-3xl mt-2 grid grid-cols-3">
          <div className=" w-full h-full   rounded-l-3xl border-y-2 border-l-2 bg-slate-200 border-slate-300 py-3 pl-4">
            <ChatList chats={chatList} userId={user?.id} />
          </div>
          <div className="h-full w-full border-2 border-slate-300  rounded-r-3xl col-span-2 bg-slate-200">
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
        </div>
      </div>
    </>
  );
}
