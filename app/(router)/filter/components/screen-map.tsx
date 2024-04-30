"use client";
import React from "react";
import BigMap from "./big-map";

function ScreenMap() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <BigMap width={1800} height={1000} />
    </div>
  );
}

export default ScreenMap;
