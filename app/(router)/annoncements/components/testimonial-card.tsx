import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Testimonial, User } from "@prisma/client";
import { UserCircle2 } from "lucide-react";
import React from "react";

interface TestimonialCardProps {
  cardData: Testimonial & { user: User };
}

function TestimonialCard({ cardData }: TestimonialCardProps) {
  const [openText, setOpenText] = React.useState(false);

  function handleClick(state: boolean) {
    if (state) {
      setOpenText(false);
    } else {
      setOpenText(true);
    }
  }

  return (
    <div className="w-full flex flex-row gap-x-2 items-start text-sm">
      <UserCircle2 className="w-12 h-12 text-slate-400" />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row justify-between">
          <p className="font-bold">{cardData.user.name}</p>
          <div className="flex flex-col self-end">
            <p className="flex flex-row gap-x-1 items-center text-sm self-end">
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
              <span className="font-bold text-slate-900 ">
                {parseFloat(cardData.ranking.overall).toFixed(1)}
              </span>
            </p>

            <span className=" text-slate-500  text-sm">
              {cardData.createdAt.toLocaleDateString()}
            </span>
          </div>
        </div>
        {cardData?.comment && cardData?.comment?.length > 600 ? (
          <div className="w-full relative">
            <p
              className={cn(
                "text-justify text-sm font-normal max-h-20 line-clamp-4",
                openText && "max-h-fit line-clamp-none"
              )}
            >
              {cardData?.comment}
            </p>
            <button
              onClick={() => handleClick(openText)}
              className={cn(
                "absolute bottom-0 w-full bg-white bg-opacity-80 p-1 font-semibold text-xs text-blue-500/80",
                openText && "relative"
              )}
            >
              {openText ? "Скрыть текст" : "Показать полностью"}
            </button>
          </div>
        ) : (
          <p className="text-justify text-sm font-normal">
            {cardData?.comment}
          </p>
        )}
        <Separator />
      </div>
    </div>
  );
}

export default TestimonialCard;
