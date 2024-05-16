import { fetchUserData } from "@/lib/fetchUserData";
import { fetchFilteredAnnoncements } from "@/lib/fetchingFilter";
import React from "react";
import ShownAnnoncements from "./shown-annoncements";

async function FilteredAnnoncements({
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
}) {
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
  const userData = await fetchUserData();

  const annoncements = nonfilteredannoncements.map((el) => ({
    ...el,
    isFavorite: userData?.favourites.find(
      (item) => item.annoncementId === el.id
    )
      ? true
      : false,
  }));

  return <ShownAnnoncements annoncements={annoncements} />;
}

export default FilteredAnnoncements;
