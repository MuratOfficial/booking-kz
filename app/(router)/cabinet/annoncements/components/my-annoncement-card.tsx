"use client";

import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import {
  ArrowBigUp,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Coins,
  Copy,
  CreditCard,
  Crown,
  Eye,
  Flame,
  Heart,
  Loader,
  Loader2,
  MapPin,
  Phone,
  RefreshCcw,
  Rocket,
  Star,
  ThumbsUpIcon,
  UserRoundCheck,
  Wallet,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Analytics,
  Annoncement,
  Building,
  ModifierType,
  Payment,
  Subscription,
  Testimonial,
} from "@prisma/client";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Graphics = dynamic(() => import("@/components/layouts/graphics"), {
  ssr: false,
});

import PhaseChangeButton from "./phase-change-button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SubsDateChangeButton from "./subs-date-change-button";
import { NewPriceForm } from "./change-price-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Modifiers from "./modifiers";

interface MyAnnoncementCardProps {
  data: Annoncement & {
    testimonials: Testimonial[];
    analytics: Analytics[];
    buildingName: Building | null;
  };
  subs?: Subscription[] | null;
  userId?: string | undefined | null;
  totalBalance?: string | undefined | null;
  bonusBalance?: string | undefined | null;
  phone?: string | null;
  email?: string | null;
  modifiers?: ModifierType[] | null;
  payments?: Payment[] | null;
}

const SubsSchema = z.object({
  sum: z.string().optional(),
  type: z.string().optional(),
  userId: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  id: z.string().optional(),
  subsId: z.string().optional(),
  subsDays: z.number().int().optional(),
});

type SubsValue = z.infer<typeof SubsSchema>;

function MyAnnoncementCard({
  data,
  subs,
  userId,
  totalBalance,
  bonusBalance,
  phone,
  email,
  modifiers,
  payments,
}: MyAnnoncementCardProps) {
  const [api, setApi] = React.useState<CarouselApi>();

  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      console.log("current");
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollPrev = React.useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

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

  function overallCount(analytics: Analytics[]) {
    let totalCount = 0;
    let mobileCount = 0;
    if (analytics) {
      for (const item of analytics) {
        if (typeof item.viewCount === "number") {
          totalCount += item.viewCount;
        }
        if (typeof item.mobileCount === "number") {
          mobileCount += item.mobileCount;
        }
      }
    }

    return { totalCount, mobileCount };
  }

  const currentDate = new Date();

  const overallAnalyticsView = overallCount(data.analytics);

  const icons = [
    {
      value: "1",
      icon: <Crown className="w-7" />,
    },
    {
      value: "2",
      icon: <Flame className="w-7" />,
    },
    {
      value: "3",
      icon: <CheckCircle2 className="w-7" />,
    },
    {
      value: "4",
      icon: <Rocket className="w-7" />,
    },
    {
      value: "5",
      icon: <ThumbsUpIcon className="w-7" />,
    },
    {
      value: "6",
      icon: <Star className="w-7" />,
    },
    {
      value: "7",
      icon: <Heart className="w-7" />,
    },
  ];

  const overallRanking = calculateOverallRanking(data.testimonials);

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<SubsValue>({
    resolver: zodResolver(SubsSchema),
    defaultValues: {
      userId: userId || "",
      phone: phone || "",
      email: email || "",
      id: data.id,
    },
  });

  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = React.useState(0);

  async function onSubmit(formData: SubsValue) {
    try {
      setLoading(true);

      const paymentUrl = await axios.post(
        `/api/cabinet/payment/subs`,
        formData
      );

      setTimeout(() => {
        router.refresh();
        if (picked === "direct") {
          toast({
            title: "Идет переадресация...",
          });
          router.push(paymentUrl?.data);
        } else {
          toast({
            title: "Подписка успешно оформлена",
          });
        }
      }, 500);
    } catch (error: any) {
      toast({ description: "Что-то пошло не так...", variant: "destructive" });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  const [picked, setPicked] = React.useState("");
  const [leftBalance, setLeftBalance] = React.useState(0);
  const [leftBonus, setLeftBonus] = React.useState(0);

  return (
    <div className="flex flex-col w-full bg-white bg-opacity-40 backdrop-blur-sm rounded-xl ">
      <div className="flex flex-row items-center justify-between px-4 pt-2 pb-1">
        <div className="flex flex-row gap-x-4 items-center ">
          <p className="text-slate-400 text-xs uppercase">
            {data.serviceType} {data?.serviceTypeExt} {data.categoryType}
          </p>
          <div className="flex text-slate-400 flex-row items-center gap-x-2">
            <p className=" text-xs uppercase">ID: {data.id}</p>
            <button onClick={() => navigator.clipboard.writeText(data.id)}>
              <Copy className="w-4 hover:text-blue-500" />
            </button>
          </div>
        </div>
        <div className="flex text-slate-400 flex-row gap-x-4 items-center text-xs">
          <p>
            На сайте до:{" "}
            <span className=" underline underline-offset-2">
              {data?.subscriptionDate?.toLocaleDateString()}
            </span>
          </p>

          <SubsDateChangeButton id={data.id} date={data?.subscriptionDate} />
        </div>
      </div>
      <div className="w-full rounded-xl hover:shadow-xl shadow-md transition delay-100 duration-300 ">
        <div
          className="w-full   bg-white rounded-xl grid grid-cols-12"
          style={{
            backgroundColor: `${
              data.hurryModifierDate && data?.hurryModifierDate > currentDate
                ? "#fee2e2"
                : "white"
            }`,
          }}
        >
          <div className="  h-full flex items-center justify-center  col-span-3">
            <Carousel
              setApi={setApi}
              className="w-full group h-[240px] relative rounded-xl items-center flex justify-center"
            >
              <CarouselContent>
                {data.images.map((img, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={img.url}
                      alt={`img+${index}`}
                      width={900}
                      height={1200}
                      className=" object-cover  h-[240px] rounded-l-xl"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <button
                className="absolute hover:opacity-100 hover:bg-opacity-100 left-2 rounded-full opacity-60 group-hover:text-slate-800 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1.5 items-center flex text-transparent"
                onClick={scrollPrev}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                className="absolute hover:opacity-100 hover:bg-opacity-100 right-2 rounded-full opacity-60 group-hover:text-slate-800 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1.5 items-center flex text-transparent"
                onClick={scrollNext}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
              {data.serviceType === "Аренда" && (
                <span className="py-0.5 px-2 group-hover:text-transparent  group-hover:bg-transparent flex flex-row items-center gap-x-0.5 rounded-full bg-slate-200  bg-opacity-50 absolute top-2 left-2 transition delay-100 duration-300 hover:bg-opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 stroke-yellow-500 fill-yellow-500 group-hover:fill-transparent group-hover:stroke-transparent transition delay-100 duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  <span className="font-bold text-slate-900 group-hover:text-transparent   text-base transition delay-100 duration-300">
                    {overallRanking.toFixed(1)}
                  </span>
                </span>
              )}

              {data.isChecked && data.serviceType === "Аренда" && (
                <span className=" py-0.5 px-1.5 group-hover:text-transparent  group-hover:bg-transparent flex flex-row items-center gap-x-1 rounded-r-full bg-blue-500  absolute top-10 left-0 transition delay-100 duration-300 hover:bg-opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-4 h-4 stroke-neutral-100 group-hover:stroke-transparent transition delay-100 duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <span className="font-medium text-neutral-100 text-[10px] group-hover:text-transparent transition delay-100 duration-300">
                    Проверено
                  </span>
                </span>
              )}

              <span className="absolute bottom-2 right-2 text-sm py-1 px-2 rounded-lg group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent">
                {current}/{count}
              </span>
            </Carousel>
          </div>
          <div className="w-full  col-span-9  flex flex-row items-center max-h-[240px] p-2 ">
            <div className="flex flex-col gap-2 w-[60%] h-full py-2 px-3 justify-between">
              <div className="col-span-3 flex flex-col gap-1 w-full">
                <div className="w-full flex flex-row justify-between items-center">
                  <div className="flex flex-col gap-1 w-full">
                    <p className="  text-slate-900 group font-semibold text-lg text-left flex flex-row gap-x-1 items-center">
                      {data?.roomNumber}-комнатная {data.categoryType},{" "}
                      {data.areaSq} м², {data.floor}/{data.floorFrom} этаж{" "}
                    </p>
                    <div className="flex flex-row justify-between gap-x-4 flex-wrap w-full">
                      <p className=" text-slate-900/50 flex flex-row items-center gap-x-1 font-medium text-sm rounded-full  text-center w-fit">
                        <MapPin className="stroke-red-500" size={12} />{" "}
                        {data?.cityOrDistrict && `${data?.cityOrDistrict}`}
                        {!data?.buildingName && (
                          <span className="flex flex-row gap-x-1">
                            {data?.cityOrTown && `, ${data?.cityOrTown}`}
                            {data?.townOrStreet && `, ${data?.townOrStreet}`}
                          </span>
                        )}
                      </p>
                      {data?.buildingName && (
                        <p className=" text-slate-900/50 flex flex-row items-center gap-x-1 font-medium text-sm rounded-full  w-fit">
                          <Building2 className="stroke-blue-500" size={12} />{" "}
                          {data?.buildingName.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <p className="line-clamp-2 text-sm text-slate-900/90 mt-2">
                {data?.description}
              </p>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-x-1  items-center">
                  {data?.fizOrBiz === "fiz" && (
                    <div className="text-green-500 flex flex-row gap-x-1">
                      <UserRoundCheck size={14} />
                      <p className="text-xs font-semibold">Физическое лицо</p>
                    </div>
                  )}
                  {data?.fizOrBiz === "biz" && (
                    <div className="text-violet-500 flex flex-row gap-x-1">
                      <Briefcase size={14} />
                      <p className="text-xs font-semibold">Юридическое лицо</p>
                    </div>
                  )}
                </div>
                <Link
                  href={`/annoncements/${data.id}`}
                  className="text-slate-500 hover:text-blue-500 text-xs hover:underline underline-offset-2 font-medium"
                >
                  Перейти к обьявлению
                </Link>
              </div>

              <div className="w-full flex flex-row justify-between items-end">
                <div className="text-sm flex flex-row items-center gap-1">
                  {/* <p className="text-sm font-semibold text-slate-800 ">
                  Контакты:{" "}
                  <span className="text-slate-600 font-normal">{data.phone}</span>
                </p> */}
                  <p className=" font-semibold text-slate-500 text-xs">
                    <span className="text-slate-400 font-normal pl-1">
                      {data.createdAt.toLocaleDateString()}
                    </span>
                  </p>
                  <div className="flex flex-row gap-0.5 items-center text-slate-400 px-4 text-xs">
                    <Eye className="w-3" />{" "}
                    {overallAnalyticsView.totalCount || 0}
                    <Phone className="w-3 ml-1" />{" "}
                    {overallAnalyticsView.mobileCount || 0}
                  </div>
                </div>
                <div className="flex flex-row gap-x-1 items-center justify-center">
                  {data?.hotModifierDate &&
                    payments?.find((el) => el.id === data.hotModifierPaidStatus)
                      ?.status !== "pending" &&
                    data?.hotModifierDate > currentDate && (
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 128 128"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--noto"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <radialGradient
                          id="IconifyId17ecdb2904d178eab8626"
                          cx="68.884"
                          cy="124.296"
                          r="70.587"
                          gradientTransform="matrix(-1 -.00434 -.00713 1.6408 131.986 -79.345)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset=".314" stopColor="#ff9800"></stop>
                          <stop offset=".662" stopColor="#ff6d00"></stop>
                          <stop offset=".972" stopColor="#f44336"></stop>
                        </radialGradient>
                        <path
                          d="M35.56 40.73c-.57 6.08-.97 16.84 2.62 21.42c0 0-1.69-11.82 13.46-26.65c6.1-5.97 7.51-14.09 5.38-20.18c-1.21-3.45-3.42-6.3-5.34-8.29c-1.12-1.17-.26-3.1 1.37-3.03c9.86.44 25.84 3.18 32.63 20.22c2.98 7.48 3.2 15.21 1.78 23.07c-.9 5.02-4.1 16.18 3.2 17.55c5.21.98 7.73-3.16 8.86-6.14c.47-1.24 2.1-1.55 2.98-.56c8.8 10.01 9.55 21.8 7.73 31.95c-3.52 19.62-23.39 33.9-43.13 33.9c-24.66 0-44.29-14.11-49.38-39.65c-2.05-10.31-1.01-30.71 14.89-45.11c1.18-1.08 3.11-.12 2.95 1.5z"
                          fill="url(#IconifyId17ecdb2904d178eab8626)"
                        ></path>
                        <radialGradient
                          id="IconifyId17ecdb2904d178eab8627"
                          cx="64.921"
                          cy="54.062"
                          r="73.86"
                          gradientTransform="matrix(-.0101 .9999 .7525 .0076 26.154 -11.267)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset=".214" stopColor="#fff176"></stop>
                          <stop offset=".328" stopColor="#fff27d"></stop>
                          <stop offset=".487" stopColor="#fff48f"></stop>
                          <stop offset=".672" stopColor="#fff7ad"></stop>
                          <stop offset=".793" stopColor="#fff9c4"></stop>
                          <stop
                            offset=".822"
                            stopColor="#fff8bd"
                            stopOpacity=".804"
                          ></stop>
                          <stop
                            offset=".863"
                            stopColor="#fff6ab"
                            stopOpacity=".529"
                          ></stop>
                          <stop
                            offset=".91"
                            stopColor="#fff38d"
                            stopOpacity=".209"
                          ></stop>
                          <stop
                            offset=".941"
                            stopColor="#fff176"
                            stopOpacity="0"
                          ></stop>
                        </radialGradient>
                        <path
                          d="M76.11 77.42c-9.09-11.7-5.02-25.05-2.79-30.37c.3-.7-.5-1.36-1.13-.93c-3.91 2.66-11.92 8.92-15.65 17.73c-5.05 11.91-4.69 17.74-1.7 24.86c1.8 4.29-.29 5.2-1.34 5.36c-1.02.16-1.96-.52-2.71-1.23a16.09 16.09 0 0 1-4.44-7.6c-.16-.62-.97-.79-1.34-.28c-2.8 3.87-4.25 10.08-4.32 14.47C40.47 113 51.68 124 65.24 124c17.09 0 29.54-18.9 19.72-34.7c-2.85-4.6-5.53-7.61-8.85-11.88z"
                          fill="url(#IconifyId17ecdb2904d178eab8627)"
                        ></path>
                      </svg>
                    )}

                  {data?.topModifierDate &&
                    payments?.find((el) => el.id === data.topModifierPaidStatus)
                      ?.status !== "pending" &&
                    data?.topModifierDate > currentDate && (
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 128 128"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--noto"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <path
                          fill="#ca2c31"
                          d="M3.77 71.73l16.34-16.1l27.82-4.93l-2.75 14.56L7.57 76.82l-2.43-1.05z"
                        ></path>
                        <path
                          fill="#a02422"
                          d="M22.94 59.76L5.2 75.88l13.05 6.36l19.81-10.11v-4.77l4.05-10.92z"
                        ></path>
                        <path
                          d="M64.92 88.15l-8.57 3.72l-8.09 17.15s7.12 15.77 7.44 15.77c.32 0 4.37.32 4.37.32l14.4-16.1l3.64-27.5l-13.19 6.64z"
                          fill="#a02422"
                        ></path>
                        <path
                          d="M56.5 100.84s4.77-.97 8.17-2.59c3.4-1.62 7.6-4.04 7.6-4.04l-1.54 13.43l-15.05 17.13s-.59-.73-3.09-6.17c-1.99-4.34-2.68-5.89-2.68-5.89l6.59-11.87z"
                          fill="#ca2c31"
                        ></path>
                        <path
                          d="M31.58 80.66s-5.74-.48-12.03 7.47c-5.74 7.26-8.43 19.08-9.47 22.12s-3.53 3.66-2.7 5.05s4.42 1.31 8.85.76s8.23-1.94 8.23-1.94s-.19.48-.83 1.52c-.23.37-1.03.9-.97 1.45c.14 1.31 11.36 1.34 20.32-7.88c9.68-9.95 4.98-18.11 4.98-18.11L31.58 80.66z"
                          fill="#f7d74d"
                        ></path>
                        <path
                          d="M33.31 85.29s-6.19.33-11.31 8.28s-7.5 17.16-7.01 17.78c.48.62 10.02-2.83 12.31-2.14c1.57.48.76 2.07 1.18 2.49c.35.35 4.49.94 11.19-6.32c6.71-7.26 5.12-17.46 5.12-17.46l-11.48-2.63z"
                          fill="#fbf0b4"
                        ></path>
                        <path
                          d="M36.35 74.44s-3.11 2.77-4.22 4.36c-1.11 1.59-1.11 1.73-1.04 2.21c.07.48 1.22 5.75 6.01 10.37c5.88 5.67 11.13 6.43 11.89 6.43c.76 0 5.81-5.67 5.81-5.67l-18.45-17.7z"
                          fill="#858585"
                        ></path>
                        <path
                          d="M50.1 91.24s5.04 3.31 13.49.47c11.55-3.88 20.02-12.56 30.51-23.52c10.12-10.58 18.61-23.71 18.61-23.71l-5.95-19.93L50.1 91.24z"
                          fill="#437687"
                        ></path>
                        <path
                          d="M67.99 80.33l1.39-4.32l3.48.49s2.65 1.25 4.6 2.16c1.95.91 4.46 1.6 4.46 1.6l-4.95 4.18s-2.7-1.02-4.67-1.88c-2.22-.97-4.31-2.23-4.31-2.23z"
                          fill="#3f545f"
                        ></path>
                        <path
                          d="M84.32 16.14s-9.62 5.58-23.41 18.63c-12.43 11.76-21.64 22.4-23.87 31.45c-1.86 7.58-.87 12.18 3.36 17.15c4.47 5.26 9.71 7.87 9.71 7.87s3.94.06 20.38-12.59C91 62.86 107.43 36.42 107.43 36.42L84.32 16.14z"
                          fill="#8dafbf"
                        ></path>
                        <path
                          d="M104.18 41.84s-8.37-3.57-14.34-11.9c-5.93-8.27-5.46-13.86-5.46-13.86s4.96-3.89 16.11-8.34c7.5-2.99 17.71-4.52 21.07-2.03s-2.3 14.98-2.3 14.98l-10.31 19.96l-4.77 1.19z"
                          fill="#d83f22"
                        ></path>
                        <path
                          d="M68.17 80.4s-7.23-3.69-11.83-8.94c-8.7-9.91-10.5-20.79-10.5-20.79l4.37-5.13S51.3 57.1 60.63 67.09c6.08 6.51 12.43 9.49 12.43 9.49s-1.27 1.07-2.63 2.11c-.87.67-2.26 1.71-2.26 1.71z"
                          fill="#6896a5"
                        ></path>
                        <path
                          d="M112.71 44.48s4.34-5.23 8.45-17.02c5.74-16.44.74-21.42.74-21.42s-1.69 7.82-7.56 18.69c-4.71 8.71-10.41 17-10.41 17s3.14 1.41 4.84 1.9c2.14.62 3.94.85 3.94.85z"
                          fill="#a02422"
                        ></path>
                        <path
                          d="M39.81 69.66c1.3 1.24 3.27-.06 4.56-3.1c1.3-3.04 1.28-4.74.28-5.46c-1.24-.9-3.32 1.07-4.23 2.82c-1 1.94-1.59 4.8-.61 5.74z"
                          fill="#b3e1ee"
                        ></path>
                        <path
                          d="M84.95 20.13s-7.61 5.47-15.73 12.91c-7.45 6.83-12.39 12.17-13.07 13.41c-.72 1.33-.73 3.21-.17 4.17s1.8 1.46 2.93.62c1.13-.85 9.18-9.75 16.45-16.11c6.65-5.82 11.78-9.51 11.78-9.51s2.08-3.68 1.74-4.52c-.34-.85-3.93-.97-3.93-.97z"
                          fill="#b3e1ee"
                        ></path>
                        <path
                          d="M84.95 20.13s5.62-4.31 11.74-7.34c5.69-2.82 11.35-5.17 12.37-3.13c.97 1.94-5.37 4.58-10.95 8.14c-5.58 3.56-10.95 7.81-10.95 7.81s-.82-1.5-1.35-2.89a23.7 23.7 0 0 1-.86-2.59z"
                          fill="#ed6a65"
                        ></path>
                        <path
                          d="M89.59 39.25c-5.57-5.13-13.32-3.75-17.14.81c-3.92 4.7-3.63 11.88 1 16.2c4.21 3.92 12.04 4.81 16.76-.69c4.2-4.88 3.94-12.13-.62-16.32z"
                          fill="#e1e1e1"
                        ></path>
                        <path
                          d="M75.33 41.87c-3.31 3.25-3.13 9.69.81 12.63c3.44 2.57 8.32 2.44 11.38-.69c3.06-3.13 3.06-8.82.19-11.76c-3.3-3.37-8.59-3.9-12.38-.18z"
                          fill="#3f545f"
                        ></path>
                        <path
                          d="M50 76.89s6.19-6.28 6.87-5.6c.68.68.59 4.49-2.37 8.73c-2.97 4.24-9.5 11.79-14.67 16.88c-5.1 5.01-12.29 10.74-12.97 10.64c-.53-.08-2.68-1.15-3.54-2.19c-.84-1.03 1.67-5.9 2.68-7.51c1.02-1.61 24-20.95 24-20.95z"
                          fill="#a02524"
                        ></path>
                        <path
                          d="M21.23 101.85c-.08 1.44 2.12 3.54 2.12 3.54L56.87 71.3s-1.57-1.77-6.19 1.1c-4.66 2.9-8.74 6.38-14.76 12.21c-8.39 8.14-14.61 15.8-14.69 17.24z"
                          fill="#ca2c31"
                        ></path>
                        <path
                          d="M19.06 36.95c-1.11 1.11-1.16 2.89.08 3.91c1.1.91 2.89.32 3.56-.5s.59-2.6-.3-3.48c-.89-.89-2.66-.6-3.34.07z"
                          fill="#ffffff"
                        ></path>
                        <path
                          d="M41.02 35.65c-.84.93-.57 2.31.21 2.82s1.95.46 2.52-.24c.51-.63.57-1.89-.21-2.67c-.68-.67-1.98-.51-2.52.09z"
                          opacity=".5"
                          fill="#ffffff"
                        ></path>
                        <path
                          d="M55.55 11.89s1.22-3.48 1.94-3.52c.73-.04 1.78 3.48 1.78 3.48s3.61.04 3.85.57c.31.68-2.31 2.96-2.31 2.96s.85 3.4.45 3.81c-.45.45-3.56-1.34-3.56-1.34s-3.2 2.23-3.89 1.62c-.6-.53.65-4.13.65-4.13s-3-2.19-2.84-2.8c.23-.86 3.93-.65 3.93-.65z"
                          fill="#ffffff"
                        ></path>
                        <path
                          d="M97.01 95.33c1.21.67 2.73.29 3.29-1c.51-1.15-.43-2.52-1.28-2.89c-.85-.37-2.34.12-2.88 1.09c-.53.96.14 2.4.87 2.8z"
                          fill="#ffffff"
                        ></path>
                        <path
                          d="M114.19 65.84c-.69-1.07-2.18-1.42-3.15-.56c-.94.84-.71 2.16-.18 2.83c.53.67 1.95.92 2.81.37s.94-2 .52-2.64z"
                          fill="#ffffff"
                        ></path>
                      </svg>
                    )}
                  {data?.hurryModifierDate &&
                    payments?.find(
                      (el) => el.id === data.hurryModifierPaidStatus
                    )?.status !== "pending" &&
                    data?.hurryModifierDate > currentDate && (
                      <svg
                        height="20px"
                        width="20px"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g>
                            {" "}
                            <path
                              fill="#AEADB3"
                              d="M182.41,340.038c-2.095,0-4.191-0.799-5.789-2.397c-3.197-3.199-3.197-8.382,0-11.579l57.696-57.696 c4.379-4.379,6.791-10.202,6.791-16.395s-2.411-12.015-6.791-16.393L102.959,104.218c-10.42-10.421-10.42-27.376,0-37.797 l49.317-49.316c10.42-10.42,27.376-10.42,37.795,0l8.525,8.527c3.197,3.197,3.197,8.382,0,11.578 c-3.199,3.197-8.382,3.196-11.579-0.001l-8.525-8.526c-4.036-4.035-10.603-4.035-14.638,0.001l-49.317,49.317 c-4.036,4.035-4.036,10.602,0,14.637l131.358,131.359c7.472,7.472,11.587,17.405,11.587,27.973c0,10.567-4.116,20.5-11.587,27.973 l-57.696,57.697C186.601,339.239,184.506,340.038,182.41,340.038z"
                            ></path>{" "}
                            <path
                              fill="#AEADB3"
                              d="M488.249,335.051c-2.095,0-4.191-0.799-5.789-2.397l-10.909-10.908 c-3.197-3.197-3.197-8.382,0-11.578c3.197-3.199,8.382-3.197,11.578-0.001l10.909,10.908c3.197,3.197,3.197,8.382,0,11.578 C492.44,334.25,490.345,335.051,488.249,335.051z"
                            ></path>{" "}
                          </g>{" "}
                          <path
                            fill="#FB0125"
                            d="M242.398,4.746c-6.328-6.328-16.588-6.328-22.916,0l-54.084,54.083 c-6.328,6.328-6.328,16.588,0,22.916l261.617,261.617c6.328,6.328,16.588,6.328,22.916,0l54.084-54.084 c6.328-6.328,6.328-16.588,0-22.916L242.398,4.746z"
                          ></path>{" "}
                          <path
                            fill="#CC111E"
                            d="M445.678,324.702L184.059,63.085c-6.328-6.328-6.328-16.588,0-22.916l-18.662,18.661 c-6.328,6.328-6.328,16.588,0,22.916l261.617,261.617c6.328,6.328,16.588,6.328,22.916,0l18.662-18.662 C462.265,331.03,452.005,331.03,445.678,324.702z"
                          ></path>{" "}
                          <path
                            fill="#FEA921"
                            d="M137.46,325.411l52.367,52.367c2.549,2.549,6.683,2.549,9.233,0l10.023-10.023 c2.549-2.55,2.549-6.683,0-9.233l-52.367-52.367c-2.549-2.549-6.683-2.549-9.233,0l-10.023,10.023 C134.911,318.728,134.911,322.862,137.46,325.411z"
                          ></path>{" "}
                          <path
                            fill="#E58200"
                            d="M209.082,358.523l-18.662-18.662c2.549,2.549,2.55,6.683,0,9.233l-10.023,10.023 c-2.55,2.55-6.683,2.55-9.233,0l18.662,18.662c2.549,2.549,6.683,2.55,9.233,0l10.023-10.023 C211.632,365.207,211.632,361.074,209.082,358.523z"
                          ></path>{" "}
                          <path
                            fill="#FEA921"
                            d="M143.498,331.448l40.293,40.293L60.226,507.537c-5.027,5.703-13.825,5.98-19.2,0.605L7.098,474.213 c-5.375-5.375-5.099-14.173,0.605-19.2L143.498,331.448z"
                          ></path>{" "}
                          <path
                            fill="#E58200"
                            d="M60.226,507.536l123.565-135.795l-18.662-18.662L41.564,488.875c-5.027,5.703-13.825,5.98-19.2,0.605 l18.662,18.662C46.402,513.516,55.199,513.24,60.226,507.536z"
                          ></path>{" "}
                          <polygon
                            fill="#FE8901"
                            points="131.703,342.18 173.059,383.536 183.791,371.742 143.498,331.448 "
                          ></polygon>{" "}
                          <polygon
                            fill="#E57501"
                            points="173.059,383.536 183.791,371.742 165.129,353.08 154.397,364.874 "
                          ></polygon>{" "}
                          <path
                            fill="#FF3E4C"
                            d="M466.791,299.329L466.791,299.329c-6.374,6.374-16.71,6.374-23.084,0L217.461,73.083 c-6.374-6.374-6.374-16.71,0-23.084l0,0c6.374-6.374,16.71-6.374,23.084,0l226.246,226.246 C473.167,282.62,473.167,292.955,466.791,299.329z"
                          ></path>{" "}
                        </g>
                      </svg>
                    )}
                </div>
                <div className="flex flex-row gap-x-1 items-center justify-end self-end w-fit flex-wrap ">
                  <p className="w-fit  font-bold text-slate-900 text-lg leading-5">
                    {data.price.toLocaleString().replace(/,/g, " ")} ₸{" "}
                  </p>
                  <p className="font-normal text-sm">{data?.serviceTypeExt}</p>
                </div>
              </div>

              {/* <div className="flex flex-row  gap-2 w-full h-fit p-2 items-center">
                <div className="flex flex-row  gap-2 w-full h-fit">
                  <button className="relative p-2 overflow-hidden  rounded-full group/1 duration-300 ease-in-out hover:w-52 w-10 flex transition-[width] flex-row gap-x-1 items-center bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                    <HeartCrack className="stroke-slate-800" />
                    <span className="text-slate-800 font-semibold transition-[width] line-clamp-1 group-hover/1:w-48 opacity-0 group-hover/1:opacity-100 w-0 text-sm absolute left-0 pl-8 overflow-hidden  duration-300 ease-in-out  transform">
                      Убрать из Избранных
                    </span>
                  </button>
  
                  <button className="relative p-2 overflow-hidden  rounded-full group/1 duration-300 ease-in-out hover:w-44 w-10 flex transition-[width] flex-row gap-x-1 items-center bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                    <ClipboardPen className="stroke-blue-500" />
                    <span className="text-blue-500 font-semibold transition-[width] line-clamp-1 group-hover/1:w-40 opacity-0 group-hover/1:opacity-100 w-0 text-sm absolute left-0 pl-8 overflow-hidden  duration-300 ease-in-out  transform">
                      Сделать заметку
                    </span>
                  </button>
                  <button className="relative p-2 overflow-hidden  rounded-full group/1 duration-300 ease-in-out hover:w-44 w-10 flex transition-[width] flex-row gap-x-1 items-center bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                    <MessageCircle className="stroke-yellow-400" />
                    <span className="text-yellow-400 font-semibold transition-[width] line-clamp-1 group-hover/1:w-40 opacity-0 group-hover/1:opacity-100 w-0 text-sm absolute left-0 pl-8 overflow-hidden  duration-300 ease-in-out  transform">
                      Оставить отзыв
                    </span>
                  </button>
                  <button className="relative p-2 overflow-hidden  rounded-full group/1 duration-300 ease-in-out hover:w-44 w-10 flex transition-[width] flex-row gap-x-1 items-center bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                    <Share2 className="stroke-sky-400" />
                    <span className="text-sky-400 font-semibold transition-[width] line-clamp-1 group-hover/1:w-40 opacity-0 group-hover/1:opacity-100 w-0 text-sm absolute left-0 pl-8 overflow-hidden  duration-300 ease-in-out  transform">
                      Поделиться
                    </span>
                  </button>
                </div>
  
                <HoverCard>
                  <HoverCardTrigger className="bg-slate-100 cursor-pointer flex flex-row gap-x-1 items-center text-slate-800 w-fit h-fit rounded-xl px-3 py-1 text-sm font-semibold">
                    <ClipboardList size={19} /> Заметки
                  </HoverCardTrigger>
                  <HoverCardContent className="flex flex-col bg-slate-100 text-slate-800 shadow-xl">
                    <div className="flex flex-row gap-x-1 items-center text-sm">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      </p>
                      <button className="p-1 rounded-full ">
                        <Trash2
                          size={16}
                          className="hover:stroke-red-500 transition-all delay-75 duration-300 "
                        />
                      </button>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div> */}
            </div>
            <Separator
              className="h-[85%] bg-slate-300"
              orientation="vertical"
            />
            <div className="flex flex-col gap-2 w-[40%] h-full py-2 px-2 justify-between">
              <Graphics data={data.analytics || []} />
            </div>
          </div>
        </div>
      </div>
      {data?.moderatorText && data?.phase === "проверка" && (
        <p className="py-2 px-4 text-sm text-red-600 font-medium">
          {data?.moderatorText}
        </p>
      )}

      <div className=" w-full grid grid-cols-5 gap-4 p-4">
        <div className="col-span-4 w-full flex flex-col gap-4">
          <Modifiers
            topMod={
              data.topModifierDate && data?.topModifierDate > currentDate
                ? true
                : false
            }
            hotMod={
              data.hotModifierDate && data?.hotModifierDate > currentDate
                ? true
                : false
            }
            hurryMod={
              data.hurryModifierDate && data?.hurryModifierDate > currentDate
                ? true
                : false
            }
            data={modifiers}
            userId={userId}
            totalBalance={totalBalance}
            bonusBalance={bonusBalance}
            phone={phone}
            email={email}
            annoncementId={data.id}
          />
          <div className=" row-span-3 grid grid-cols-2 w-full gap-4">
            {data.subscriptionId && (
              <div
                style={{
                  borderColor: `#${
                    subs?.find((el) => el.id === data.subscriptionId)?.color
                  }`,
                }}
                className="border-2 aspect-[16/7]  rounded-xl flex flex-col justify-between px-4 py-2"
              >
                <div className="flex flex-row gap-x-2 justify-center items-center w-full">
                  <span
                    style={{
                      color: `#${
                        subs?.find((el) => el.id === data.subscriptionId)?.color
                      }`,
                    }}
                  >
                    {" "}
                    {
                      icons.filter(
                        (item) =>
                          item.value ===
                          subs?.find((el) => el.id === data.subscriptionId)
                            ?.icon
                      )[0].icon
                    }
                  </span>

                  <p className=" font-semibold text-lg">
                    {subs?.find((el) => el.id === data.subscriptionId)?.name}
                  </p>
                </div>
                <p className="text-slate-800 text-sm text-center font-medium line-clamp-5">
                  {
                    subs?.find((el) => el.id === data.subscriptionId)
                      ?.description
                  }
                </p>
                <div className="flex flex-row justify-between items-center flex-wrap gap-2 ">
                  <p
                    className=" font-semibold text-2xl"
                    style={{
                      color: `#${
                        subs?.find((el) => el.id === data.subscriptionId)?.color
                      }`,
                    }}
                  >
                    {subs?.find((el) => el.id === data.subscriptionId)?.price} ₸
                  </p>
                  <p className="text-slate-500 text-xs font-medium">
                    Действует до: {data.companySubscription}
                  </p>
                  {payments?.find((el) => el.id === data.subsStatus)?.status ===
                  "success" ? (
                    <span
                      className="text-white rounded-xl flex flex-row gap-x-2 items-center py-2 px-4  text-sm "
                      style={{
                        backgroundColor: `#${
                          subs?.find((el) => el.id === data.subscriptionId)
                            ?.color
                        }`,
                      }}
                    >
                      Подключено <Check className="w-4" />
                    </span>
                  ) : (
                    <span className="text-white bg-slate-500 w-fit rounded-xl flex flex-row gap-x-2 items-center py-2 px-4  text-sm ">
                      Оплата не подтверждена <Clock className="w-4" />
                    </span>
                  )}
                </div>
              </div>
            )}
            {!data.subscriptionId &&
              subs?.map((el, ind) => (
                <div
                  key={ind}
                  style={{ borderColor: `#${el.color}` }}
                  className={cn(
                    "border-2 aspect-[16/7]  rounded-xl flex flex-col justify-between px-4 py-2"
                  )}
                >
                  <div className="flex flex-row gap-x-2 items-center justify-center">
                    <span style={{ color: `#${el.color}` }}>
                      {" "}
                      {icons.filter((item) => item.value === el.icon)[0].icon}
                    </span>

                    <p className=" font-semibold text-lg">{el.name}</p>
                  </div>
                  <p className="text-slate-800 text-sm text-center font-medium line-clamp-5">
                    {el.description}
                  </p>
                  <div className="flex flex-row justify-between items-center ">
                    <p
                      className=" font-semibold text-2xl"
                      style={{ color: `#${el.color}` }}
                    >
                      {el.price} ₸
                    </p>
                    <button
                      className="text-white rounded-full py-2 px-4  text-sm hover:opacity-80"
                      style={{ backgroundColor: `#${el.color}` }}
                      onClick={() => {
                        setLeftBalance(
                          parseInt(totalBalance || "0") - el.price
                        );
                        setLeftBonus(parseInt(bonusBalance || "0") - el.price);
                        form.setValue("subsId", el.id);
                        form.setValue("subsDays", el.days);
                        setPrice(el.price);
                        setOpen(true);
                      }}
                    >
                      Подключить
                    </button>
                  </div>
                </div>
              ))}
            <Dialog onOpenChange={setOpen} open={open}>
              <DialogContent className=" max-w-fit min-w-36 rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-slate-800 text-xl font-semibold">
                    Выберите способ оплаты
                  </DialogTitle>
                </DialogHeader>
                <div className="w-full gap-4 grid grid-cols-3">
                  <div
                    className={cn(
                      "flex flex-col gap-2 relative p-4 w-full opacity-75 hover:opacity-100 justify-center items-center border-2 cursor-pointer hover:border-slate-800 border-slate-100 rounded-xl",
                      picked === "wallet" && "border-slate-800 opacity-100"
                    )}
                    onClick={() => {
                      if (leftBalance <= 0) {
                        toast({ title: "У вас недостаточно баланса" });
                      } else {
                        setPicked("wallet");
                        form.setValue("type", "wallet");
                        form.setValue("sum", price.toString());
                      }

                      // form.setValue("sum", el.total.toString());
                      // form.setValue("bonus", el?.bonus?.toString());
                    }}
                  >
                    <p className="font-bold flex flex-row items-center gap-x-2 text-slate-700 text-xl text-center leading-tight">
                      <Wallet className="w-5" /> Кошелек
                    </p>

                    <div className="flex flex-col gap-1 py-2 px-3 text-sm font-medium rounded-xl bg-slate-100">
                      <p className=" text-slate-600">Текущая сумма</p>
                      <p className="font-semibold text-base text-yellow-400 text-center">
                        {totalBalance || 0} ед.
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 text-sm font-medium text-center text-slate-500">
                      <p>Будет списано</p>
                      <p>-{price} ед.</p>
                    </div>
                    <div className="flex flex-col gap-1 text-xs font-medium text-center text-slate-300">
                      <p>Остаток {leftBalance} ед.</p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "flex flex-col gap-2 relative p-4 w-full opacity-75 hover:opacity-100 justify-center items-center border-2 cursor-pointer hover:border-slate-800 border-slate-100 rounded-xl",
                      picked === "bonus" && "border-slate-800 opacity-100"
                    )}
                    onClick={() => {
                      if (leftBonus <= 0) {
                        toast({ title: "У вас недостаточно бонусов" });
                      } else {
                        setPicked("bonus");
                        form.setValue("type", "bonus");
                        form.setValue("sum", price.toString());
                      }

                      // form.setValue("sum", el.total.toString());
                      // form.setValue("bonus", el?.bonus?.toString());
                    }}
                  >
                    <p className="font-bold flex flex-row items-center gap-x-2 text-slate-700 text-xl text-center leading-tight">
                      <Coins className="w-5" /> Бонусы
                    </p>

                    <div className="flex flex-col gap-1 py-2 px-3 text-sm font-medium rounded-xl bg-slate-100">
                      <p className=" text-slate-600">Текущие бонусы</p>
                      <p className="font-semibold text-base text-green-400 text-center">
                        {bonusBalance || 0} б.
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 text-sm font-medium text-center text-slate-500">
                      <p>Будет списано</p>
                      <p>-{price} б.</p>
                    </div>
                    <div className="flex flex-col gap-1 text-xs font-medium text-center text-slate-300">
                      <p>Остаток {leftBonus} б.</p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "flex flex-col gap-2 relative p-4 w-full justify-center opacity-75 hover:opacity-100 items-center border-2 cursor-pointer hover:border-slate-800 border-slate-100 rounded-xl",
                      picked === "direct" && "border-slate-800 opacity-100"
                    )}
                    onClick={() => {
                      setPicked("direct");
                      form.setValue("type", "direct");
                      form.setValue("sum", price.toString());
                      // form.setValue("sum", el.total.toString());
                      // form.setValue("bonus", el?.bonus?.toString());
                    }}
                  >
                    <p className="font-bold flex flex-row items-center gap-x-2 text-slate-700 text-xl text-center leading-tight">
                      <CreditCard className="w-5" /> Картой
                    </p>

                    <div className="flex flex-col gap-1 text-sm font-medium text-center text-slate-700">
                      <p>Оплатите напрямую через карты MasterCard и VISA</p>
                      <div className="flex flex-row gap-x-2">
                        <svg
                          height={60}
                          width={80}
                          viewBox="0 -140 780 780"
                          enableBackground="new 0 0 780 500"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#000000"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="m449.01 250c0 99.143-80.371 179.5-179.51 179.5s-179.5-80.361-179.5-179.5c0-99.133 80.362-179.5 179.5-179.5 99.137 0 179.51 80.371 179.51 179.5"
                              fill="#D9222A"
                            ></path>
                            <path
                              d="m510.49 70.496c-46.379 0-88.643 17.596-120.5 46.467-6.49 5.889-12.548 12.237-18.125 18.996h36.267c4.965 6.037 9.536 12.387 13.685 19.012h-63.635c-3.827 6.122-7.281 12.469-10.342 19.008h84.313c2.894 6.185 5.431 12.53 7.601 19.004h-99.513c-2.09 6.234-3.832 12.58-5.217 19.008h109.94c2.689 12.49 4.045 25.231 4.042 38.008 0 19.935-3.254 39.112-9.254 57.021h-99.513c2.164 6.477 4.7 12.824 7.596 19.008h84.316c-3.063 6.541-6.519 12.889-10.347 19.013h-63.625c4.147 6.62 8.719 12.966 13.685 18.996h36.259c-5.57 6.772-11.63 13.127-18.13 19.013 31.857 28.866 74.117 46.454 120.5 46.454 99.139 0 179.51-80.361 179.51-179.5 0-99.129-80.371-179.5-179.51-179.5"
                              fill="#EE9F2D"
                            ></path>
                            <path d="m666.07 350.06c0-3.199 2.592-5.801 5.796-5.801s5.796 2.602 5.796 5.801-2.592 5.801-5.796 5.801-5.796-2.602-5.796-5.801zm5.796 4.408c2.434-1e-3 4.407-1.974 4.408-4.408 0-2.432-1.971-4.402-4.402-4.404h-6e-3c-2.429-3e-3 -4.4 1.963-4.404 4.391v0.014c-2e-3 2.433 1.968 4.406 4.4 4.408 1e-3 -1e-3 3e-3 -1e-3 4e-3 -1e-3zm-0.783-1.86h-1.187v-5.096h2.149c0.45 0 0.908 0 1.305 0.254 0.413 0.279 0.646 0.771 0.646 1.279 0 0.571-0.338 1.104-0.884 1.312l0.938 2.25h-1.315l-0.779-2.017h-0.871l-2e-3 2.018zm0-2.89h0.658c0.246 0 0.505 0.021 0.726-0.1 0.195-0.125 0.296-0.359 0.296-0.584-5e-3 -0.209-0.112-0.402-0.288-0.518-0.207-0.129-0.536-0.101-0.758-0.101h-0.634v1.303zm-443.5-80.063c-2.046-0.238-2.945-0.301-4.35-0.301-11.046 0-16.638 3.787-16.638 11.268 0 4.611 2.729 7.545 6.987 7.545 7.939 0 13.659-7.559 14.001-18.512zm14.171 32.996h-16.146l0.371-7.676c-4.926 6.065-11.496 8.949-20.426 8.949-10.563 0-17.804-8.25-17.804-20.229 0-18.024 12.596-28.541 34.217-28.541 2.208 0 5.042 0.199 7.941 0.57 0.604-2.441 0.763-3.488 0.763-4.801 0-4.908-3.396-6.737-12.5-6.737-9.533-0.108-17.396 2.271-20.625 3.333 0.204-1.229 2.7-16.659 2.7-16.659 9.712-2.846 16.116-3.917 23.325-3.917 16.732 0 25.596 7.513 25.579 21.712 0.033 3.805-0.597 8.5-1.579 14.671-1.691 10.734-5.32 33.721-5.816 39.325zm-62.158 0h-19.487l11.162-69.997-24.925 69.997h-13.279l-1.642-69.597-11.733 69.597h-18.242l15.237-91.056h28.021l1.7 50.968 17.092-50.968h31.167l-15.071 91.056m354.97-32.996c-2.037-0.238-2.941-0.301-4.342-0.301-11.041 0-16.634 3.787-16.634 11.268 0 4.611 2.726 7.545 6.983 7.545 7.94 0 13.664-7.559 13.993-18.512zm14.184 32.996h-16.146l0.366-7.676c-4.926 6.065-11.5 8.949-20.422 8.949-10.565 0-17.8-8.25-17.8-20.229 0-18.024 12.588-28.541 34.213-28.541 2.208 0 5.037 0.199 7.934 0.57 0.604-2.441 0.763-3.488 0.763-4.801 0-4.908-3.392-6.737-12.496-6.737-9.533-0.108-17.387 2.271-20.629 3.333 0.204-1.229 2.709-16.659 2.709-16.659 9.712-2.846 16.112-3.917 23.313-3.917 16.74 0 25.604 7.513 25.587 21.712 0.032 3.805-0.597 8.5-1.579 14.671-1.684 10.734-5.321 33.721-5.813 39.325zm-220.39-1.125c-5.333 1.679-9.491 2.398-14 2.398-9.962 0-15.399-5.725-15.399-16.267-0.142-3.271 1.433-11.88 2.671-19.737 1.125-6.917 8.449-50.529 8.449-50.529h19.371l-2.263 11.208h11.699l-2.642 17.796h-11.742c-2.25 14.083-5.454 31.625-5.491 33.95 0 3.816 2.037 5.483 6.671 5.483 2.221 0 3.94-0.227 5.254-0.7l-2.578 16.398m59.392-0.6c-6.654 2.034-13.075 3.017-19.879 3-21.684-0.021-32.987-11.346-32.987-33.032 0-25.313 14.38-43.947 33.899-43.947 15.971 0 26.171 10.433 26.171 26.796 0 5.429-0.7 10.729-2.388 18.212h-38.574c-1.305 10.741 5.57 15.217 16.837 15.217 6.935 0 13.188-1.429 20.142-4.663l-3.221 18.417zm-10.888-43.9c0.107-1.543 2.055-13.217-9.013-13.217-6.171 0-10.583 4.704-12.38 13.217h21.393zm-123.42-5.017c0 9.367 4.542 15.826 14.842 20.676 7.892 3.709 9.112 4.81 9.112 8.17 0 4.617-3.479 6.701-11.191 6.701-5.813 0-11.221-0.908-17.458-2.922 0 0-2.563 16.321-2.68 17.102 4.43 0.967 8.38 1.861 20.279 2.19 20.563 0 30.059-7.829 30.059-24.75 0-10.175-3.976-16.146-13.737-20.634-8.171-3.75-9.108-4.587-9.108-8.045 0-4.004 3.237-6.046 9.537-6.046 3.825 0 9.05 0.408 14 1.112l2.775-17.175c-5.046-0.8-12.696-1.442-17.15-1.442-21.801 1e-3 -29.347 11.388-29.28 25.063m229.09-23.116c5.412 0 10.458 1.421 17.412 4.921l3.188-19.763c-2.854-1.121-12.904-7.7-21.417-7.7-13.041 0-24.065 6.471-31.82 17.15-11.309-3.746-15.958 3.825-21.657 11.367l-5.063 1.179c0.383-2.483 0.729-4.95 0.612-7.446h-17.896c-2.445 22.917-6.778 46.128-10.171 69.075l-0.884 4.976h19.496c3.254-21.143 5.037-34.68 6.121-43.842l7.341-4.084c1.097-4.078 4.529-5.458 11.417-5.291-0.926 5.008-1.389 10.091-1.383 15.184 0 24.225 13.07 39.308 34.05 39.308 5.404 0 10.041-0.712 17.221-2.658l3.43-20.759c-6.458 3.181-11.759 4.677-16.559 4.677-11.329 0-18.184-8.363-18.184-22.185 0-20.051 10.196-34.109 24.746-34.109"></path>
                            <path
                              d="m185.21 297.24h-19.491l11.171-69.988-24.926 69.988h-13.283l-1.642-69.588-11.733 69.588h-18.241l15.237-91.042h28.021l0.788 56.362 18.904-56.362h30.267l-15.072 91.042"
                              fill="#ffffff"
                            ></path>
                            <path d="m647.52 211.6l-4.321 26.309c-5.329-7.013-11.054-12.088-18.612-12.088-9.833 0-18.783 7.455-24.642 18.425-8.158-1.692-16.597-4.563-16.597-4.563l-4e-3 0.067c0.658-6.134 0.921-9.875 0.862-11.146h-17.9c-2.438 22.917-6.771 46.128-10.157 69.075l-0.893 4.976h19.492c2.633-17.096 4.648-31.291 6.133-42.551 6.658-6.016 9.992-11.266 16.721-10.916-2.979 7.205-4.725 15.503-4.725 24.017 0 18.513 9.366 30.725 23.533 30.725 7.142 0 12.621-2.462 17.967-8.171l-0.913 6.884h18.435l14.842-91.042-19.221-1e-3zm-24.371 73.941c-6.634 0-9.983-4.908-9.983-14.596 0-14.555 6.271-24.875 15.112-24.875 6.695 0 10.32 5.104 10.32 14.509 1e-3 14.679-6.37 24.962-15.449 24.962z"></path>
                            <path
                              d="m233.19 264.26c-2.042-0.236-2.946-0.299-4.346-0.299-11.046 0-16.634 3.787-16.634 11.266 0 4.604 2.729 7.547 6.979 7.547 7.947-1e-3 13.668-7.559 14.001-18.514zm14.178 32.984h-16.146l0.367-7.663c-4.921 6.054-11.5 8.95-20.421 8.95-10.567 0-17.805-8.25-17.805-20.229 0-18.032 12.592-28.542 34.217-28.542 2.208 0 5.042 0.2 7.938 0.571 0.604-2.441 0.763-3.487 0.763-4.808 0-4.909-3.392-6.729-12.496-6.729-9.537-0.108-17.396 2.271-20.629 3.321 0.204-1.225 2.7-16.637 2.7-16.637 9.708-2.858 16.12-3.929 23.32-3.929 16.737 0 25.604 7.517 25.588 21.704 0.029 3.821-0.604 8.513-1.584 14.675-1.687 10.724-5.319 33.724-5.812 39.316zm261.38-88.592l-3.191 19.767c-6.95-3.496-12-4.92-17.407-4.92-14.551 0-24.75 14.058-24.75 34.106 0 13.821 6.857 22.181 18.184 22.181 4.8 0 10.096-1.492 16.554-4.675l-3.421 20.75c-7.184 1.957-11.816 2.67-17.225 2.67-20.977 0-34.051-15.084-34.051-39.309 0-32.55 18.059-55.3 43.888-55.3 8.507 1e-3 18.561 3.609 21.419 4.73m31.443 55.608c-2.041-0.236-2.941-0.299-4.347-0.299-11.041 0-16.633 3.787-16.633 11.266 0 4.604 2.729 7.547 6.983 7.547 7.938-1e-3 13.663-7.559 13.997-18.514zm14.178 32.984h-16.15l0.371-7.663c-4.925 6.054-11.5 8.95-20.421 8.95-10.563 0-17.804-8.25-17.804-20.229 0-18.032 12.596-28.542 34.212-28.542 2.213 0 5.042 0.2 7.941 0.571 0.601-2.441 0.763-3.487 0.763-4.808 0-4.909-3.393-6.729-12.495-6.729-9.533-0.108-17.396 2.271-20.63 3.321 0.204-1.225 2.704-16.637 2.704-16.637 9.709-2.858 16.116-3.929 23.316-3.929 16.741 0 25.604 7.517 25.583 21.704 0.033 3.821-0.596 8.513-1.579 14.675-1.682 10.724-5.323 33.724-5.811 39.316zm-220.39-1.121c-5.338 1.679-9.496 2.408-14 2.408-9.962 0-15.399-5.726-15.399-16.268-0.138-3.279 1.438-11.88 2.675-19.736 1.12-6.926 8.445-50.534 8.445-50.534h19.368l-2.26 11.212h9.941l-2.646 17.788h-9.975c-2.25 14.092-5.463 31.62-5.496 33.95 0 3.83 2.041 5.482 6.671 5.482 2.221 0 3.938-0.216 5.254-0.691l-2.578 16.389m59.391-0.592c-6.65 2.033-13.079 3.012-19.879 3-21.685-0.021-32.987-11.346-32.987-33.033 0-25.321 14.379-43.95 33.899-43.95 15.971 0 26.171 10.429 26.171 26.8 0 5.434-0.7 10.733-2.384 18.212h-38.574c-1.306 10.741 5.569 15.222 16.837 15.222 6.93 0 13.188-1.435 20.138-4.677l-3.221 18.426zm-10.891-43.912c0.116-1.538 2.06-13.217-9.013-13.217-6.167 0-10.579 4.717-12.375 13.217h21.388zm-123.42-5.005c0 9.367 4.542 15.818 14.842 20.675 7.892 3.709 9.112 4.812 9.112 8.172 0 4.616-3.483 6.699-11.188 6.699-5.816 0-11.225-0.908-17.467-2.921 0 0-2.554 16.321-2.671 17.101 4.421 0.967 8.375 1.85 20.275 2.191 20.566 0 30.059-7.829 30.059-24.746 0-10.18-3.971-16.15-13.737-20.637-8.167-3.759-9.113-4.584-9.113-8.046 0-4 3.246-6.059 9.542-6.059 3.821 0 9.046 0.421 14.004 1.125l2.771-17.179c-5.042-0.8-12.692-1.441-17.146-1.441-21.804 0-29.346 11.379-29.283 25.066m398.45 50.63h-18.438l0.917-6.893c-5.347 5.717-10.825 8.18-17.968 8.18-14.166 0-23.528-12.213-23.528-30.726 0-24.63 14.521-45.392 31.708-45.392 7.559 0 13.279 3.087 18.604 10.096l4.325-26.308h19.221l-14.841 91.043zm-28.746-17.109c9.075 0 15.45-10.283 15.45-24.953 0-9.405-3.629-14.509-10.325-14.509-8.837 0-15.115 10.315-15.115 24.875-1e-3 9.686 3.357 14.587 9.99 14.587zm-56.842-56.929c-2.441 22.917-6.773 46.13-10.162 69.063l-0.892 4.976h19.491c6.972-45.275 8.658-54.117 19.588-53.009 1.742-9.267 4.982-17.383 7.399-21.479-8.163-1.7-12.721 2.913-18.688 11.675 0.471-3.788 1.333-7.467 1.162-11.225l-17.898-1e-3m-160.42 0c-2.446 22.917-6.779 46.13-10.167 69.063l-0.888 4.976h19.5c6.963-45.275 8.646-54.117 19.57-53.009 1.75-9.267 4.991-17.383 7.399-21.479-8.154-1.7-12.717 2.913-18.679 11.675 0.471-3.788 1.324-7.467 1.162-11.225l-17.897-1e-3m254.57 68.241c-4e-3 -3.199 2.586-5.795 5.784-5.799h0.012c3.197-4e-3 5.793 2.586 5.796 5.783v0.016c-1e-3 3.201-2.595 5.795-5.796 5.797-3.201-2e-3 -5.795-2.596-5.796-5.797zm5.796 4.405c2.431 2e-3 4.402-1.969 4.403-4.399v-4e-3c3e-3 -2.433-1.968-4.406-4.399-4.408h-4e-3c-2.435 1e-3 -4.407 1.974-4.408 4.408 2e-3 2.432 1.975 4.403 4.408 4.403zm-0.784-1.871h-1.188v-5.082h2.153c0.446 0 0.909 9e-3 1.296 0.254 0.417 0.283 0.654 0.767 0.654 1.274 0 0.575-0.337 1.112-0.888 1.317l0.941 2.236h-1.32l-0.779-2.009h-0.87l1e-3 2.01zm0-2.879h0.653c0.246 0 0.513 0.019 0.729-0.1 0.196-0.125 0.296-0.361 0.296-0.588-9e-3 -0.21-0.114-0.404-0.287-0.523-0.204-0.117-0.542-0.084-0.763-0.084h-0.629l1e-3 1.295z"
                              fill="#ffffff"
                            ></path>
                          </g>
                        </svg>
                        <svg
                          height={60}
                          width={80}
                          viewBox="0 -140 780 780"
                          enableBackground="new 0 0 780 500"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#000000"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="m293.2 348.73l33.359-195.76h53.358l-33.384 195.76h-53.333zm246.11-191.54c-10.569-3.966-27.135-8.222-47.821-8.222-52.726 0-89.863 26.551-90.181 64.604-0.297 28.129 26.515 43.822 46.754 53.185 20.771 9.598 27.752 15.716 27.652 24.283-0.133 13.123-16.586 19.115-31.924 19.115-21.355 0-32.701-2.967-50.225-10.273l-6.878-3.111-7.487 43.822c12.463 5.467 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.885 0.199-22.27-14.016-39.215-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.56-16.838 17.446-0.271 30.088 3.534 39.936 7.5l4.781 2.259 7.231-42.427m137.31-4.223h-41.23c-12.772 0-22.332 3.486-27.94 16.234l-79.245 179.4h56.031s9.159-24.121 11.231-29.418c6.123 0 60.555 0.084 68.336 0.084 1.596 6.854 6.492 29.334 6.492 29.334h49.512l-43.187-195.64zm-65.417 126.41c4.414-11.279 21.26-54.724 21.26-54.724-0.314 0.521 4.381-11.334 7.074-18.684l3.606 16.878s10.217 46.729 12.353 56.527h-44.293v3e-3zm-363.3-126.41l-52.239 133.5-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.2 56.455-0.063 84.004-195.39-56.524-1e-3"
                              fill="#0E4595"
                            ></path>
                            <path
                              d="m146.92 152.96h-86.041l-0.682 4.073c66.939 16.204 111.23 55.363 129.62 102.42l-18.709-89.96c-3.229-12.396-12.597-16.096-24.186-16.528"
                              fill="#F2AE14"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <p className=" text-xs text-slate-300 font-medium">
                        Вы будете перенаправлены на защищенную страницу
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-600 px-2">
                  Недостаточно баланса на кошелке?
                  <Link
                    href="/cabinet/profile/billing"
                    target="_blank"
                    className="ml-1 font-semibold text-blue-500 underline-offset-4 hover:underline"
                  >
                    Пополните
                  </Link>{" "}
                  и получите кэшбек в виде{" "}
                  <span className=" text-green-500">бонусов</span>
                </p>
                <DialogFooter className="w-full flex flex-row gap-4">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Закрыть
                    </Button>
                  </DialogClose>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Button type="submit">
                      {loading && <Loader className="w-4 animate-spin mr-2" />}{" "}
                      Подтвердить
                    </Button>
                  </form>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* <div className="border-2 border-yellow-400 rounded-xl flex flex-col justify-between px-4 py-2">
              <div className="flex flex-row gap-x-2 items-center">
                <Crown className="text-yellow-400 w-7" />
                <p className=" font-semibold text-lg">
                  Пакет продвижения на 10 дней
                </p>
              </div>
              <p className="text-slate-800 text-sm text-center font-medium">
                Каждый день в ТОП, каждый день в Горячие
              </p>
              <div className="flex flex-row justify-between items-center ">
                <p className="text-yellow-400 font-semibold text-2xl">2720 ₸</p>
                <button className="text-white rounded-full py-2 px-4 bg-yellow-400 text-sm hover:opacity-80">
                  Подключить
                </button>
              </div>
            </div> */}
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <NewPriceForm id={data.id} initialPrice={data.price} />
          <button
            onClick={() => router.push(`/cabinet/annoncements/${data.id}`)}
            className=" rounded-xl px-3 py-4 text-sm justify-center items-center uppercase flex flex-row gap-x-2 transition delay-75 duration-200  font-medium text-slate-500 border-2 hover:border-slate-800 hover:text-neutral-50 hover:bg-slate-800 border-slate-200"
          >
            Редактировать
          </button>
          <button
            onClick={() => router.push(`/cabinet/annoncements/${data.id}`)}
            className=" rounded-xl px-3 py-4 text-sm justify-center items-center uppercase flex flex-row gap-x-2 transition delay-75 duration-200  font-medium text-slate-500 border-2 hover:border-slate-800 hover:text-neutral-50 hover:bg-slate-800 border-slate-200"
          >
            Изменить фотографии
          </button>
          {data?.phase === "блокировано" && (
            <PhaseChangeButton
              title="Активировать"
              id={data.id}
              phase="активно"
            />
          )}{" "}
          {data?.phase === "активно" && (
            <PhaseChangeButton
              title="В архив"
              id={data.id}
              phase="блокировано"
            />
          )}
          {data?.phase === "проверка" && (
            <button
              type="submit"
              disabled
              className="opacity-70 pointer-events-none rounded-xl px-3 py-4 text-sm justify-center items-center uppercase flex flex-row gap-x-2 transition delay-75 duration-200  font-medium text-slate-500 border-2 hover:border-slate-800 hover:text-neutral-50 hover:bg-slate-800 border-slate-200"
            >
              В архив
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAnnoncementCard;
