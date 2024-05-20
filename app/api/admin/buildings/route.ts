import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      description,
      name,
      buildingYear,
      type,
      cityOrDistrict,
      cityOrTown,
      townOrStreet,
      floors,
      images,
      cityId,
      coordinateX,
      coordinateY,
    } = body;

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    const building = await prismadb.building.create({
      data: {
        description,
        name,
        buildingYear,
        type,
        cityOrDistrict,
        cityOrTown,
        townOrStreet,
        cityId,
        floors,
        images,
        coordinateX,
        coordinateY,
      },
    });

    return NextResponse.json(building);
  } catch (error) {
    console.log("[building_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
