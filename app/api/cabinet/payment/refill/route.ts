import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireUser } from "@/lib/auth-guard";
import { createGatewayPayment } from "@/lib/billing";

export async function POST(req: Request) {
  try {
    const { user, error } = await requireUser();
    if (error) return error;

    const dataObject = await req.json();

    // The amount and bonus come from the refill package stored in the DB —
    // values sent by the client (sum, bonus, userId) are not trusted.
    const { refillId } = dataObject ?? {};

    if (typeof refillId !== "string" || !refillId) {
      return new NextResponse("refillId is required", { status: 400 });
    }

    const refill = await prismadb.refill
      .findUnique({ where: { id: refillId } })
      .catch(() => null);

    if (!refill || refill.total <= 0) {
      return new NextResponse("Unknown refill package", { status: 400 });
    }

    const payment = await prismadb.payment.create({
      data: {
        userId: user.id,
        sum: refill.total.toString(),
        bonus: (refill.bonus ?? 0).toString(),
        transactionType: "refill",
      },
    });

    const paymentUrl = await createGatewayPayment(
      payment,
      "refill",
      user,
      "/cabinet/profile/billing"
    );

    return Response.json(paymentUrl);
  } catch (error) {
    console.log("[refill_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
