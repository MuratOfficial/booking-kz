"use client";

import { MapPin } from "lucide-react";
import React from "react";
import { Link as ScrollLink } from "react-scroll";

interface MapToScrollProps {
  detail1?: string;
  detail2?: string | null;
  detail3?: string | null;
}

function MapToScroll({ detail1, detail2, detail3 }: MapToScrollProps) {
  //   const handleSetActive = (to: string) => {
  //     console.log(to);
  //   };

  return (
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
  );
}

export default MapToScroll;
