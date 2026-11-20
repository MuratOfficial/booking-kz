"use client";

import dynamic from "next/dynamic";

// Next 15: `ssr: false` is only allowed inside Client Components.
const MyAnnoncementCardLazy = dynamic(() => import("./my-annoncement-card"), {
  ssr: false,
});

export default MyAnnoncementCardLazy;
