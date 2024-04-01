"use client";
import React from "react";
import YandexMap from "../../cabinet/annoncements/components/yandex-map";
import { Element } from "react-scroll";

function AnnoncementMap() {
  return (
    <div className="w-full rounded-xl bg-white flex flex-col gap-2 text-slate-900 h-full px-4 py-3">
      <Element name="mapbottom">
        <p className="font-semibold text-lg text-left w-fit">
          Расположение на карте
        </p>
      </Element>

      <YandexMap />
    </div>
  );
}

export default AnnoncementMap;
