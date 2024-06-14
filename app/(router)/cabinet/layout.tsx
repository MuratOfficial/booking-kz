import { Metadata } from "next";
import {
  CircleDollarSign,
  Plus,
  Star,
  StickyNote,
  UserRoundCog,
  Wallet,
} from "lucide-react";
import LinksList from "./annoncements/components/links-list";
import { fetchUserData } from "@/lib/fetchUserData";
import prismadb from "@/lib/prismadb";
import { fetchUserDataPaymentUpdate } from "@/lib/fetchUpdatedUserData";

export const metadata: Metadata = {
  title: {
    template: "%s | Кабинет | etazhi.kz",
    default: "etazhi.kz",
  },
  description: "etazhi.kz | etazhi.kz",
};

interface CabinetLayoutProps {
  children: React.ReactNode;
}

export default async function CabinetLayout({ children }: CabinetLayoutProps) {
  await fetchUserDataPaymentUpdate();
  return (
    <>
      <div className=" md:px-8 xs:px-2 lg:px-8 py-4 ">
        <div className="flex flex-col gap-y-4">
          <div className="w-full items-center flex flex-col">{children}</div>
        </div>
      </div>
    </>
  );
}
