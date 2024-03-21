import prismadb from "@/lib/prismadb";
import React from "react";
import { AdminUserForm } from "./components/admin-user-form";

async function AdminUserPage({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  let user;

  if (params.userId === "new") {
    user = null;
  } else {
    user = await prismadb.user.findUnique({
      where: {
        id: params.userId,
      },
    });
  }
  return (
    <div className="w-4/5 flex flex-col">
      <AdminUserForm initialData={user} />
    </div>
  );
}

export default AdminUserPage;
