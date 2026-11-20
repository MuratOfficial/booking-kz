import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireAdmin } from "@/lib/auth-guard";
import { hash } from "bcrypt";

export async function DELETE(req: Request, props: { params: Promise<{ annoncementId: string }> }) {
  const params = await props.params;
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    // const session = await getServerSession(authOptions);

    // const annoncementIdData = JSON.parse(JSON.stringify(session));

    // const admin = await prismadb.user.findUnique({
    //   where: {
    //     id: annoncementIdData?.user?.id,
    //   },
    // });

    // if (admin?.isAdmin === false) {
    //   return new NextResponse("Access denied", { status: 401 });
    // }

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

export async function PATCH(req: Request, props: { params: Promise<{ annoncementId: string }> }) {
  const params = await props.params;
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const body = await req.json();

    // const session = await getServerSession(authOptions);
    // const annoncementIdData = JSON.parse(JSON.stringify(session));

    // const admin = await prismadb.user.findUnique({
    //   where: {
    //     id: annoncementIdData?.user?.id,
    //   },
    // });

    // if (admin?.isAdmin === false) {
    //   return new NextResponse("Access denied", { status: 401 });
    // }

    const {
      additionalFilters,
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
      moderatorText,
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
        id: params.annoncementId,
      },
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
        additionalFilters: formattedAdditionalFilters,
        coordinateX,
        coordinateY,
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
        moderatorText,
        fizOrBiz,
      },
    });

    return NextResponse.json(annoncement);
  } catch (error) {
    console.log("[ANNONCEMENT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
