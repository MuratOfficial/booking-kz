"use client";
import { Analytics } from "@prisma/client";
import { Eye, Phone } from "lucide-react";
import React from "react";
import Chart from "react-apexcharts";

interface GraphicsProps {
  data: Analytics[] | null;
}

export default function Graphics({ data }: GraphicsProps) {
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

  const overallAnalyticsView = overallCount(data || []);
  // const error = console.error;
  // console.error = (...args: any) => {
  //   if (/defaultProps/.test(args[0])) return;
  //   error(...args);
  // };
  const today = new Date().toLocaleDateString();

  const todayViews = data?.find((el) => el.createdDate === today)?.viewCount;
  const todayMobileViews = data?.find(
    (el) => el.createdDate === today
  )?.mobileCount;

  const getLast7Days = (): string[] => {
    const datesArray: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      datesArray.push(date.toLocaleDateString());
    }
    return datesArray;
  };

  const last7Days = getLast7Days();

  const getLast7DaysOffYear = (): string[] => {
    const datesArray: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      datesArray.push(
        date.toLocaleString("ru", { month: "2-digit", day: "numeric" })
      );
    }
    return datesArray;
  };

  const last7DaysOffYear = getLast7DaysOffYear();

  const newDataView = last7Days.map(
    (el) => data?.find((item) => item.createdDate === el)?.viewCount || 0
  );

  const newDataMobile = last7Days.map(
    (el) => data?.find((item) => item.createdDate === el)?.mobileCount || 0
  );

  const options = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
      fontFamily: "Inter",
    },
    stroke: {
      width: 1.5,
    },
    xaxis: {
      categories: last7DaysOffYear,
    },
    yaxis: { forceNiceScale: true },
    legend: {
      show: false,
    },
  };

  const [series, setSeries] = React.useState([
    {
      name: "Просмотры",
      data: newDataView,
    },
    {
      name: "Просмотры телефона",
      data: newDataMobile,
    },
  ]);

  return (
    <div className="mixed-chart w-full flex flex-col ">
      <div className="flex flex-row w-full text-xs justify-between gap-2 px-2">
        <div className="flex flex-row  items-center">
          <p className="font-semibold mr-2">За все время</p>
          <Eye className="w-3 mr-1" />{" "}
          <span className="text-[11px] mr-2">
            {overallAnalyticsView.totalCount || 0}
          </span>
          <Phone className="w-3 mr-1" />{" "}
          <span className="text-[11px]">
            {overallAnalyticsView.mobileCount || 0}
          </span>
        </div>
        <div className="flex flex-row  items-center text-blue-500">
          <p className="font-semibold mr-2 text-slate-900">За сегодня</p>
          <Eye className="w-3 mr-1" />{" "}
          <span className="text-[11px] mr-2">{todayViews || 0}</span>
          <Phone className="w-3 mr-1" />{" "}
          <span className="text-[11px]">{todayMobileViews || 0}</span>
        </div>
      </div>
      <Chart
        options={options}
        series={series}
        height="190"
        type="line"
        width="350"
      />
    </div>
  );
}
