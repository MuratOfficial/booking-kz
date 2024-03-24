import { DataTable } from "@/components/ui/data-table-ui";
import React from "react";
import { PaymentColumn, columns } from "./components/columns";

function AdminPaymentsPage() {
  const data: PaymentColumn[] = [
    {
      id: "awima",
      user: "user1",
      cost: 1800,
      status: "success",
      createdAt: "12 мар. 2024 г.",
      service: "modification",
    },
  ];
  return (
    <div className=" min-h-screen flex flex-col w-4/5 pl-4 pr-6 py-2 text-slate-900">
      <h1 className="font-semibold text-lg">Платежи ({data.length})</h1>
      <DataTable data={data} columns={columns} search="user" />
    </div>
  );
}

export default AdminPaymentsPage;
