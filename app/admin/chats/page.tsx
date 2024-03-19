import { DataTable } from "@/components/ui/data-table-ui";
import React from "react";
import { ChatColumn, columns } from "./components/columns";

function ChatsAdminPage() {
  const data: ChatColumn[] = [
    {
      id: "asgf454sdf",
      user1: "Марденов Б",
      user2: "Кошаганов З",
      annoncementLink: "https://google.com",
      status: "active",
    },
  ];

  return (
    <div className=" min-h-screen flex flex-col w-4/5 pl-4 pr-6 py-2 text-slate-900">
      <h1 className="font-semibold text-lg">Сообщения (54)</h1>
      <DataTable data={data} columns={columns} search="user1" />
    </div>
  );
}

export default ChatsAdminPage;
