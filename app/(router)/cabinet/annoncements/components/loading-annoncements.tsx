import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function LoadingAnnoncements() {
  return (
    <div className="w-full h-full gap-6 grid grid-rows-3">
      <Skeleton className="w-full bg-slate-200 h-[240px] rounded-xl" />
      <Skeleton className="w-full bg-slate-200 h-[240px] rounded-xl" />
      <Skeleton className="w-full bg-slate-200 h-[240px] rounded-xl" />
    </div>
  );
}

export default LoadingAnnoncements;
