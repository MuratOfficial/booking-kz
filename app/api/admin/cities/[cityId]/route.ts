import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireAdmin } from "@/lib/auth-guard";

export async function DELETE(req: Request, props: { params: Promise<{ cityId: string }> }) {
  const params = await props.params;
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

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

export async function PATCH(req: Request, props: { params: Promise<{ cityId: string }> }) {
  const params = await props.params;
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

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
