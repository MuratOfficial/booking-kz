import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireAdmin } from "@/lib/auth-guard";

export async function DELETE(
  req: Request,
  { params }: { params: { paymentId: string } }
) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const payment = await prismadb.payment.delete({
      where: {
        id: params.paymentId,
      },
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.log("[payment_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { paymentId: string } }
) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const body = await req.json();

    const {
      userId,
      sum,
      bonus,
      status,
      annoncementId,
      paymentUrl,
      transactionId,
      transactionType,
    } = body;

    if (!params.paymentId) {
      return new NextResponse("subs id is required", { status: 400 });
    }

    const payment = await prismadb.payment.update({
      where: {
        id: params.paymentId,
      },
      data: {
        userId,
        sum,
        bonus,
        status,
        annoncementId,
        paymentUrl,
        transactionId,
        transactionType,
      },
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.log("[payment_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
