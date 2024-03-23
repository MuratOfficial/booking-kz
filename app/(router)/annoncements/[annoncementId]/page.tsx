import React from "react";
import HeaderButtons from "../components/header-buttons";
import CarouselWithThumbs from "../components/carousel-with-thumb";
import {
  Accessibility,
  AirVent,
  AlignCenterVertical,
  AlignEndVertical,
  AlignHorizontalJustifyCenter,
  Anvil,
  ArrowsUpFromLine,
  Bath,
  Blinds,
  Bookmark,
  Building2,
  Cctv,
  CheckCircle2,
  Coffee,
  Columns,
  CookingPot,
  Fan,
  Fence,
  GaugeCircle,
  Heart,
  LandPlot,
  MapPin,
  Microwave,
  ParkingCircle,
  Phone,
  RockingChair,
  Sailboat,
  Share2,
  ShieldCheck,
  ShowerHead,
  SquarePen,
  Tv,
  Tv2,
  UserCheck2,
  WashingMachine,
  Waves,
  Wifi,
  Wind,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AnnoncementDescription from "../components/annoncement-description";
import AnnoncementRules from "../components/annoncement-rules";
import AnnoncementTestimonials from "../components/annoncement-testimonials";
import AnnoncementMap from "../components/annoncement-map";
import BackButton from "@/components/ui/back-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchAnnoncement } from "@/lib/fetchAnnoncement";
import { Testimonial } from "@prisma/client";
import Link from "next/link";

const AnnoncementPage = async ({
  params,
}: {
  params: { annoncementId: string };
}) => {
  const annoncement = await fetchAnnoncement(params.annoncementId);

  function calculateOverallRanking(testimonials: Testimonial[]) {
    let totalOverall = 0;
    let totalCount = 0;

    testimonials.forEach((testimonial) => {
      const ranking = testimonial.ranking;
      const overall = parseFloat(ranking.overall);
      if (!isNaN(overall)) {
        totalOverall += overall;
        totalCount++;
      }
    });

    if (totalCount === 0) {
      return 0;
    }

    return totalOverall / totalCount;
  }

  const overallRanking = calculateOverallRanking(annoncement!.testimonials);

  const additionalFilterWithIcons = [
    {
      icon: <Wifi size={16} />,
      name: "Интернет wi-fi",
    },
    {
      icon: <AirVent size={16} />,
      name: "Кондиционер",
    },
    {
      icon: <Tv size={16} />,
      name: "Телевизор",
    },
    {
      icon: <Tv2 size={16} />,
      name: "SMART ТВ",
    },
    {
      icon: <WashingMachine size={16} />,
      name: "Стиральная машина",
    },
    {
      icon: <Microwave size={16} />,
      name: "Микроволновка",
    },
    {
      icon: <Coffee size={16} />,
      name: "Электрочайник",
    },
    {
      icon: <CookingPot size={16} />,
      name: "Посуда и принадлежности",
    },
    {
      icon: <WashingMachine size={16} />,
      name: "Посудамоечная машина",
    },
    {
      icon: <Anvil size={16} />,
      name: "Утюг с гладильной доской",
    },
    {
      icon: <CheckCircle2 size={16} />,
      name: "Халаты",
    },
    {
      icon: <Bookmark size={16} />,
      name: "Полотенца",
    },
    {
      icon: <Wind size={16} />,
      name: "Фен",
    },
    {
      icon: <Fan size={16} />,
      name: "Сушилка для белья",
    },
    {
      icon: <Columns size={16} />,
      name: "Балкон, лоджия",
    },
  ];

  const additionalFilterWithIcons2 = [
    {
      icon: <ParkingCircle size={16} />,
      name: "Парковка",
    },
    {
      icon: <RockingChair size={16} />,
      name: "Беседка",
    },
    {
      icon: <LandPlot size={16} />,
      name: "Детская площадка",
    },
    {
      icon: <Cctv size={16} />,
      name: "Видеонаблюдение",
    },
    {
      icon: <ShieldCheck size={16} />,
      name: "Охранная территория",
    },
  ];

  const additionalFilterWithIcons3 = [
    {
      icon: <Waves size={16} />,
      name: "На море",
    },
    {
      icon: <Sailboat size={16} />,
      name: "Частично на море",
    },
    {
      icon: <Building2 size={16} />,
      name: "На город",
    },
    {
      icon: <Fence size={16} />,
      name: "Вид во двор",
    },
  ];

  const additionalFilterWithIcons4 = [
    {
      icon: <AlignHorizontalJustifyCenter size={16} />,
      name: "Раздельный",
    },
    {
      icon: <AlignEndVertical size={16} />,
      name: "Совмещеный",
    },
    {
      icon: <AlignCenterVertical size={16} />,
      name: "2 санузла и более",
    },
    {
      icon: <Bath size={16} />,
      name: "Ванна",
    },
    {
      icon: <Blinds size={16} />,
      name: "Душевая перегородка",
    },
    {
      icon: <CheckCircle2 size={16} />,
      name: "Джакузи",
    },
    {
      icon: <GaugeCircle size={16} />,
      name: "Бойлер",
    },
    {
      icon: <ShowerHead size={16} />,
      name: "Гигиенический душ",
    },
  ];

  const additionalFilterWithIcons5 = [
    {
      icon: <ArrowsUpFromLine size={16} />,
      name: "Лифт",
    },
    {
      icon: <Accessibility size={16} />,
      name: "Доступ для инвалидов",
    },
  ];

  return (
    <div className="py-4 px-16 min-h-screen flex flex-col gap-2 text-slate-900">
      <HeaderButtons />
      <div className="grid grid-cols-12 gap-4 w-full h-full">
        <div className="col-span-8  w-full h-full gap-4 flex flex-col">
          <CarouselWithThumbs />
          <AnnoncementDescription />
          <AnnoncementRules />
          <AnnoncementTestimonials />
          <AnnoncementMap />
        </div>
        <div className="col-span-4 w-full h-full ">
          <div className="bg-white rounded-xl w-full h-fit px-4 py-3 flex flex-col gap-2  sticky top-[10%]">
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="flex flex-col">
                <span className=" flex flex-row w-fit items-center  gap-x-1 flex-wrap text-xs  ">
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
                  <span className="font-bold text-slate-900 text-sm">
                    {overallRanking}
                  </span>
                </span>
                <span className=" text-slate-500 text-xs">
                  {annoncement?.testimonials.length || 0} отзывов
                </span>
              </div>

              <button className=" px-1.5 py-1 overflow-hidden  rounded-full  duration-300 ease-in-out   flex  flex-row gap-x-1 items-center hover:bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                <Heart className="stroke-slate-700" size={14} />
                <span className="text-slate-700 font-medium  text-xs ">
                  В Избранные
                </span>
              </button>
              <button className=" px-1.5 py-1 overflow-hidden  rounded-full  duration-300 ease-in-out   flex  flex-row gap-x-1 items-center hover:bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                <Share2 className="stroke-slate-700" size={14} />
                <span className="text-slate-700 font-medium  text-xs ">
                  Поделиться
                </span>
              </button>
            </div>
            <Separator />
            <div className="flex flex-row gap-x-2 items-center justify-start w-full flex-wrap mt-2">
              <p className="w-fit  font-semibold text-slate-900 text-2xl leading-5">
                {annoncement?.price.toLocaleString().replace(/,/g, " ")} ₸{" "}
              </p>
              <p className="font-normal text-lg opacity-80">посуточно</p>
            </div>
            <p className="mt-4 font-medium">
              {annoncement?.roomNumber && (
                <span>{annoncement?.roomNumber}-комнатная</span>
              )}
              {annoncement?.categoryType.toLowerCase()}, этаж{" "}
              {annoncement?.floor} из {annoncement?.floorFrom}, площадь{" "}
              {annoncement?.areaSq} м²
            </p>
            <div className="flex flex-row gap-x-1 items-start mt-2 text-sm font-semibold text-blue-500 mb-2">
              <MapPin size={16} />
              <p>
                {annoncement?.cityOrDistrict}{" "}
                {annoncement?.cityOrTown && `, ${annoncement.cityOrTown}`}{" "}
                {annoncement?.townOrStreet && `, ${annoncement.townOrStreet}`}
              </p>
            </div>
            <Separator />
            <div className="flex flex-row gap-x-1.5 items-center justify-center  text-lg font-semibold text-slate-900">
              <UserCheck2 className="w-5" />
              <p>{annoncement?.user.name || annoncement?.user.username}</p>
            </div>
            <div className="grid grid-cols-2 w-full gap-2 mb-2">
              <Link
                href={`tel:${annoncement?.user.phone}`}
                className="flex flex-row p-3 hover:opacity-80 items-center gap-x-1.5 justify-center rounded-xl bg-blue-500 font-medium text-neutral-50"
              >
                <Phone size={16} />
                <span>Позвонить</span>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex flex-row p-3 hover:opacity-80 items-center gap-x-1.5 justify-center rounded-xl bg-green-500 font-medium text-neutral-50">
                    <SquarePen size={16} />
                    <span>Написать</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-green-500 rounded-xl text-neutral-50 font-medium">
                  <DropdownMenuItem className="cursor-pointer  text-center hover:bg-neutral-50 rounded-lg focus:bg-neutral-50 focus:text-green-500">
                    На сайте
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer  text-center hover:bg-neutral-50 rounded-lg focus:bg-neutral-50 focus:text-green-500"
                  >
                    <Link
                      href={`https://wa.me/${
                        annoncement?.user.phone &&
                        annoncement?.user.phone.replace(/\+/g, "")
                      }`}
                    >
                      Whatsapp
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Separator />
            <div className="w-full flex flex-col gap-2">
              <p className="font-bold">Основные удобства</p>
              <div className="w-full grid grid-cols-2 gap-2 ">
                {additionalFilterWithIcons.slice(0, 8).map((el, ind) => (
                  <span
                    className="flex flex-row items-center gap-x-2 font-semibold text-xs"
                    key={ind}
                  >
                    {el.icon} {el.name}
                  </span>
                ))}
                <Collapsible className="col-span-2 ">
                  <CollapsibleContent className="w-full grid grid-cols-2 gap-2 ">
                    {additionalFilterWithIcons.slice(8).map((el, ind) => (
                      <span
                        className="flex flex-row items-center gap-x-2 font-semibold text-xs"
                        key={ind}
                      >
                        {el.icon} {el.name}
                      </span>
                    ))}
                    <p className="text-sm font-semibold self-start col-span-2 mt-4 text-slate-600">
                      На территории
                    </p>
                    {additionalFilterWithIcons2.map((el, ind) => (
                      <span
                        className="flex flex-row items-center gap-x-2 font-semibold text-xs"
                        key={ind}
                      >
                        {el.icon} {el.name}
                      </span>
                    ))}
                    <p className="text-sm font-semibold self-start col-span-2 mt-4 text-slate-600">
                      Вид из окна
                    </p>
                    {additionalFilterWithIcons3.map((el, ind) => (
                      <span
                        className="flex flex-row items-center gap-x-2 font-semibold text-xs"
                        key={ind}
                      >
                        {el.icon} {el.name}
                      </span>
                    ))}
                    <p className="text-sm font-semibold self-start col-span-2 mt-4 text-slate-600">
                      Санузел
                    </p>
                    {additionalFilterWithIcons4.map((el, ind) => (
                      <span
                        className="flex flex-row items-center gap-x-2 font-semibold text-xs"
                        key={ind}
                      >
                        {el.icon} {el.name}
                      </span>
                    ))}
                    <p className="text-sm font-semibold self-start col-span-2 mt-4 text-slate-600">
                      Дополнительно
                    </p>
                    {additionalFilterWithIcons5.map((el, ind) => (
                      <span
                        className="flex flex-row items-center gap-x-2 font-semibold text-xs"
                        key={ind}
                      >
                        {el.icon} {el.name}
                      </span>
                    ))}
                  </CollapsibleContent>
                  <CollapsibleTrigger asChild>
                    <button className="border hover:border-slate-900 hover:text-slate-900 transition delay-100 duration-300 data-[state=open]:hidden px-2 py-1 mt-2 rounded-xl border-slate-400 text-slate-400 text-xs font-medium">
                      Показать все удобства
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleTrigger asChild>
                    <button className="border hover:border-slate-900 hover:text-slate-900 transition delay-100 duration-300 data-[state=open]:flex data-[state=closed]:hidden px-2 py-1 mt-2 rounded-xl border-slate-400 text-slate-400 text-xs font-medium">
                      Скрыть
                    </button>
                  </CollapsibleTrigger>
                </Collapsible>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackButton />
    </div>
  );
};

export default AnnoncementPage;
