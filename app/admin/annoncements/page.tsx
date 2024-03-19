import { DataTable } from "@/components/ui/data-table-ui";
import React from "react";
import { AnnoncementColumn, columns } from "./components/columns";

function AdminAnnoncementsPage() {
  const data: AnnoncementColumn[] = [
    {
      id: "asdasdasd",
      city: "Astana",
      isChecked: "Проверено",
      roomNumber: 4,
      categoryType: "Квартира",
      serviceType: "Аренда",
      serviceTypeExt: "Посуточно",
      phase: "активно",
      topModifier: 0,
      hotModifier: 0,
      hurryModifier: 1,
      areaSq: 250,
      price: 175550,
      user: "Марденов АД",
    },
  ];
  return (
    <div className=" min-h-screen flex flex-col w-4/5 pl-4 pr-6 py-2 text-slate-900">
      <h1 className="font-semibold text-lg">Обьявления (5454)</h1>
      <DataTable data={data} columns={columns} search="city" />
    </div>
  );
}

export default AdminAnnoncementsPage;
