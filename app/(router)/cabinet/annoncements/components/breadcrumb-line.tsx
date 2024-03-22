"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function BreadcrumbLine() {
  const pathname = usePathname();
  const params = useParams();

  return (
    <Breadcrumb className="pl-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Главная</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/cabinet/annoncements"
            className={cn(
              pathname === "/cabinet/annoncements" &&
                "text-blue-500 font-semibold"
            )}
          >
            Мои обьявления
          </BreadcrumbLink>
        </BreadcrumbItem>
        {params.annoncementId && (
          <>
            <BreadcrumbSeparator />
            {params.annoncementId === "new" && (
              <BreadcrumbItem>
                <BreadcrumbPage className="text-blue-500 font-semibold">
                  Новое обьявление
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
            {params.annoncementId !== "new" && (
              <BreadcrumbItem>
                <BreadcrumbPage className="text-blue-500 font-semibold">
                  Обьявление ID {params.annoncementId}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbLine;
