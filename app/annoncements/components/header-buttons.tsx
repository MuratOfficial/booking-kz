"use client";
import BackButton from "@/components/ui/back-button";
import { useRouter } from "next/navigation";
import React from "react";

function HeaderButtons() {
  return (
    <div className="flex flex-row justify-between text-xs">
      <BackButton />
      <button className="flex flex-row items-center gap-x-1 font-semibold text-red-500 hover:text-red-500/80 transition delay-100 duration-300">
        Пожаловаться на обьявление
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-3 h-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
          />
        </svg>
      </button>
    </div>
  );
}

export default HeaderButtons;
