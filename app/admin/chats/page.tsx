import { DataTable } from "@/components/ui/data-table-ui";
import React from "react";
import { ChatColumn, columns } from "./components/columns";
import prismadb from "@/lib/prismadb";

const ChatsAdminPage = async () => {
  await prismadb.chat.deleteMany({
    where: {
      messages: {
        every: {
          text: "",
        },
      },
    },
  });

  const chats = await prismadb?.chat?.findMany({
    include: {
      messages: true,
      users: true,
    },
  });

  const data: ChatColumn[] = chats.map((el) => ({
    id: el.id,
    user: el.users[0]?.name || el.users[0]?.username,
    // message: el.messages.findLast((item) => item)?.text || "",
  }));

  return (
    <div className=" min-h-screen flex flex-col w-4/5 pl-4 pr-6 py-2 text-slate-900">
      <h1 className="font-semibold text-lg">Сообщения ({data.length})</h1>
      <DataTable data={data} columns={columns} search="user" />
    </div>
  );
};

export default ChatsAdminPage;
