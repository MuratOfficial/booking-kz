import Link from "next/link";
import { Metadata } from "next";
import prismadb from "@/lib/prismadb";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Filter from "./components/filter";
import LoadingAnnoncements from "../cabinet/annoncements/components/loading-annoncements";
import HotSuggestCard from "@/components/cards/hot-suggest-card";
import LoadingFilterAnnoncements from "./components/loading-filter-annoncements";

interface AnnoncementsLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: { template: "%s | Поиск обьявлении", default: " Поиск обьявлении" },

  description: "Поиск обьявлении | etazhi.kz",
};

export default async function AnnoncementsLayout({
  children,
}: AnnoncementsLayoutProps) {
  return (
    <div className="w-full flex flex-col min-h-screen p-4 gap-4">
      <Suspense fallback={<LoadingFilterAnnoncements />}>{children}</Suspense>
    </div>
  );
}
