import { Metadata } from "next";
import React from "react";
import NewAnnoncementForm from "../components/new-annoncement-form";

export const metadata: Metadata = {
  title: "Новое обьявление",
  description: "booking.kz | booking.kz",
};

function AnnoncementNew() {
  return (
    <div className="w-full flex flex-col gap-2">
      <NewAnnoncementForm />
    </div>
  );
}

export default AnnoncementNew;
