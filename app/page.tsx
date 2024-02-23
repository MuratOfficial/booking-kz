import HotCategoryGrid from "@/components/layouts/hot-category-grid";
import MainNav from "@/components/layouts/main-nav";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-slate-100 flex-col px-24">
      <HotCategoryGrid />
    </main>
  );
}
