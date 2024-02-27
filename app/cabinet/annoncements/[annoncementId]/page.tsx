import AnnoncementPreviewCard from "@/components/cards/annoncement-preview-card";
import { annoncements } from "@/lib/externalData";
import React from "react";

function AnnoncementPage({ params }: { params: { annoncementId: string } }) {
  const data = annoncements.filter((el) => el.id === params.annoncementId)[0];
  return (
    <>
      <AnnoncementPreviewCard data={data} />
    </>
  );
}

export default AnnoncementPage;
