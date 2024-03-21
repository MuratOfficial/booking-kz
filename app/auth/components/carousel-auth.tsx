"use client";
import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

function CarouselAuth() {
  const images = [
    "/auth-carusel/1.jpg",
    "/auth-carusel/2.jpg",
    "/auth-carusel/3.jpg",
    "/auth-carusel/4.jpg",
    "/auth-carusel/5.jpg",
    "/auth-carusel/6.jpg",
    "/auth-carusel/7.jpg",
  ];
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{
        duration: 60,
        loop: true,
      }}
      className="w-full h-screen flex flex-col bg-cover relative "
    >
      <p className=" text-slate-50 font-semibold uppercase text-xl mt-4 ml-4 absolute z-20">
        etazhi.kz
      </p>
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index} className="w-full h-full ml-0 pl-0">
            <Image
              src={img}
              alt={`img+${index}`}
              width={1200}
              height={1200}
              className=" object-cover  h-screen w-full"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default CarouselAuth;
