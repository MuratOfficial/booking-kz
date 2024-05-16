import React, { Suspense } from "react";
import Filter from "./components/filter";

import HotSuggestCard from "@/components/cards/hot-suggest-card";

import {
  fetchBuildings,
  fetchFilteredAnnoncements,
} from "@/lib/fetchingFilter";
import { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import ShownAnnoncements from "./components/shown-annoncements";
import {
  fetchHotModifierAnnoncementsRent,
  fetchHotModifierAnnoncementsSell,
} from "@/lib/fetchAnnoncement";
import { Annoncement, Testimonial } from "@prisma/client";
import { fetchUserData } from "@/lib/fetchUserData";
import BigMap from "./components/big-map";
import ScreenMap from "./components/screen-map";
import FilteredAnnoncements from "./components/filtered-annoncements";
import FilteredAnnFallback from "./components/filtered-ann-fallback";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: {
    serviceType?: string;
    phase?: string;
    categoryType?: string[];
    roomNumber?: string[];
    priceFrom?: string;
    priceTo?: string;
    areaSqFrom?: string;
    areaSqTo?: string;
    city?: string;
    more?: string[];
    cityOrTown?: string;
    street?: string;
  };
}): Promise<Metadata> {
  const annoncements = await fetchFilteredAnnoncements(
    searchParams?.serviceType,
    searchParams?.phase,
    searchParams?.categoryType,
    searchParams?.roomNumber,
    searchParams?.priceFrom,
    searchParams?.priceTo,
    searchParams?.areaSqFrom,
    searchParams?.areaSqTo,
    searchParams?.city,
    searchParams?.more,
    searchParams?.cityOrTown,
    searchParams?.street
  );

  return {
    title: `Найдено ${annoncements.length} обьявлении(-я)`,
  };
}

const FilterPage = async ({
  searchParams,
}: {
  searchParams?: {
    serviceType?: string;
    phase?: string;
    categoryType?: string[];
    roomNumber?: string[];
    priceFrom?: string;
    priceTo?: string;
    areaSqFrom?: string;
    areaSqTo?: string;
    city?: string;
    more?: string[];
    cityOrTown?: string;
    street?: string;
    building?: string;
    map?: string;
    priceNego?: string;
    serviceTypeExt?: string[];
  };
}) => {
  const hotannoncementsrent = await fetchHotModifierAnnoncementsRent();
  const hotannoncementssell = await fetchHotModifierAnnoncementsSell();

  // const userData = await fetchUserData();

  const shuffle = (
    array: (Annoncement & { testimonials: Testimonial[] } & {
      isFavorite?: boolean;
    })[]
  ) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const hotAnnoncements = shuffle([
    ...hotannoncementsrent,
    ...hotannoncementssell,
  ]);

  const nonfilteredannoncements = await fetchFilteredAnnoncements(
    searchParams?.serviceType,
    searchParams?.phase,
    searchParams?.categoryType,
    searchParams?.roomNumber,
    searchParams?.priceFrom,
    searchParams?.priceTo,
    searchParams?.areaSqFrom,
    searchParams?.areaSqTo,
    searchParams?.city,
    searchParams?.more,
    searchParams?.cityOrTown,
    searchParams?.street,
    searchParams?.building,
    searchParams?.priceNego,
    searchParams?.serviceTypeExt
  );

  // const annoncements = nonfilteredannoncements.map((el) => ({
  //   ...el,
  //   isFavorite: userData?.favourites.find(
  //     (item) => item.annoncementId === el.id
  //   )
  //     ? true
  //     : false,
  // }));

  const buildings = await fetchBuildings(searchParams?.city);

  return (
    <>
      <>
        <Suspense
          fallback={
            <Skeleton className=" w-full h-72 rounded-2xl bg-blue-300" />
          }
        >
          <Filter
            allcount={nonfilteredannoncements.length}
            buildings={buildings}
          />
        </Suspense>

        <div className="w-full grid grid-cols-7 gap-4">
          <div className="col-span-5">
            {searchParams?.map === "on" && searchParams?.city ? (
              <ScreenMap annoncements={nonfilteredannoncements} />
            ) : (
              <Suspense
                key={nonfilteredannoncements.length}
                fallback={<FilteredAnnFallback />}
              >
                <FilteredAnnoncements searchParams={searchParams} />
              </Suspense>
            )}
          </div>

          <div className="col-span-2 bg-white rounded-xl h-fit w-full flex flex-col gap-4 items-center py-2 px-3">
            <h1 className="font-semibold">Горячие предложения</h1>
            {hotAnnoncements.slice(0, 16).map((el, keyid) => (
              <HotSuggestCard data={el} key={keyid} />
            ))}
          </div>
        </div>
      </>
    </>
  );
};

export default FilterPage;
