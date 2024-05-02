import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import {
  Clusterer,
  Map,
  Placemark,
  SearchControl,
  YMaps,
  ZoomControl,
  useYMaps,
} from "@pbe/react-yandex-maps";
import { Analytics, Annoncement, Building, Testimonial } from "@prisma/client";
import { Briefcase, Building2, MapPin, UserRoundCheck, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";

interface BigMapProps {
  width?: number;
  height?: number;
  coordinate1?: number | null | undefined;
  coordinate2?: number | null | undefined;
  zoom?: number | null | undefined;
  items?: (Annoncement & {
    testimonials: Testimonial[];
    analytics: Analytics[];
    buildingName: Building | null;
  } & {
    isFavorite?: boolean;
  })[];
}

function BigMap({
  width,
  height,
  coordinate1,
  coordinate2,
  zoom,
  items,
}: BigMapProps) {
  const mapRef = React.useRef(null);
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  const clusterPoints = items?.map((item) => [
    item && item?.coordinateX && parseFloat(item?.coordinateX),
    item && item?.coordinateY && parseFloat(item?.coordinateY),
  ]);

  const router = useRouter();

  const [data, setData] = React.useState<
    | (Annoncement & {
        testimonials: Testimonial[];
        analytics: Analytics[];
        buildingName: Building | null;
      } & {
        isFavorite?: boolean;
      })
    | null
  >();

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

  const overallRanking = calculateOverallRanking(data?.testimonials || []);

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
    <div className="w-full h-full relative">
      <div
        className={cn(
          "w-[360px] h-fit relative rounded-xl hidden flex-col p-4 gap-2 justify-between absolute z-20 bg-blue-50 top-4 right-4",
          data && "flex"
        )}
      >
        <button
          onClick={() => setData(null)}
          className="absolute right-2 bg-slate-200 rounded-full top-2 opacity-70 hover:opacity-100  z-20"
        >
          <X className="w-4   h-4" />
        </button>
        <div className="w-full flex flex-col gap-2">
          <Carousel
            setApi={setApi}
            className="w-full group aspect-[5/4] relative rounded-xl items-center flex justify-center  bg-white"
          >
            <CarouselContent className="">
              {data?.images.map((img, index) => (
                <CarouselItem key={index} className="">
                  <Image
                    src={img.url}
                    alt={`img+${index}`}
                    width={360}
                    height={320}
                    className=" object-cover rounded-xl  aspect-[5/4] cursor-pointer "
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM01PE8AgACqAFsxPlcSAAAAABJRU5ErkJggg=="
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <button
              className="absolute left-2 opacity-70 hover:opacity-100 hover:bg-opacity-100 rounded-full group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent"
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
              className="absolute right-2 opacity-70 hover:opacity-100 hover:bg-opacity-100 rounded-full group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent"
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

            {data?.serviceType === "Аренда" && (
              <span className="py-1 px-2 group-hover:text-transparent  group-hover:bg-transparent flex flex-row items-center gap-x-1 rounded-full bg-slate-200  bg-opacity-50 absolute top-2 right-2 transition delay-100 duration-300 hover:bg-opacity-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
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

            {data?.isChecked && data?.serviceType === "Аренда" && (
              <span className=" py-1 px-2 bg-sky-500  group-hover:text-transparent  group-hover:bg-transparent flex flex-row items-center gap-x-1 rounded-b-lg left-3   absolute top-0 transition delay-100 duration-300 hover:bg-opacity-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4 stroke-neutral-100 transition group-hover:stroke-transparent delay-100 duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span className="font-semibold text-neutral-100 text-sm group-hover:text-transparent transition delay-100 duration-300">
                  Проверено
                </span>
              </span>
            )}

            <span className="absolute text-sm bottom-2 right-2 py-1 px-2 rounded-lg group-hover:text-slate-900 transition delay-100 duration-300 bg-transparent group-hover:bg-slate-200 group-hover:bg-opacity-70  p-1 items-center flex text-transparent">
              {current}/{count}
            </span>
          </Carousel>
          <div className=" flex flex-col justify-between bottom-0 w-full py-1 px-2 text-slate-900 group-hover:text-transparent  group-hover:bg-transparent transition delay-150 duration-500  bg-opacity-90 ">
            <div className="w-full flex flex-row justify-between items-center">
              <div className="flex flex-col gap-1 w-full">
                <p className="  text-slate-900 group font-semibold text-lg text-left flex flex-row gap-x-1 items-center">
                  {data?.roomNumber}-комнатная {data?.categoryType},{" "}
                  {data?.areaSq} м², {data?.floor}/{data?.floorFrom} этаж{" "}
                </p>
                <div className="flex flex-row justify-between gap-x-4 flex-wrap">
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
            <div className="flex flex-row gap-x-1  items-center">
              {data?.fizOrBiz === "fiz" && (
                <div className="text-green-500 flex flex-row gap-x-1 items-center">
                  <UserRoundCheck className="w-4" />
                  <p className="text-xs font-semibold">Физическое лицо</p>
                </div>
              )}
              {data?.fizOrBiz === "biz" && (
                <div className="text-violet-500 flex flex-row gap-x-1 items-center">
                  <Briefcase className="w-4" />
                  <p className="text-xs font-semibold">Юридическое лицо</p>
                </div>
              )}
            </div>
            <div className="flex flex-row justify-between ">
              <p className=" font-extrabold text-lg">
                {data?.price.toLocaleString().replace(/,/g, " ")} ₸
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push(`/annoncements/${data?.id}`)}
          className=" rounded-lg bg-blue-500 py-1.5 w-full text-sm font-semibold text-neutral-50 hover:bg-slate-800 transition delay-75 duration-150"
        >
          Перейти обьявлению
        </button>
      </div>
      <YMaps>
        <Map
          // defaultState={{
          //   center: [51.128201, 71.430429],
          //   zoom: 12,
          // }}
          state={{
            center: [
              (items &&
                items[0]?.coordinateX &&
                parseFloat(items[0]?.coordinateX)) ||
                51.128201,
              (items &&
                items[0]?.coordinateY &&
                parseFloat(items[0]?.coordinateY)) ||
                71.430429,
            ],
            zoom: 14,
          }}
          width={width || 600}
          height={height || 460}
        >
          <Clusterer
            options={{
              preset: "islands#invertedBlueClusterIcons",
              groupByCoordinates: false,
            }}
          >
            {items?.map((item, index) => (
              <Placemark
                key={index}
                geometry={[
                  item && item?.coordinateX && parseFloat(item?.coordinateX),
                  item && item?.coordinateY && parseFloat(item?.coordinateY),
                ]}
                onHover={() => setData(item)}
              />
            ))}
          </Clusterer>

          <ZoomControl />
        </Map>
      </YMaps>
    </div>
  );
}

export default BigMap;
