import prismadb from "@/lib/prismadb";
import React from "react";
import { AdminUserForm } from "./components/admin-user-form";

async function AdminUserPage(
  props: {
    params: Promise<{
      userId: string;
    }>;
  }
) {
  const params = await props.params;
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
