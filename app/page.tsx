import HotCategoryGrid from "@/components/layouts/hot-category-grid";
import { annoncements } from "@/lib/externalData";

export default function Home() {
  const forSell = annoncements
    .filter((el) => el.serviceType === "продажа")
    .map((item) => ({
      city: item.city,
      rating: item.rating,
      isChecked: item.isChecked,
      roomNumber: `${item.roomNumber}-комнатная ${item.categoryType}`,
      floor: item.floor,
      floorFrom: item.floorFrom,
      areaSq: item.areaSq,
      price: item.price,
      images: item.images,
    }));
  const forRent = annoncements
    .filter((el) => el.serviceType === "аренда")
    .map((item) => ({
      city: item.city,
      rating: item.rating,
      isChecked: item.isChecked,
      roomNumber: `${item.roomNumber}-комнатная ${item.categoryType}`,
      floor: item.floor,
      floorFrom: item.floorFrom,
      areaSq: item.areaSq,
      price: item.price,
      images: item.images,
    }));

  return (
    <main className="flex min-h-screen bg-slate-100 flex-col px-4 pb-4">
      <HotCategoryGrid title="Продажа" data={forSell} />
      <HotCategoryGrid title="Аренда" data={forRent} />
    </main>
  );
}
