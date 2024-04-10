import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { subscriptionId: string } }
) {
  try {
    const subscription = await prismadb.subscription.delete({
      where: {
        id: params.subscriptionId,
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.log("[subscription_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { subscriptionId: string } }
) {
  try {
    const body = await req.json();

    const { description, name, price, icon, color, days } = body;

    if (!params.subscriptionId) {
      return new NextResponse("subs id is required", { status: 400 });
    }

    const subscription = await prismadb.subscription.update({
      where: {
        id: params.subscriptionId,
      },
      data: {
        description,
        name,
        price,
        icon,
        color,
        days,
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.log("[subscription_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
