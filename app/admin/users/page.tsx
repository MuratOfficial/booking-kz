import { DataTable } from "@/components/ui/data-table-ui";
import React from "react";
import { UserColumn, columns } from "./components/columns";

function AdminUsersPage() {
  const data: UserColumn[] = [
    {
      id: "kih145",
      username: "testuser",
      phone: "8777455865",
      email: "test@email.com",
      annoncements: 12,
      status: "active",
      role: "user",
      totalBalance: 4789,
    },
  ];
  return (
    <div className=" min-h-screen flex flex-col w-4/5 pl-4 pr-6 py-2 text-slate-900">
      <h1 className="font-semibold text-lg">Пользователи (5454)</h1>
      <DataTable data={data} columns={columns} search="username" />
    </div>
  );
}

export default AdminUsersPage;
