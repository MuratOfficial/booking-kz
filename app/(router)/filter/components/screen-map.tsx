"use client";
import React from "react";
import BigMap from "./big-map";
import { Analytics, Annoncement, Building, Testimonial } from "@prisma/client";

interface ScreenMapProps {
  annoncements?: (Annoncement & {
    testimonials: Testimonial[];
    analytics: Analytics[];
    buildingName: Building | null;
  } & {
    isFavorite?: boolean;
  })[];
}

function ScreenMap({ annoncements }: ScreenMapProps) {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <BigMap width={1800} height={1000} items={annoncements} />
    </div>
  );
}

export default ScreenMap;
