import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { cityId: string } }
) {
  try {
    const city = await prismadb.city.delete({
      where: {
        id: params.cityId,
      },
    });

    return NextResponse.json(city);
  } catch (error) {
    console.log("[city_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { cityId: string } }
) {
  try {
    const body = await req.json();

    const { cityOrDistrict, cityOrTown } = body;

    if (!params.cityId) {
      return new NextResponse("subs id is required", { status: 400 });
    }

    const city = await prismadb.city.update({
      where: {
        id: params.cityId,
      },
      data: {
        cityOrDistrict,
        cityOrTown,
      },
    });

    return NextResponse.json(city);
  } catch (error) {
    console.log("[city_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
