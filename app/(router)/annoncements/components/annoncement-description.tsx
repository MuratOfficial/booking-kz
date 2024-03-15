"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";

function AnnoncementDescription() {
  const [openText, setOpenText] = React.useState(false);

  function handleClick(state: boolean) {
    if (state) {
      setOpenText(false);
    } else {
      setOpenText(true);
    }
  }

  const exampleText =
    " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quam suscipit earum necessitatibus, saepe eos autem architecto, porrolabore ipsa quo est dolorem sapiente, ad error praesentium? Blanditiis, ex totam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo cupiditate vitae eius, voluptatem quo cum amet aliquid fugit quae.Corporis, totam provident dolore accusamus ipsa dolorem iste obcaecati modi aspernatur. Lorem ipsum dolor, sit amet consectetur adipisicingelit. Quod ipsa hic quo sit reprehenderit perferendis harum iure odiocum veniam impedit, saepe repudiandae culpa ducimus reiciendis nesciunt fuga nobis illum. Et illo fuga ipsam tempore inventore harum excepturi reprehenderit magni atque explicabo ut assumenda, quos voluptatum optioenim eius ad nobis. Quod error consequatur, nihil deserunt atque ex quoearum. Vel et ratione dolore consequuntur sapiente temporibus. Odioanimi incidunt deleniti error quod, dolorem facilis atque, amet possimus commodi ea sapiente nobis omnis, asperiores perferendis ab sed sequiquas necessitatibus! Voluptatibus doloremque aspernatur dolorem commod voluptatem, quo vitae deserunt laboriosam omnis distinctio officiis facere corrupti, dolor aliquid voluptates recusandae est natus reprehenderit magni necessitatibus ea sed veritatis amet. Nisi, obcaecati? Nam voluptatum quam maiores aut obcaecati, odio perferendis porro enim non sint. Recusandae adipisci nesciunt consectetur exmollitia sint blanditiis, veritatis magni ut rem vero, quia at quasiomnis facilis.";
  return (
    <div className="w-full rounded-xl bg-white flex flex-col gap-2 text-slate-900 h-full px-4 py-3">
      <p className="font-semibold text-lg text-left w-fit">Описание обьекта</p>
      <Separator />
      <div className="grid grid-cols-7 gap-2 text-sm">
        <p className="font-semibold col-span-2">
          Состояние ремонта:{" "}
          <span className="font-medium text-slate-900/70">Новое</span>
        </p>
        <p className="font-semibold col-span-2">
          Высота потолков:{" "}
          <span className="font-medium text-slate-900/70">Высокие</span>
        </p>
        <p className="font-semibold col-span-1">
          Этаж: <span className="font-medium text-slate-900/70">3 из 5</span>
        </p>
        <p className="font-semibold col-span-2">
          Год строительства:{" "}
          <span className="font-medium text-slate-900/70">2013</span>
        </p>
      </div>
      <Separator />

      {exampleText.length > 1000 ? (
        <div className="w-full relative">
          <p
            className={cn(
              "text-justify text-sm font-normal max-h-40 line-clamp-[8]",
              openText && "max-h-fit line-clamp-none"
            )}
          >
            {exampleText}
          </p>
          <button
            onClick={() => handleClick(openText)}
            className={cn(
              "absolute bottom-0 w-full bg-white bg-opacity-80 p-2 font-semibold text-sm text-blue-500",
              openText && "relative"
            )}
          >
            {openText ? "Скрыть текст" : "Показать полностью"}
          </button>
        </div>
      ) : (
        <p className="text-justify text-sm font-normal">{exampleText}</p>
      )}
    </div>
  );
}

export default AnnoncementDescription;
