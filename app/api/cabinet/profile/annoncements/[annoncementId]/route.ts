import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireAnnoncementOwner } from "@/lib/auth-guard";

export async function DELETE(
  req: Request,
  { params }: { params: { annoncementId: string } }
) {
  try {
    const { error } = await requireAnnoncementOwner(params.annoncementId);
    if (error) return error;

    const annoncement = await prismadb.annoncement.delete({
      where: {
        id: params.annoncementId,
      },
    });

    return NextResponse.json(annoncement);
  } catch (error) {
    console.log("[ANNONCEMENT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { annoncementId: string } }
) {
  try {
    const { annoncement: existing, error } = await requireAnnoncementOwner(
      params.annoncementId
    );
    if (error) return error;

    const body = await req.json();

    const {
      additionalFilters,

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

    if (!params.annoncementId) {
      return new NextResponse("user id is required", { status: 400 });
    }

    const formattedAdditionalFilters = additionalFilters
      ? additionalFilters.map((filter: any) => ({
          value: filter.value,
        }))
      : [];

    const annoncement = await prismadb.annoncement.update({
      where: {
        id: existing.id,
      },
      data: {
        description,
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
        additionalFilters: formattedAdditionalFilters,
        yearBuild,
        price,
        priceNego,
        comeIn,
        comeOut,
        images,
        townOrStreet,
        // Any edit sends the listing back to moderation.
        isChecked: false,
        phase: "проверка",
        coordinateX,
        coordinateY,
        fizOrBiz,
      },
    });

    return NextResponse.json(annoncement);
  } catch (error) {
    console.log("[ANNONCEMENT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
