import prismadb from "@/lib/prismadb";
import React from "react";
import AdminBuildingForm from "./components/admin-building-form";

const AdminSubsPage = async ({
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

  return (
    <div className="w-4/5 flex flex-col">
      <AdminBuildingForm initialData={building} />
    </div>
  );
};

export default AdminSubsPage;
