import { DataTable } from "@/components/ui/data-table-ui";
import React from "react";
import { AnnoncementColumn, columns } from "./components/columns";
import prismadb from "@/lib/prismadb";

const AdminAnnoncementsPage = async () => {
  const annoncements = await prismadb.annoncement.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  const data: AnnoncementColumn[] = annoncements.map((item) => ({
    id: item.id,
    city: item.cityOrDistrict,
    isChecked: item.isChecked,
    roomNumber: item.roomNumber,
    categoryType: item.categoryType,
    serviceType: item.serviceType,
    serviceTypeExt: item?.serviceTypeExt || "",
    phase: item.phase,
    topModifier: item?.modificators?.topModifier || 0,
    hotModifier: item?.modificators?.hotModifier || 0,
    hurryModifier: item?.modificators?.hurryModifier || 0,
    areaSq: item?.areaSq,
    price: item?.price,
    user: item.user.username,
  }));

  const defaultColumns = {
    city: true,
    isChecked: true,
    categoryType: true,
    serviceType: true,
    serviceTypeExt: false,
    areaSq: false,
    phase: false,
    price: true,
    user: true,
  };

  return (
    <div className=" min-h-screen flex flex-col w-4/5 pl-4 pr-6 py-2 text-slate-900">
      <h1 className="font-semibold text-lg">Обьявления ({data.length})</h1>
      <DataTable
        data={data}
        columns={columns}
        search="city"
        initialVisible={defaultColumns}
      />
    </div>
  );
};

export default AdminAnnoncementsPage;
