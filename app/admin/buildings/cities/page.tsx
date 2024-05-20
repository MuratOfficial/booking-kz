import { DataTable } from "@/components/ui/data-table-ui";
import React from "react";
import { CitiesColumn, columns } from "./components/columns";
import prismadb from "@/lib/prismadb";

const AdminCitiesPage = async () => {
  const cities = await prismadb.city.findMany({
    include: {
      buildings: true,
    },
  });

  const data: CitiesColumn[] = cities.map((el) => ({
    id: el.id,
    name: el.cityOrDistrict,
    towns: el.cityOrTown.length || 0,
    addresses: [...el.cityOrTown.map((el) => el.addresses)].length || 0,
    buildings: el.buildings.length || 0,
  }));

  return (
    <div className=" min-h-screen flex flex-col w-4/5 pl-4 pr-6 py-2 text-slate-900">
      <h1 className="font-semibold text-lg">Города ({data.length})</h1>
      <DataTable data={data} columns={columns} search="name" />
    </div>
  );
};

export default AdminCitiesPage;
