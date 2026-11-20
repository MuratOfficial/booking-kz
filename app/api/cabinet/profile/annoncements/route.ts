import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireUser } from "@/lib/auth-guard";

export async function POST(req: Request) {
  try {
    const { user, error } = await requireUser();
    if (error) return error;
    const userId = user.id;

    const body = await req.json();

    const {
      serviceType,
      categoryType,
      serviceTypeExt,
      cityOrTown,
      phone,
      roomNumber,
      floor,
      floorFrom,
      areaSq,
      repairType,
      roofHeight,
      cityOrDistrict,
      buildingId,
      additionalFilters,

      yearBuild,
      price,
      priceNego,

      comeIn,
      comeOut,
      images,
      townOrStreet,
      description,
      coordinateX,
      coordinateY,
      fizOrBiz,
    } = body;

    let add30days: Date = new Date();
    add30days.setDate(add30days.getDate() + 30);

    const annoncement = await prismadb.annoncement.create({
      data: {
        description,
        userId,
        serviceType,
        categoryType,
        serviceTypeExt,
        cityOrTown,
        phone,
        roomNumber,
        floor,
        floorFrom,
        areaSq,
        repairType,
        roofHeight,
        cityOrDistrict,
        buildingId,
        additionalFilters,

        yearBuild,
        price,
        priceNego,

        comeIn,
        comeOut,
        images,
        townOrStreet,
        isChecked: false,
        subscriptionDate: add30days,
        phase: "проверка",
        coordinateX,
        coordinateY,
        fizOrBiz,
      },
    });

    return NextResponse.json(annoncement);
  } catch (error) {
    console.log("[ANNONCEMENT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
