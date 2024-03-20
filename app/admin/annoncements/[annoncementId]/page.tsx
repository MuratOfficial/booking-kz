import prismadb from "@/lib/prismadb";
import React from "react";
import AdminAnnoncementForm from "./components/admin-annoncement-form";

async function AdminAnnoncementPage({
  params,
}: {
  params: {
    annoncementId: string;
  };
}) {
  let annoncement;

  if (params.annoncementId === "new") {
    annoncement = null;
  } else {
    annoncement = await prismadb.annoncement.findUnique({
      where: {
        id: params.annoncementId,
      },
    });
  }
  return (
    <div className="w-4/5 flex flex-col">
      <AdminAnnoncementForm initialData={annoncement} users={[]} />
    </div>
  );
}

export default AdminAnnoncementPage;
