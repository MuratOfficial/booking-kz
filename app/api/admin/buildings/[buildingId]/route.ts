import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireAdmin } from "@/lib/auth-guard";

export async function DELETE(req: Request, props: { params: Promise<{ buildingId: string }> }) {
  const params = await props.params;
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

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

export async function PATCH(req: Request, props: { params: Promise<{ buildingId: string }> }) {
  const params = await props.params;
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

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
