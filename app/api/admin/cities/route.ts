import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { cityOrDistrict, cityOrTown } = body;

    if (!cityOrDistrict) {
      return new NextResponse("cityOrDistrict is required", { status: 400 });
    }

    const city = await prismadb.city.create({
      data: {
        cityOrDistrict,
        cityOrTown,
      },
    });

    return NextResponse.json(city);
  } catch (error) {
    console.log("[city_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
