import Link from "next/link";
import React from "react";

function AdminFooter() {
  const currentDate: Date = new Date();
  const currentYear: number = currentDate.getFullYear();

  return (
    <footer className=" text-center  flex flex-col items-center justify-center">
      <div className="bg-slate-800 w-full  flex flex-row justify-between items-center py-4 px-4">
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

export default AdminFooter;
