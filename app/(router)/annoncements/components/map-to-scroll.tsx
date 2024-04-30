"use client";

import { Building } from "@prisma/client";
import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Link as ScrollLink } from "react-scroll";

interface MapToScrollProps {
  detail1?: string;
  detail2?: string | null;
  detail3?: string | null;
  building?: Building | null;
}

function MapToScroll({
  detail1,
  detail2,
  detail3,
  building,
}: MapToScrollProps) {
  //   const handleSetActive = (to: string) => {
  //     console.log(to);
  //   };

  return (
    <>
      {!building ? (
        <div className="flex flex-row gap-x-1 items-start mt-2 text-sm font-semibold text-blue-500 mb-2">
          <MapPin size={16} />
          <ScrollLink
            to="mapbottom"
            spy={true}
            smooth={true}
            offset={-100}
            delay={150}
            duration={1000}
            // onSetActive={handleSetActive}
            className="flex flex-row gap-x-1 items-start cursor-pointer"
          >
            {detail1} {detail2 && `, ${detail2}`} {detail3 && `, ${detail3}`}
          </ScrollLink>
        </div>
      ) : (
        <div className="w-full flex flex-row flex-wrap gap-2 items-center justify-center text-blue-500">
          <Image
            src={building?.images[0].url || ""}
            aria-hidden
            alt="building-image"
            width={80}
            height={80}
            className="h-10 w-10 rounded-full object-cover border border-blue-500"
          />{" "}
          <ScrollLink
            to="mapbottom"
            spy={true}
            smooth={true}
            offset={-100}
            delay={150}
            duration={1000}
            // onSetActive={handleSetActive}
            className="font-semibold text-sm cursor-pointer"
          >
            {building?.name}
          </ScrollLink>
        </div>
      )}
    </>
  );
}

export default MapToScroll;
