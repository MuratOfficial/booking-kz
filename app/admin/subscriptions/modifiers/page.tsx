import { DataTable } from "@/components/ui/data-table-ui";
import React from "react";
import { ModifierColumn, columns } from "./components/columns";
import prismadb from "@/lib/prismadb";

const AdminModifiersPage = async () => {
  const modifiers = await prismadb.modifierType.findMany();

  const data: ModifierColumn[] = modifiers.map((el) => ({
    id: el.id,
    name: el.modifier || "",
    price: el.modifierPrice || "",
  }));
  return (
    <div className=" min-h-screen flex flex-col w-4/5 pl-4 pr-6 py-2 text-slate-900">
      <h1 className="font-semibold text-lg">Модификаторы ({data.length})</h1>
      <DataTable data={data} columns={columns} search="name" />
    </div>
  );
};

export default AdminModifiersPage;
