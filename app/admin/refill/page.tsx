import { DataTable } from "@/components/ui/data-table-ui";
import React from "react";
import { RefillsColumn, columns } from "./components/columns";
import prismadb from "@/lib/prismadb";

const AdminRefillsPage = async () => {
  const refills = await prismadb.refill.findMany();

  const data: RefillsColumn[] = refills.map((el) => ({
    id: el.id,
    total: el.total,
    bonus: el.bonus,
    bonusPerc: el.bonusPerc,
  }));
  return (
    <div className=" min-h-screen flex flex-col w-4/5 pl-4 pr-6 py-2 text-slate-900">
      <h1 className="font-semibold text-lg">Пополнения ({data.length})</h1>
      <DataTable data={data} columns={columns} search="total" />
    </div>
  );
};

export default AdminRefillsPage;
