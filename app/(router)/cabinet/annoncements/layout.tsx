import Link from "next/link";
import { Metadata } from "next";
import BreadcrumbLine from "./components/breadcrumb-line";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import AccordionList from "./components/accordion-list";

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
  // const annoncementListActive = annoncements.filter(
  //   (item) => item.phase === "active"
  // );
  // const annoncementListArchived = annoncements.filter(
  //   (item) => item.phase === "archived"
  // );
  // const annoncementListModeration = annoncements.filter(
  //   (item) => item.phase === "moderation"
  // );

  const session = await getServerSession(authOptions);
  const userIdData = JSON.parse(JSON.stringify(session))?.user;

  const annoncements = await prismadb.annoncement.findMany({
    where: {
      userId: userIdData?.id,
    },
  });

  return (
    <div className="w-full grid grid-cols-5 gap-4 py-2">
      <div className="rounded-3xl h-fit bg-gradient-to-r from-blue-500 to-blue-400 col-span-1 p-2 sticky top-[13%]">
        <AccordionList annoncements={annoncements} />
        <Link
          href="/"
          className="font-semibold flex flex-row items-center justify-center gap-x-1 h-fit bg-blue-500 rounded-full text-neutral-50  transition delay-150 duration-500 p-2 hover:text-blue-500 hover:bg-neutral-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Обьявление
        </Link>
        <div
          className="w-full py-16 bg-no-repeat bg-center bg-contain mt-12 mb-4"
          style={{ backgroundImage: `url(/svg/svg1.svg)` }}
        ></div>
      </div>
      <div className="rounded-3xl  col-span-4 gap-3  flex flex-col  w-full">
        <BreadcrumbLine />
        {children}
      </div>
    </div>
  );
}
