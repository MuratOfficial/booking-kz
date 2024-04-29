"use client";

import React from "react";
import { Link as ScrollLink } from "react-scroll";

interface TestimonialsToButtonProps {
  detail1?: number | null | undefined;
  detail2?: number | null | undefined;
  serviceType?: string | null;
}

function TestimonialsToButton({
  detail1,
  detail2,
  serviceType,
}: TestimonialsToButtonProps) {
  return (
    <ScrollLink
      to="testimonials"
      spy={true}
      smooth={true}
      offset={-100}
      delay={150}
      duration={1000}
      className="flex flex-col cursor-pointer"
    >
      {serviceType && serviceType === "Аренда" && (
        <span className=" flex flex-row w-fit items-center  gap-x-1 flex-wrap   ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 stroke-yellow-400 fill-yellow-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          <span className="font-bold text-slate-900 text-base">
            {detail1?.toFixed(1)}
          </span>
        </span>
      )}
      {serviceType && serviceType === "Аренда" ? (
        <span className=" text-slate-500 text-xs">
          {detail2 !== 0 ? (
            <>
              {detail2} {detail2 && detail2 > 1 ? "отзывов" : "отзыв"}
            </>
          ) : (
            "Нету отзывов"
          )}
        </span>
      ) : (
        <span className=" text-slate-700 text-xs">
          {detail2 !== 0 ? (
            <>
              {detail2}{" "}
              {detail2 && detail2 > 1 ? "комментариев" : "комментарий"}
            </>
          ) : (
            "Нету комментариев"
          )}
        </span>
      )}
    </ScrollLink>
  );
}

export default TestimonialsToButton;
