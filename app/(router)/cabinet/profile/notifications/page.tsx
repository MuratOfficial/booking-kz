import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Оповещения",
};

function NotificationsPage() {
  const exampleNotifications = [
    {
      notificationType: "Обьявление",
      notificationDate: new Date("02-02-2024"),
      startText: "Обьявление",
      linkText: "5-комнатная квартира, 4/8 этаж, за 150000 месячно",
      link: "/",
      endText: "успешно подтвержен модератором",
    },
    {
      notificationType: "Платежи",
      notificationDate: new Date("02-02-2024"),
      startText: "Платеж",
      linkText: "на сумму 15000 ед.",
      link: "/",
      endText: "успешно поступил",
    },
    {
      notificationType: "Настройки",
      notificationDate: new Date("02-02-2024"),
      startText: "Пароль",
      linkText: "",
      link: "/",
      endText: "успешно изменен",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white rounded-2xl p-4 flex flex-col gap-2">
      <h2 className="uppercase font-bold text-2xl"> Оповещения</h2>
      {exampleNotifications.map((item, index) => (
        <div
          className="w-full border rounded-xl px-4 py-3 flex flex-col text-slate-500"
          key={index}
        >
          <div className="flex flex-row justify-between">
            <Badge variant="outline" className="w-fit flex flex-row gap-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
              {item.notificationType}
            </Badge>
            <p className="text-sm ">
              {item.notificationDate.toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-row justify-between mt-2">
            <p className="text-sm font-medium">
              {item.startText}{" "}
              <Link
                href={item?.link}
                className="text-blue-500 hover:underline underline-offset-2"
              >
                {item?.linkText}
              </Link>{" "}
              {item.endText}
            </p>
            <button className="w-fit text-red-500 p-0.5 rounded-full hover:bg-slate-200 transition delay-75 duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotificationsPage;
