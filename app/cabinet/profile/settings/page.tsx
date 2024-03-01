import React from "react";
import { SettingsForm } from "./components/settings-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Настройки",
};

function SettingsPage() {
  return (
    <div className="w-full min-h-screen bg-white rounded-2xl px-4 py-3 flex flex-col gap-2">
      <h2 className="text-slate-800 font-bold text-xl">Настроить профиль</h2>
      <SettingsForm />
    </div>
  );
}

export default SettingsPage;
