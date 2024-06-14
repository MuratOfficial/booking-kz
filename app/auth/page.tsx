import { Metadata } from "next";
import Link from "next/link";
import { UserAuthForm } from "./components/user-auth-form";
import CarouselAuth from "./components/carousel-auth";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Aвторизация | etazhi.kz",
  description: "Форма авторизации",
};

export default function AuthenticationPage() {
  return (
    <div className=" w-full text-slate-900 h-full grid items-center justify-center flex justify-center lg:max-w-none ">
      <div className="w-full h-screen fixed top-0">
        <CarouselAuth />
      </div>

      <div className="relative  bg-no-repeat bg-bottom bg-contain h-full xs:py-12 sm:py-4 lg:py-24 xs:px-2 sm:px-4 lg:px-12 ">
        <UserAuthForm />
      </div>
    </div>
  );
}
