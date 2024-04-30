import { DataTable } from "@/components/ui/data-table-ui";
import React from "react";
import { BuildingsColumn, columns } from "./components/columns";
import prismadb from "@/lib/prismadb";

const AdminSubsPage = async () => {
  const buildings = await prismadb.building.findMany();

  const data: BuildingsColumn[] = buildings.map((el) => ({
    id: el.id,
    name: el.name,
    city: el.cityOrDistrict || "Не указано",
    year: el.buildingYear || 9999,
    floors: el.floors || 0,
  }));
  return (
    <div className=" min-h-screen flex flex-col w-4/5 pl-4 pr-6 py-2 text-slate-900">
      <h1 className="font-semibold text-lg">ЖК ({data.length})</h1>
      <DataTable data={data} columns={columns} search="name" />
    </div>
  );
};

export default AdminSubsPage;
