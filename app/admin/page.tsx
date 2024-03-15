import React from "react";
import AnnoncementsBoard from "./components/annoncements-board";
import AllStats from "./components/all-stats";
import SystemStats from "./components/system-stats";

function AdminPage() {
  return (
    <div className="w-full min-h-[95vh] py-4 px-8 grid grid-cols-4 gap-4">
      <AnnoncementsBoard />
      <div className=" w-full h-full grid-rows-3 grid gap-4 col-span-2">
        <AllStats />
        <SystemStats />
      </div>
    </div>
  );
}

export default AdminPage;
