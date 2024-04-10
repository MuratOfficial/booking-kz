import { DataTable } from "@/components/ui/data-table-ui";
import React from "react";
import { SubsColumn, columns } from "./components/columns";
import prismadb from "@/lib/prismadb";

const AdminSubsPage = async () => {
  const subs = await prismadb.subscription.findMany();

  const data: SubsColumn[] = subs.map((el) => ({
    id: el.id,
    name: el.name,
    price: el.price.toString(),
    color: el.color,
  }));
  return (
    <div className=" min-h-screen flex flex-col w-4/5 pl-4 pr-6 py-2 text-slate-900">
      <h1 className="font-semibold text-lg">Продвижения ({data.length})</h1>
      <DataTable data={data} columns={columns} search="name" />
    </div>
  );
};

export default AdminSubsPage;
