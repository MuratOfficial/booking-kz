import { Metadata } from "next";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import AnnoncementPreviewCard from "@/components/cards/annoncement-preview-card";
import { annoncements } from "@/lib/externalData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MapPin, Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import SideMenuItem from "./components/side-menu-item";

interface AnnoncementsLayoutProps {
  children: React.ReactNode;
}

export default async function AnnoncementsLayout({
  children,
}: AnnoncementsLayoutProps) {
  const annoncementListActive = annoncements.filter(
    (item) => item.phase === "active"
  );
  const annoncementListArchived = annoncements.filter(
    (item) => item.phase === "archived"
  );
  const annoncementListModeration = annoncements.filter(
    (item) => item.phase === "moderation"
  );

  return (
    <div className="w-full grid grid-cols-5 gap-4">
      <div className="rounded-3xl h-fit bg-gradient-to-r from-blue-500 to-blue-400 col-span-1 p-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="items-center focus:text-blue-500 focus:bg-neutral-100 hover:text-blue-500 transition duration-300 font-semibold rounded-full hover:bg-neutral-100 text-center flex flex-row gap-x-1 justify-center text-neutral-100">
              Активные ({annoncementListActive.length})
            </AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-72 w-full rounded-xl bg-neutral-100 text-slate-400 mt-2">
                <ul className="p-4">
                  {annoncementListActive.length > 0 ? (
                    annoncementListActive.map((item, index) => (
                      <SideMenuItem
                        key={item.id}
                        id={item.id}
                        name={`${item.roomNumber}-комнатная ${item.categoryType} - ${item.serviceType} ${item.serviceTypeExt}`}
                        address={item.city}
                        isSeparator={
                          index + 1 < annoncementListActive.length
                            ? true
                            : false
                        }
                      />
                    ))
                  ) : (
                    <p className="text-slate-600 text-xs">
                      Нету активных обьявлении.
                    </p>
                  )}
                </ul>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="items-center focus:text-blue-500 focus:bg-neutral-100 hover:text-blue-500 transition duration-300 font-semibold rounded-full hover:bg-neutral-100 text-center flex flex-row gap-x-1 justify-center text-neutral-100">
              Архив ({annoncementListArchived.length})
            </AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="max-h-72 w-full rounded-xl bg-neutral-100 text-slate-400 mt-2">
                <ul className="p-4">
                  {annoncementListArchived.length > 0 ? (
                    annoncementListArchived.map((item, index) => (
                      <SideMenuItem
                        key={item.id}
                        id={item.id}
                        name={`${item.roomNumber}-комнатная ${item.categoryType} - ${item.serviceType} ${item.serviceTypeExt}`}
                        address={item.city}
                        isSeparator={
                          index + 1 < annoncementListArchived.length
                            ? true
                            : false
                        }
                      />
                    ))
                  ) : (
                    <p className="text-slate-600 text-xs">
                      В архиве нету обьявлении.
                    </p>
                  )}
                </ul>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="items-center focus:text-blue-500 focus:bg-neutral-100 hover:text-blue-500 transition duration-300 font-semibold rounded-full hover:bg-neutral-100 text-center flex flex-row gap-x-1 justify-center text-neutral-100">
              У модератора ({annoncementListModeration.length})
            </AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="max-h-72 w-full rounded-xl bg-neutral-100 text-slate-400 mt-2">
                <ul className="p-4">
                  {annoncementListModeration.length > 0 ? (
                    annoncementListModeration.map((item, index) => (
                      <SideMenuItem
                        key={item.id}
                        id={item.id}
                        name={`${item.roomNumber}-комнатная ${item.categoryType} - ${item.serviceType} ${item.serviceTypeExt}`}
                        address={item.city}
                        isSeparator={
                          index + 1 < annoncementListModeration.length
                            ? true
                            : false
                        }
                      />
                    ))
                  ) : (
                    <p className="text-slate-600 text-xs">
                      Нету обьявлении у модератора.
                    </p>
                  )}
                </ul>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
          className="w-full py-16 bg-no-repeat bg-center bg-contain my-2"
          style={{ backgroundImage: `url(/svg/svg1.svg)` }}
        ></div>
      </div>
      <div className="rounded-3xl aspect-square col-span-4   flex flex-col gap-4 w-full">
        {children}
      </div>
    </div>
  );
}
