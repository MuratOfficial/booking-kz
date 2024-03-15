import { Metadata } from "next";
import ChatList from "./components/chat-list";

export const metadata: Metadata = {
  title: {
    template: "%s | Сообщения | booking.kz",
    default: "Сообщения",
  },
  description: "booking.kz | booking.kz",
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

  return (
    <>
      <div className="flex flex-col items-center gap-2 w-full pb-4">
        <div className="flex flex-row justify-between w-full items-center">
          <h2 className="text-2xl text-slate-900 uppercase font-bold">
            Сообщения
          </h2>
        </div>
        <div className="w-full h-[720px] shadow-2xl rounded-3xl mt-2 grid grid-cols-3">
          <div className=" w-full h-full   rounded-l-3xl border-y-2 border-l-2 bg-slate-200 border-slate-300 py-3 pl-4">
            <ChatList />
          </div>
          <div className="h-full w-full border-2 border-slate-300  rounded-r-3xl col-span-2 bg-slate-200">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
