import AnnoncementPreviewCard from "@/components/cards/annoncement-preview-card";
import { annoncements } from "@/lib/externalData";
import { Metadata } from "next";
import React from "react";

export function generateMetadata({
  params,
}: {
  params: { annoncementId: string };
}) {
  const annoncement = annoncements.filter(
    (el) => el.id === params.annoncementId
  )[0];

  return {
    title: `${annoncement?.roomNumber}-комнатная квартира, ${annoncement.areaSq} м²,{" "}
    ${annoncement.floor}/${annoncement.floorFrom} этаж, ${annoncement.serviceTypeExt} за{" "}
    ${annoncement.price} ₸`,
  };
}

function AnnoncementPage({ params }: { params: { annoncementId: string } }) {
  const data = annoncements.filter((el) => el.id === params.annoncementId)[0];
  return (
    <>
      <AnnoncementPreviewCard data={data} />
    </>
  );
}

export default AnnoncementPage;
