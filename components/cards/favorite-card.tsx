"use client";

import Image from "next/image";
import React from "react";
import {
  FacebookShare,
  LinkedinShare,
  TwitterShare,
  WhatsappShare,
} from "react-share-kit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import {
  ArrowBigUp,
  ArrowUpFromDot,
  ClipboardList,
  ClipboardPen,
  Copy,
  ExternalLink,
  Eye,
  Flame,
  HeartCrack,
  Loader,
  MapPin,
  MessageCircle,
  Share2,
  Trash2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Annoncement, Testimonial } from "@prisma/client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface FavoriteCardProps {
  data: Annoncement & { testimonials: Testimonial[] };
  userNotes?: {
    annoncementId: string;
    text: string;
  }[];
}

const FormSchema = z.object({
  id: z.string().min(2, {
    message: "id обьязателен",
  }),
  note: z.string().optional(),
});

function FavoriteCard({ data, userNotes }: FavoriteCardProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const currentDate = new Date();

  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

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

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: data.id,
    },
  });

  const onFavourite = async (formData: z.infer<typeof FormSchema>) => {
    try {
      await axios.patch(`/api/annoncements/${data.id}/favourite`, formData);

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const onNoteAdd = async (formData: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      await axios.patch(`/api/annoncements/${data.id}/noteadd`, formData);
      toast({
        title: "Запись сохранен",
      });
      router.refresh();
    } catch (error) {
      toast({ title: "Произошла ошибка", variant: "destructive" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onNoteRemove = async (formData: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      await axios.patch(`/api/annoncements/${data.id}/noteRemove`, formData);
      toast({
        title: "Запись удалена",
      });
      router.refresh();
    } catch (error) {
      toast({ title: "Произошла ошибка", variant: "destructive" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const pathname = usePathname();

  const title = `Обьявление ${data.id}`;

  const overallRanking = calculateOverallRanking(data.testimonials);

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

  return (
    <div className="w-full rounded-2xl">
      <div className="w-full   bg-white rounded-xl grid grid-cols-12">
        <div className=" flex items-center justify-center xs:col-span-12 md:col-span-6  lg:col-span-3">
          <Carousel
            setApi={setApi}
            className="w-full group md:h-[360px] xs:h-[280px]  lg:h-[280px] relative rounded-xl items-center flex-col flex justify-center"
          >
            <CarouselContent>
              {data.images.map((img, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={img.url}
                    alt={`img+${index}`}
                    width={900}
                    height={1200}
                    className=" object-cover md:h-[360px] md:rounded-l-xl xs:h-[280px] xs:rounded-t-xl lg:rounded-tr-none md:rounded-tr-none lg:h-[280px] lg:rounded-l-xl"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <button
              className="absolute left-2 rounded-full group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent"
              onClick={scrollPrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              className="absolute right-2 rounded-full group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent"
              onClick={scrollNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
            <div className="absolute top-2 right-2">
              <button className="relative p-1 overflow-hidden  rounded-full group/1 duration-300 ease-in-out hover:w-36 w-8 flex transition-[width] flex-row gap-x-1 items-center bg-slate-200  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 fill-red-600 stroke-red-600 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                <span className="text-red-600 font-semibold transition-[width] line-clamp-1 group-hover/1:w-32 opacity-0 group-hover/1:opacity-100 w-0 text-sm absolute left-0 pl-8 overflow-hidden  duration-300 ease-in-out hover:pl-8 transform">
                  В Избранном
                </span>
              </button>
            </div>
            <span className="py-0.5 px-2  flex flex-row items-center gap-x-1 rounded-full bg-slate-200  bg-opacity-50 absolute top-2 left-2 transition delay-100 duration-300 hover:bg-opacity-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-yellow-500 fill-yellow-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              <span className="font-bold text-slate-900">
                {overallRanking.toFixed(1)}
              </span>
            </span>

            <span className="absolute bottom-2 right-2 py-1 px-2 rounded-lg group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent">
              {current}/{count}
            </span>
          </Carousel>
        </div>
        <div className="w-full xs:col-span-12 md:col-span-6  lg:col-span-9 gap-2 flex flex-col justify-between">
          <div className="flex flex-col gap-2 py-2 px-3 w-full ">
            <div className=" flex flex-col gap-1 w-full">
              <div className="w-full flex flex-row gap-2 flex-wrap justify-between items-center">
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/annoncements/${data.id}`}
                    className="px-2  text-blue-600 group font-bold text-lg text-left flex-wrap break-words flex flex-row gap-x-1 items-center"
                  >
                    {data?.roomNumber}-комнатная {data.categoryType},{" "}
                    {data.areaSq} м², {data.floor}/{data.floorFrom} этаж{" "}
                    <ExternalLink
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition-all delay-75 duration-300"
                    />
                  </Link>
                  <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
                    <p className=" text-slate-500 flex flex-row items-center gap-x-1 uppercase text-xs font-semibold rounded-full  text-center w-fit">
                      <MapPin className="stroke-red-500" size={16} />{" "}
                      {data?.cityOrDistrict}
                    </p>
                    {data.isChecked && (
                      <div className="px-2 py-1 text-neutral-100  bg-blue-500 text-xs font-semibold rounded-full  text-center w-fit flex flex-row gap-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          className="w-4 h-4 stroke-neutral-100"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <p>Проверено</p>
                      </div>
                    )}
                    {data?.modificators?.topModifier ? (
                      <p className="text-sm font-semibold bg-amber-500 text-neutral-100 px-2 py-1 rounded-full flex flex-row gap-x-1 items-center">
                        <ArrowBigUp size={16} />{" "}
                      </p>
                    ) : (
                      ""
                    )}
                    {data?.modificators?.hotModifier ? (
                      <p className="text-sm font-semibold bg-rose-500 text-neutral-100 px-2 py-1 rounded-full flex flex-row gap-x-1 items-center">
                        <Flame size={16} />
                      </p>
                    ) : (
                      ""
                    )}
                    {data?.modificators?.hurryModifier ? (
                      <p className="text-sm font-semibold bg-cyan-500 text-neutral-100 px-2 py-1 rounded-full flex flex-row gap-x-1 items-center">
                        <Zap size={16} />
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="bg-slate-800 text-xl text-neutral-50 font-bold items-center justify-center flex flex-col px-2 py-1 rounded-xl">
                  <p>{data.price} ₸</p>
                  <span className="text-xs">{data?.serviceTypeExt}</span>
                </div>
              </div>
            </div>
            <p className="line-clamp-2 text-sm text-slate-700 mt-2">
              {data.description}
            </p>
            <div className="text-sm flex flex-row items-center gap-1">
              {/* <p className="text-sm font-semibold text-slate-800 ">
                Контакты:{" "}
                <span className="text-slate-600 font-normal">{data.phone}</span>
              </p> */}
              <p className=" font-semibold text-slate-500 ">
                <span className="text-slate-400 font-normal pl-1">
                  {data.createdAt.toLocaleDateString()}
                </span>
              </p>
              <div className="flex flex-row gap-1 items-center text-slate-400 px-4">
                <Eye size={16} /> {data?.stats?.allCount}
              </div>
            </div>
          </div>
          <div className="flex flex-row  gap-2 w-full h-fit p-2 items-center">
            <div className="flex flex-row  gap-2 w-full h-fit">
              <form onSubmit={form.handleSubmit(onFavourite)}>
                <button className="relative p-2 overflow-hidden  rounded-full group/1 duration-300 ease-in-out hover:w-52 w-10 flex transition-[width] flex-row gap-x-1 items-center bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                  <HeartCrack className="stroke-slate-800" />
                  <span className="text-slate-800 font-semibold transition-[width] line-clamp-1 group-hover/1:w-48 opacity-0 group-hover/1:opacity-100 w-0 text-sm absolute left-0 pl-8 overflow-hidden  duration-300 ease-in-out  transform">
                    Убрать из Избранных
                  </span>
                </button>
              </form>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="relative p-2 overflow-hidden  rounded-full group/1 duration-300 ease-in-out hover:w-44 w-10 flex transition-[width] flex-row gap-x-1 items-center bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                    <ClipboardPen className="stroke-blue-500" />
                    <span className="text-blue-500 font-semibold transition-[width] line-clamp-1 group-hover/1:w-40 opacity-0 group-hover/1:opacity-100 w-0 text-sm absolute left-0 pl-8 overflow-hidden  duration-300 ease-in-out  transform">
                      Сделать заметку
                    </span>
                  </button>
                </DialogTrigger>
                <DialogContent className="rounded-xl">
                  <DialogHeader>
                    <DialogTitle>Ваша заметка</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onNoteAdd)}
                      className="gap-4 flex-col flex"
                    >
                      <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Напишите свою заметку"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <Loader className="w-4 animate-spin" />
                        ) : (
                          "OK"
                        )}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              <Link
                href={`/annoncements/${data.id}`}
                className="relative p-2 overflow-hidden  rounded-full group/1 duration-300 ease-in-out hover:w-44 w-10 flex transition-[width] flex-row gap-x-1 items-center bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80"
              >
                <MessageCircle className="stroke-yellow-400" />
                <span className="text-yellow-400 font-semibold transition-[width] line-clamp-1 group-hover/1:w-40 opacity-0 group-hover/1:opacity-100 w-0 text-sm absolute left-0 pl-8 overflow-hidden  duration-300 ease-in-out  transform">
                  Оставить отзыв
                </span>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative p-2 overflow-hidden  rounded-full group/1 duration-300 ease-in-out hover:w-44 w-10 flex transition-[width] flex-row gap-x-1 items-center bg-slate-100  bg-opacity-50  transition delay-100 duration-300 hover:bg-opacity-80">
                    <Share2 className="stroke-sky-400" />
                    <span className="text-sky-400 font-semibold transition-[width] line-clamp-1 group-hover/1:w-40 opacity-0 group-hover/1:opacity-100 w-0 text-sm absolute left-0 pl-8 overflow-hidden  duration-300 ease-in-out  transform">
                      Поделиться
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-row gap-x-1 items-center">
                  <FacebookShare
                    url={`https://etazhi.kz${pathname}`}
                    quote={title}
                    hashtag={"#etazhikz #обьявление"}
                    size={24}
                    borderRadius={12}
                  />
                  <WhatsappShare
                    url={`https://etazhi.kz${pathname}`}
                    title={title}
                    separator=":: "
                    size={24}
                    borderRadius={12}
                  />
                  <LinkedinShare url={title} size={24} borderRadius={12} />
                  <TwitterShare
                    url={`https://etazhi.kz${pathname}`}
                    title={title}
                    size={24}
                    borderRadius={12}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {userNotes?.find((el) => el.annoncementId === data.id)?.text && (
              <HoverCard>
                <HoverCardTrigger className="bg-slate-100 cursor-pointer flex flex-row gap-x-1 items-center text-slate-800 w-fit h-fit rounded-xl px-3 py-1 text-sm font-semibold">
                  <ClipboardList className="w-4" /> Заметки
                </HoverCardTrigger>
                <HoverCardContent className="flex flex-col bg-slate-100 text-slate-800 shadow-xl">
                  <div className="flex flex-row gap-x-1 items-center text-sm">
                    <p>
                      {
                        userNotes?.find((el) => el.annoncementId === data.id)
                          ?.text
                      }
                    </p>
                    <form onSubmit={form.handleSubmit(onNoteRemove)}>
                      <button className="p-1 rounded-full ">
                        <Trash2
                          size={16}
                          className="hover:stroke-red-500 transition-all delay-75 duration-300 "
                        />
                      </button>
                    </form>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoriteCard;
