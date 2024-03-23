import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function LoadingFilterAnnoncements() {
  return (
    <div className="w-full flex flex-col min-h-screen p-4 gap-4">
      <Skeleton className="h-[360px] rounded-xl bg-blue-300 w-full" />
      <div className="w-full grid grid-cols-7 gap-4">
        <div className="col-span-5 flex flex-col gap-4">
          <div className="w-full col-span-5 h-full gap-6 grid grid-rows-3">
            <div className=" w-full flex flex-row justify-end px-6">
              <Skeleton className="w-[240px] rounded-xl h-12" />
            </div>
            <Skeleton className="w-full bg-blue-300 h-[240px] rounded-xl" />
            <Skeleton className="w-full bg-blue-300 h-[240px] rounded-xl" />
            <Skeleton className="w-full bg-blue-300 h-[240px] rounded-xl" />
          </div>
        </div>
        <div className="col-span-2 bg-white rounded-xl h-fit w-full flex flex-col gap-4 items-center py-2 px-3">
          <Skeleton className="w-full h-24 rounded-lg bg-blue-300" />
          <Skeleton className="w-full h-24 rounded-lg bg-blue-300" />
          <Skeleton className="w-full h-24 rounded-lg bg-blue-300" />
          <Skeleton className="w-full h-24 rounded-lg bg-blue-300" />
          <Skeleton className="w-full h-24 rounded-lg bg-blue-300" />
        </div>
      </div>
    </div>
  );
}

export default LoadingFilterAnnoncements;
