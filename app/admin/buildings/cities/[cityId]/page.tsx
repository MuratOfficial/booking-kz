import prismadb from "@/lib/prismadb";
import React from "react";
import AdminCityForm from "./components/admin-city-form";

const AdminCityPage = async ({
  params,
}: {
  params: {
    cityId: string;
  };
}) => {
  let city;

  if (params.cityId === "new") {
    city = null;
  } else {
    city = await prismadb.city.findUnique({
      where: {
        id: params.cityId,
      },
      include: {
        buildings: true,
      },
    });
  }

  return (
    <div className="w-4/5 flex flex-col">
      <AdminCityForm initialData={city} />
    </div>
  );
};

export default AdminCityPage;
