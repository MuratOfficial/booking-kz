import { DataTable } from "@/components/ui/data-table-ui";
import React from "react";
import { UserColumn, columns } from "./components/columns";
import prismadb from "@/lib/prismadb";
import { annoncements } from "@/lib/externalData";

const AdminUsersPage = async () => {
  const users = await prismadb.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      annoncements: true,
    },
  });

  const data: UserColumn[] = users.map((item) => ({
    id: item.id,
    username: item.username,
    phone: item?.phone || "",
    email: item.email,
    annoncements: item.annoncements.length,
    status: item.status,
    role: item.accessType,
    totalBalance: parseInt(item.totalBalance || "0"),
  }));

  const defaultColumns = {
    username: true,
    phone: true,
    email: false,
    annoncements: true,
    status: true,
    role: true,
    totalBalance: false,
  };

  return (
    <div className=" min-h-screen flex flex-col w-4/5 pl-4 pr-6 py-2 text-slate-900">
      <h1 className="font-semibold text-lg">Пользователи ({data.length})</h1>
      <DataTable
        data={data}
        columns={columns}
        search="username"
        initialVisible={defaultColumns}
      />
    </div>
  );
};

export default AdminUsersPage;
