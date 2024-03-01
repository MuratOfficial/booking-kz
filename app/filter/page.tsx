import React from "react";
import Filter from "./components/filter";

function FilterPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full flex flex-col min-h-screen p-4 gap-4">
      <Filter />
    </div>
  );
}

export default FilterPage;
