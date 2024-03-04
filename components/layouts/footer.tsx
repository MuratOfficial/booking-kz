import { Instagram, PhoneCall } from "lucide-react";
import React from "react";
import Link from "next/link";

function Footer() {
  const currentDate: Date = new Date();
  const currentYear: number = currentDate.getFullYear();
  return (
    <footer className=" text-center bg-slate-900 flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-start gap-4 py-10  text-neutral-100 px-4">
        <p className="text-neutral-400 font-semibold text-lg">
          Подписывайтесь на нас
        </p>
        <div className="flex flex-row gap-4">
          <Link
            href="instagram.com"
            target="_blank"
            className=" p-3 rounded-md bg-slate-800  hover:bg-slate-950"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d4d4d4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-instagram"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </Link>
          <Link
            href="instagram.com"
            target="_blank"
            className=" p-3 rounded-md bg-slate-800  hover:bg-slate-950"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d4d4d4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-youtube"
            >
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
              <path d="m10 15 5-3-5-3z" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="bg-slate-950 w-full  flex flex-row justify-between items-center py-4 px-4">
        <p className="lg:text-left xs:text-center xxs:text-center text-xs text-neutral-400 ">
          &copy; {currentYear} &ldquo;Booking KZ&rdquo;. Все права защищены.
        </p>
        <div className="flex flex-row gap-x-4 lg:text-left xs:text-center xxs:text-center text-xs text-neutral-400">
          <Link
            href="/"
            className="hover:text-neutral-100 transition delay-75 duration-300"
          >
            Пользовательское соглашение
          </Link>
          <Link
            href="/"
            className="hover:text-neutral-100 transition delay-75 duration-300"
          >
            Служба поддержки
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
