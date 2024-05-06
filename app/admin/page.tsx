import React from "react";
import AnnoncementsBoard from "./components/annoncements-board";
import AllStats from "./components/all-stats";
import SystemStats from "./components/system-stats";
import prismadb from "@/lib/prismadb";

async function AdminPage() {
  const annoncements = await prismadb.annoncement.findMany({
    take: 6,
    where: {
      phase: "проверка",
    },
  });

  const allRentAnnoncementCount = await prismadb.annoncement.count({
    where: {
      serviceType: "Аренда",
    },
  });

  const allSellAnnoncementCount = await prismadb.annoncement.count({
    where: {
      serviceType: "Продажа",
    },
  });

  const allUsersCount = await prismadb.user.count({});

  const allPaymentsCoount = await prismadb.payment.count({});

  return (
    <div className="w-full min-h-[95vh] py-4 px-8 grid grid-cols-4 gap-4">
      <AnnoncementsBoard annoncementBoardCards={annoncements} />
      <div className=" w-full h-full grid-rows-3 grid gap-4 col-span-2">
        <AllStats
          rentCount={allRentAnnoncementCount}
          sellCount={allSellAnnoncementCount}
          userCount={allUsersCount}
          paymentCount={allPaymentsCoount}
        />
        <SystemStats />
      </div>
    </div>
  );
}

export default AdminPage;
