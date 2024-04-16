import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";
import LoadingAnnoncements from "./components/loading-annoncements";
import LinksList from "./components/links-list";

interface AnnoncementsLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: "%s | Мои обьявления | etazhi.kz",
    default: "Мои обьявления",
  },
  description: "etazhi.kz | etazhi.kz",
};

export default async function AnnoncementsLayout({
  children,
}: AnnoncementsLayoutProps) {
  return (
    <div className="w-full flex flex-col gap-4 ">
      <div className="rounded-3xl gap-3  flex flex-col  w-full">
        {/* <BreadcrumbLine /> */}
        <Suspense fallback={<LoadingAnnoncements />}>{children}</Suspense>
      </div>
    </div>
  );
}
