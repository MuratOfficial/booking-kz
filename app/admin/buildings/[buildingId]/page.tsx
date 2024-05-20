import prismadb from "@/lib/prismadb";
import React from "react";
import AdminBuildingForm from "./components/admin-building-form";

const AdminBuildingPage = async ({
  params,
}: {
  params: {
    buildingId: string;
  };
}) => {
  let building;

  if (params.buildingId === "new") {
    building = null;
  } else {
    building = await prismadb.building.findUnique({
      where: {
        id: params.buildingId,
      },
    });
  }

  const cities = await prismadb.city.findMany();

  return (
    <div className="w-4/5 flex flex-col">
      <AdminBuildingForm initialData={building} cities={cities} />
    </div>
  );
};

export default AdminBuildingPage;
