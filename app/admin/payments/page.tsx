import { DataTable } from "@/components/ui/data-table-ui";
import React from "react";
import { PaymentColumn, columns } from "./components/columns";
import prismadb from "@/lib/prismadb";

async function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: {
    filter?: string;
  };
}) {
  const payments = await prismadb.payment.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    where: {
      transactionType:
        searchParams.filter === "Модификаторы"
          ? "modifier"
          : searchParams.filter === "Подписки"
          ? "subscription"
          : searchParams.filter === "Пополнение"
          ? "refill"
          : undefined,
    },
  });
  const data: PaymentColumn[] = payments.map((el) => ({
    id: el.id,
    user: el.user.name || el.user.username,
    sum: parseFloat(el.sum).toFixed(2),
    bonus: parseFloat(el?.bonus || "0").toFixed(2),
    status: el.status,
    createdAt: el.createdAt.toLocaleDateString(),
    service: el.transactionType,
  }));
  return (
    <div className=" min-h-screen flex flex-col w-4/5 pl-4 pr-6 py-2 text-slate-900">
      <h1 className="font-semibold text-lg">Платежи ({data.length})</h1>
      <DataTable data={data} columns={columns} search="user" />
    </div>
  );
}

export default AdminPaymentsPage;
