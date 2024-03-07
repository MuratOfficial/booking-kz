import React from "react";

function AnnoncementMap() {
  return (
    <div className="w-full rounded-xl bg-white flex flex-col gap-2 text-slate-900 h-full px-4 py-3">
      <p className="font-semibold text-lg text-left w-fit">
        Расположение на карте
      </p>
      <div className="border rounded-lg w-full h-60">
        Карта еще не настроена
      </div>
    </div>
  );
}

export default AnnoncementMap;
