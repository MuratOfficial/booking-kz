import prismadb from "@/lib/prismadb";
import React from "react";
import AdminBuildingForm from "./components/admin-building-form";

const AdminBuildingPage = async (
  props: {
    params: Promise<{
      buildingId: string;
    }>;
  }
) => {
  const params = await props.params;
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
