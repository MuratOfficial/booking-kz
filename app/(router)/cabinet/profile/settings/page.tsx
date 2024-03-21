import React from "react";
import { SettingsForm } from "./components/settings-form";
import { Metadata } from "next";
import { PasswordForm } from "./components/password-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prismadb from "@/lib/prismadb";

export const metadata: Metadata = {
  title: "Настройки",
};

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);
  const userIdData = JSON.parse(JSON.stringify(session))?.user;

  let userData;

  if (session?.user) {
    userData = await prismadb?.user?.findUnique({
      where: {
        id: userIdData?.id,
      },
    });
  } else {
    userData = null;
  }

  return (
    <div className="w-full min-h-screen bg-white rounded-2xl px-6 py-3 flex flex-col gap-2">
      <h2 className="text-slate-800 font-bold text-xl">Настроить профиль</h2>
      <SettingsForm initialData={userData} />
      <h2 className="text-slate-800 font-bold text-xl mt-8">Изменить пароли</h2>
      <PasswordForm />
    </div>
  );
};

export default SettingsPage;
