import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function FilteredAnnFallback() {
  return (
    <div className="w-full flex flex-col  gap-4">
      <Skeleton className="h-[30px]  self-end w-[260px] rounded-xl bg-blue-300 " />
      <Skeleton className="w-full bg-blue-300 h-[240px] rounded-xl" />
      <Skeleton className="w-full bg-blue-300 h-[240px] rounded-xl" />
      <Skeleton className="w-full bg-blue-300 h-[240px] rounded-xl" />
    </div>
  );
}

export default FilteredAnnFallback;
