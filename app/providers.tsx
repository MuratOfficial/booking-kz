"use client";

import { YMaps } from "@pbe/react-yandex-maps";

import React from "react";

function YandexMapProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <YMaps>{children}</YMaps>;
}

export default YandexMapProvider;
