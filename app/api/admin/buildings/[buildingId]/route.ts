import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { buildingId: string } }
) {
  try {
    const building = await prismadb.building.delete({
      where: {
        id: params.buildingId,
      },
    });

    return NextResponse.json(building);
  } catch (error) {
    console.log("[building_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { buildingId: string } }
) {
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
      coordinateX,
      cityId,
      coordinateY,
    } = body;

    if (!params.buildingId) {
      return new NextResponse("subs id is required", { status: 400 });
    }

    const building = await prismadb.building.update({
      where: {
        id: params.buildingId,
      },
      data: {
        description,
        name,
        buildingYear,
        type,
        cityOrDistrict,
        cityOrTown,
        townOrStreet,
        floors,
        images,
        coordinateX,
        coordinateY,
        cityId,
      },
    });

    return NextResponse.json(building);
  } catch (error) {
    console.log("[building_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
