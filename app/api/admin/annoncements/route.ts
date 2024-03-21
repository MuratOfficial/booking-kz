import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/auth";

export async function POST(req: Request) {
  try {
    // const session = await getServerSession(authOptions);

    // const userIdData = JSON.parse(JSON.stringify(session));

    // const admin = await prismadb.user.findUnique({
    //   where: {
    //     id: userIdData?.user?.id,
    //   },
    // });

    // if (admin?.isAdmin === false) {
    //   return new NextResponse("Access denied", { status: 401 });
    // }

    const body = await req.json();

    const {
      modificators: { topModifier, hotModifier, hurryModifier },
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
      isChecked,
      subscriptionDate,
      phase,
      description,
    } = body;

    if (!userId) {
      return new NextResponse("userId is required", { status: 400 });
    }

    const annoncement = await prismadb.annoncement.create({
      data: {
        description,
        modificators: {
          topModifier,
          hotModifier,
          hurryModifier,
        },
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
        isChecked,
        subscriptionDate,
        phase,
      },
    });

    return NextResponse.json(annoncement);
  } catch (error) {
    console.log("[ANNONCEMENT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
