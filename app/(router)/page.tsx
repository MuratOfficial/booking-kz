import HotCategoryGrid from "@/components/layouts/hot-category-grid";
import {
  fetchHotModifierAnnoncementsRent,
  fetchHotModifierAnnoncementsSell,
} from "@/lib/fetchAnnoncement";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Горячие предложения | etazhi.kz",
};

export default async function Home() {
  const forSell = await fetchHotModifierAnnoncementsSell();
  const forRent = await fetchHotModifierAnnoncementsRent();

  return (
    <main className="flex min-h-screen bg-slate-100 flex-col px-4 pb-4">
      <Suspense>
        <HotCategoryGrid title="Продажа" data={forSell} />
      </Suspense>
      <Suspense>
        <HotCategoryGrid title="Аренда" data={forRent} />
      </Suspense>
    </main>
  );
}
