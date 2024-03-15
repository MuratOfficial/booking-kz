import {
  AlertCircle,
  Baby,
  Cigarette,
  CigaretteOff,
  Dog,
  HelpCircle,
  Info,
  LogIn,
  LogOut,
  PartyPopper,
} from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function AnnoncementRules() {
  const rulesIcons = [
    {
      icon: <CigaretteOff size={19} />,
      name: "Курение запрещено",
    },
    {
      icon: <Cigarette size={19} />,
      name: "Курение разрешено",
    },
    {
      icon: <Baby size={19} />,
      name: "Можно с детьми",
    },
    {
      icon: <Dog size={19} />,
      name: "Можно с животными",
    },
    {
      icon: <PartyPopper size={19} />,
      name: "Вечеринки разрешены",
    },
  ];

  return (
    <div className="w-full rounded-xl bg-white flex flex-col gap-2 text-slate-900 h-full px-4 py-3">
      <p className="font-semibold text-lg text-left w-fit">Правила заселения</p>

      <div className="grid grid-cols-2 gap-2 text-sm mt-2">
        <div className="flex flex-row gap-x-2 items-center justify-center">
          <LogIn className="rounded-full bg-slate-900 stroke-green-500 w-10 h-10 p-3" />
          <p className="font-semibold flex flex-col items-center justify-center">
            Заселение
            <span className="font-medium text-slate-900/70">После 14:00</span>
          </p>
        </div>
        <div className="flex flex-row gap-x-2 items-center justify-center">
          <LogOut className="rounded-full bg-slate-900 stroke-red-500 w-10 h-10 p-3" />
          <p className="font-semibold flex flex-col items-center justify-center">
            Выселение
            <span className="font-medium text-slate-900/70">До 12:00</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full mt-2">
        {rulesIcons.map((el, ind) => (
          <span
            className="flex flex-row items-center gap-x-2 font-medium text-sm"
            key={ind}
          >
            <span className="rounded-full border-2 border-slate-900 p-2">
              {el.icon}
            </span>
            {el.name}
          </span>
        ))}
      </div>
      <div className="text-sm font-semibold text-slate-900/90 flex flex-row items-center gap-x-1">
        <span className="rounded-full  text-yellow-400 font-bold bg-slate-900 p-2 flex items-center flex-row justify-center w-[38px] h-[38px] text-lg">
          !
        </span>
        <p className="pl-1">Взимается залог (депозит) при заселении</p>

        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <HelpCircle size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-60 text-xs">
                Оплата служит гарантией сохранности имуществ и ценностей
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default AnnoncementRules;
