import { Annoncement } from "@prisma/client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface AccordionListProps {
  annoncements: Annoncement[];
}

function AccordionList({ annoncements }: AccordionListProps) {
  const annoncementListActive = annoncements.filter(
    (el) => el.phase === "активно"
  );
  const annoncementListArchived = annoncements.filter(
    (el) => el.phase === "блокировано"
  );
  const annoncementListModeration = annoncements.filter(
    (el) => el.phase === "проверка"
  );

  const forBuy = annoncementListModeration.filter(
    (el) => el.serviceType === "Продажа"
  );

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="items-center data-[state=open]:bg-neutral-100 data-[state=open]:text-blue-500  hover:text-blue-500 transition duration-300 font-semibold rounded-full hover:bg-neutral-100 text-center flex flex-row gap-x-1 justify-center text-neutral-100">
          Активные ({annoncementListActive.length})
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="max-h-72 w-full rounded-xl bg-neutral-100 text-slate-400 mt-2">
            <ul className="p-4">
              {annoncementListActive.length > 0 ? (
                <>
                  <Link href="/cabinet/annoncements?serviceType=Продажа">
                    Продажа (
                    {
                      annoncementListActive.filter(
                        (el) => el.serviceType === "Продажа"
                      ).length
                    }
                    )
                  </Link>
                  <Link href="/cabinet/annoncements?serviceType=Аренда">
                    Аренда (
                    {
                      annoncementListActive.filter(
                        (el) => el.serviceType === "Аренда"
                      ).length
                    }
                    )
                  </Link>
                </>
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
        <AccordionTrigger className="items-center data-[state=open]:bg-neutral-100 data-[state=open]:text-blue-500 hover:text-blue-500 transition duration-300 font-semibold rounded-full hover:bg-neutral-100 text-center flex flex-row gap-x-1 justify-center text-neutral-100">
          Архив ({annoncementListArchived.length})
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="max-h-72 w-full rounded-xl bg-neutral-100 text-slate-400 mt-2">
            <ul className="p-4">
              {annoncementListArchived.length > 0 ? (
                <>
                  <Link href="/cabinet/annoncements?serviceType=Продажа">
                    Продажа (
                    {
                      annoncementListArchived.filter(
                        (el) => el.serviceType === "Продажа"
                      ).length
                    }
                    )
                  </Link>
                  <Link href="/cabinet/annoncements?serviceType=Аренда">
                    Аренда (
                    {
                      annoncementListArchived.filter(
                        (el) => el.serviceType === "Аренда"
                      ).length
                    }
                    )
                  </Link>
                </>
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
        <AccordionTrigger className="items-center data-[state=open]:bg-neutral-100 data-[state=open]:text-blue-500 hover:text-blue-500 transition duration-300 font-semibold rounded-full hover:bg-neutral-100 text-center flex flex-row gap-x-1 justify-center text-neutral-100">
          У модератора ({annoncementListModeration.length})
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="max-h-72 w-full rounded-xl bg-neutral-100 text-slate-400 mt-2 flex flex-col gap-1 py-2 px-3">
            {annoncementListModeration.length > 0 ? (
              <div className="flex flex-col gap-2 p-2">
                <Link
                  href="/cabinet/annoncements?serviceType=Продажа"
                  className="hover:text-blue-500"
                >
                  Продажа (
                  {
                    annoncementListModeration.filter(
                      (el) => el.serviceType === "Продажа"
                    ).length
                  }
                  )
                </Link>
                <Link
                  href="/cabinet/annoncements?serviceType=Аренда"
                  className="hover:text-blue-500"
                >
                  Аренда (
                  {
                    annoncementListModeration.filter(
                      (el) => el.serviceType === "Аренда"
                    ).length
                  }
                  )
                </Link>
              </div>
            ) : (
              <p className="text-slate-600 text-xs">
                Нету обьявлении у модератора.
              </p>
            )}
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default AccordionList;
