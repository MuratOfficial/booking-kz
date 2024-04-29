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
import { Annoncement, Testimonial } from "@prisma/client";
import Link from "next/link";
import { Metadata } from "next";
import MapToScroll from "../components/map-to-scroll";
import TestimonialsToButton from "../components/testimonials-to-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import FavoriteButton from "../components/favorite-button";
import { fetchUserData } from "@/lib/fetchUserData";
import ShareButton from "../components/share-button";
import { fetchUserChats } from "@/lib/fetchChats";
import CallButton from "../components/call-button";

export async function generateMetadata({
  params,
}: {
  params: { annoncementId: string };
}): Promise<Metadata> {
  const annoncement = await fetchAnnoncement(params.annoncementId);

  return {
    title: `${annoncement?.roomNumber}-комнатная
      ${
        annoncement?.categoryType && annoncement?.categoryType.toLowerCase()
      }, этаж ${annoncement?.floor} из ${annoncement?.floorFrom}, площадь ${
      annoncement?.areaSq
    } м²`,
  };
}

const AnnoncementPage = async ({
  params,
}: {
  params: { annoncementId: string };
}) => {
  const annoncement = await fetchAnnoncement(params.annoncementId);

  const userChats = await fetchUserChats();

  const isChatId = userChats?.find(
    (el) => el.annoncementId === annoncement?.id
  );

  const userData = await fetchUserData();

  const nonannoncement = {
    ...annoncement,
    isFavorite: userData?.favourites.find(
      (item) => item.annoncementId === annoncement?.id
    )
      ? true
      : false,
  };

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

  const overallRanking = calculateOverallRanking(annoncement!.testimonials!);

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
      name: "Охраняемая территория",
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

  const filteredArray: any[] = [];
  const filteredArray2: any[] = [];
  const filteredArray3: any[] = [];
  const filteredArray4: any[] = [];
  const filteredArray5: any[] = [];

  additionalFilterWithIcons.forEach((filterItem) => {
    if (
      annoncement?.additionalFilters.some(
        (filteredItem) => filteredItem.value === filterItem.name
      )
    ) {
      filteredArray.push(filterItem);
    }
  });

  additionalFilterWithIcons2.forEach((filterItem) => {
    if (
      annoncement?.additionalFilters.some(
        (filteredItem) => filteredItem.value === filterItem.name
      )
    ) {
      filteredArray2.push(filterItem);
    }
  });

  additionalFilterWithIcons3.forEach((filterItem) => {
    if (
      annoncement?.additionalFilters.some(
        (filteredItem) => filteredItem.value === filterItem.name
      )
    ) {
      filteredArray3.push(filterItem);
    }
  });

  additionalFilterWithIcons4.forEach((filterItem) => {
    if (
      annoncement?.additionalFilters.some(
        (filteredItem) => filteredItem.value === filterItem.name
      )
    ) {
      filteredArray4.push(filterItem);
    }
  });

  additionalFilterWithIcons5.forEach((filterItem) => {
    if (
      annoncement?.additionalFilters.some(
        (filteredItem) => filteredItem.value === filterItem.name
      )
    ) {
      filteredArray5.push(filterItem);
    }
  });

  return (
    <div className="py-4 px-16 min-h-screen flex flex-col gap-2 text-slate-900">
      <HeaderButtons />
      <div className="grid grid-cols-12 gap-4 w-full h-full">
        <div className="col-span-8  w-full h-full gap-4 flex flex-col">
          <CarouselWithThumbs
            images={annoncement?.images}
            isChecked={annoncement?.isChecked!}
          />
          <AnnoncementDescription annoncement={annoncement} />
          <AnnoncementRules annoncement={annoncement} />
          <AnnoncementTestimonials
            testimonials={annoncement?.testimonials || []}
            isUserValid={userData?.id ? true : false}
            serviceType={annoncement?.serviceType}
          />
          <AnnoncementMap
            coordinate1={
              (annoncement?.coordinateX &&
                parseFloat(annoncement?.coordinateX)) ||
              undefined
            }
            coordinate2={
              (annoncement?.coordinateY &&
                parseFloat(annoncement?.coordinateY)) ||
              undefined
            }
          />
        </div>
        <div className="col-span-4 w-full h-full ">
          <div className="bg-white rounded-xl w-full h-fit px-4 py-3 flex flex-col gap-2  sticky top-[10%]">
            <div className="grid grid-cols-3 gap-2 items-center">
              <TestimonialsToButton
                detail1={overallRanking}
                detail2={annoncement?.testimonials.length || 0}
                serviceType={annoncement?.serviceType}
              />
              <FavoriteButton
                id={annoncement?.id}
                isFavorite={nonannoncement.isFavorite}
              />
              <ShareButton title={`Обьявление ${annoncement?.id}`} />
            </div>
            <Separator />
            <div className="flex flex-row gap-x-2 items-center justify-start w-full flex-wrap mt-2">
              <p className="w-fit  font-semibold text-slate-900 text-2xl leading-5">
                {annoncement?.price.toLocaleString().replace(/,/g, " ")} ₸{" "}
              </p>
              <p className="font-normal text-lg opacity-80">
                {annoncement?.serviceTypeExt?.toLowerCase()}
              </p>
            </div>
            <p className="mt-4 font-medium">
              {annoncement?.roomNumber && (
                <span>{annoncement?.roomNumber}-комнатная</span>
              )}{" "}
              {annoncement?.categoryType.toLowerCase()}, этаж{" "}
              {annoncement?.floor} из {annoncement?.floorFrom}, площадь{" "}
              {annoncement?.areaSq} м²
            </p>
            <MapToScroll
              detail1={annoncement?.cityOrDistrict}
              detail2={annoncement?.cityOrTown}
              detail3={annoncement?.townOrStreet}
            />
            <Separator />
            <div className="flex flex-row gap-x-1.5 items-center justify-center  text-lg font-semibold text-slate-900">
              <UserCheck2 className="w-5" />
              <p>{annoncement?.user.name || annoncement?.user.username}</p>
            </div>
            <div className="grid grid-cols-2 w-full gap-2 mb-2">
              <CallButton
                phone={annoncement?.user?.phone}
                id={annoncement?.id}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex flex-row p-3 hover:opacity-80 items-center gap-x-1.5 justify-center rounded-xl bg-green-500 font-medium text-neutral-50">
                    <SquarePen size={16} />
                    <span>Написать</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-green-500 rounded-xl text-neutral-50 font-medium">
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer  text-center hover:bg-neutral-50 rounded-lg focus:bg-neutral-50 focus:text-green-500"
                  >
                    <Link
                      href={`/cabinet/chats/${annoncement?.id}/${annoncement?.user.id}`}
                      target="_blank"
                    >
                      На сайте
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer  text-center hover:bg-neutral-50 rounded-lg focus:bg-neutral-50 focus:text-green-500"
                  >
                    <Link
                      target="_blank"
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
                {filteredArray.slice(0, 8).map((el, ind) => (
                  <span
                    className="flex flex-row items-center gap-x-2 font-semibold text-xs"
                    key={ind}
                  >
                    {el.icon} {el.name}
                  </span>
                ))}
                {filteredArray.length !== 0 && (
                  <Collapsible className="col-span-2 ">
                    <CollapsibleContent className="w-full grid grid-cols-2 gap-2 ">
                      {filteredArray.slice(8).map((el, ind) => (
                        <span
                          className="flex flex-row items-center gap-x-2 font-semibold text-xs"
                          key={ind}
                        >
                          {el.icon} {el.name}
                        </span>
                      ))}
                      {filteredArray2.length > 0 && (
                        <p className="text-sm font-semibold self-start col-span-2 mt-4 text-slate-600">
                          На территории
                        </p>
                      )}

                      {filteredArray2.map((el, ind) => (
                        <span
                          className="flex flex-row items-center gap-x-2 font-semibold text-xs"
                          key={ind}
                        >
                          {el.icon} {el.name}
                        </span>
                      ))}
                      {filteredArray3.length > 0 && (
                        <p className="text-sm font-semibold self-start col-span-2 mt-4 text-slate-600">
                          Вид из окна
                        </p>
                      )}

                      {filteredArray3.map((el, ind) => (
                        <span
                          className="flex flex-row items-center gap-x-2 font-semibold text-xs"
                          key={ind}
                        >
                          {el.icon} {el.name}
                        </span>
                      ))}
                      {filteredArray4.length > 0 && (
                        <p className="text-sm font-semibold self-start col-span-2 mt-4 text-slate-600">
                          Санузел
                        </p>
                      )}

                      {filteredArray4.map((el, ind) => (
                        <span
                          className="flex flex-row items-center gap-x-2 font-semibold text-xs"
                          key={ind}
                        >
                          {el.icon} {el.name}
                        </span>
                      ))}
                      {filteredArray5.length > 0 && (
                        <p className="text-sm font-semibold self-start col-span-2 mt-4 text-slate-600">
                          Дополнительно
                        </p>
                      )}

                      {filteredArray5.map((el, ind) => (
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
                )}
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
