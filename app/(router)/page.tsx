import HotCategoryGrid from "@/components/layouts/hot-category-grid";
import {
  fetchHotModifierAnnoncementsRent,
  fetchHotModifierAnnoncementsSell,
} from "@/lib/fetchAnnoncement";
import { fetchUserData } from "@/lib/fetchUserData";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title:
    "etazhi.kz. Бесплатные обьявления по аренде и продаже недвижимости в Казахстане | etazhi.kz",
};

export default async function Home() {
  const forSell = await fetchHotModifierAnnoncementsSell();
  const forRent = await fetchHotModifierAnnoncementsRent();
  const userData = await fetchUserData();

  const forSellFormatted = forSell.map((el) => ({
    ...el,
    isFavorite: userData?.favourites.find(
      (item) => item.annoncementId === el.id
    )
      ? true
      : false,
  }));

  const forRentFormatted = forRent.map((el) => ({
    ...el,
    isFavorite: userData?.favourites.find(
      (item) => item.annoncementId === el.id
    )
      ? true
      : false,
  }));

  return (
    <main className="flex min-h-screen bg-slate-100 flex-col px-4 pb-4">
      <Suspense>
        <HotCategoryGrid
          title="Продажа"
          link="/filter?serviceType=Продажа"
          data={forSellFormatted}
        />
      </Suspense>
      <Suspense>
        <HotCategoryGrid
          title="Аренда"
          link="/filter?serviceType=Аренда"
          data={forRentFormatted}
        />
      </Suspense>
    </main>
  );
}
