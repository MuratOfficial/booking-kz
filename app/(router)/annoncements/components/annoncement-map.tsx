"use client";
import React from "react";
import YandexMap from "../../cabinet/annoncements/components/yandex-map";
import { Element } from "react-scroll";

interface AnnoncementMapProps {
  coordinate1?: number | null | undefined;
  coordinate2?: number | null | undefined;
  zoom?: number | null | undefined;
}

function AnnoncementMap({
  coordinate1,
  coordinate2,
  zoom,
}: AnnoncementMapProps) {
  return (
    <div className="w-full rounded-xl bg-white flex flex-col gap-2 text-slate-900 h-full px-4 py-3 overflow-x-hidden">
      <Element name="mapbottom">
        <p className="font-semibold text-lg text-left w-fit">
          Расположение на карте
        </p>
      </Element>

      <YandexMap
        width={740}
        height={540}
        zoom={zoom || 12}
        coordinate1={coordinate1}
        coordinate2={coordinate2}
      />
    </div>
  );
}

export default AnnoncementMap;
