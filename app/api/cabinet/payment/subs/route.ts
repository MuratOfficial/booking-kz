import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireAnnoncementOwner } from "@/lib/auth-guard";
import {
  applySubscription,
  createGatewayPayment,
  getUserBalances,
} from "@/lib/billing";

export async function POST(req: Request) {
  try {
    const dataObject = await req.json();

    // sum / subsDays / userId from the body are ignored: price and duration
    // come from the subscription record, the payer is the signed-in owner.
    const { type, id, subsId } = dataObject ?? {};

    const { user, annoncement, error } = await requireAnnoncementOwner(id);
    if (error) return error;

    if (typeof subsId !== "string" || !subsId) {
      return new NextResponse("subsId is required", { status: 400 });
    }

    const subscription = await prismadb.subscription
      .findUnique({ where: { id: subsId } })
      .catch(() => null);

    if (!subscription || subscription.price < 0 || subscription.days <= 0) {
      return new NextResponse("Unknown subscription", { status: 400 });
    }

    const price = subscription.price;

    if (type === "wallet" || type === "bonus") {
      const balances = await getUserBalances(user.id);
      const available = type === "wallet" ? balances.total : balances.bonus;

      if (available < price) {
        return new NextResponse("Insufficient balance", { status: 402 });
      }

      const payment = await prismadb.payment.create({
        data: {
          userId: user.id,
          ...(type === "wallet"
            ? { sum: price.toString() }
            : { bonus: price.toString() }),
          transactionType: "subscription",
          status: "success",
          annoncementId: annoncement.id,
          subscriptionId: subscription.id,
          days: subscription.days,
          applied: true,
        },
      });

      await applySubscription(
        annoncement.id,
        subscription.id,
        subscription.days,
        payment.id
      );

      return Response.json({});
    }

    if (type === "direct") {
      // The subscription is activated only after the gateway confirms payment.
      const payment = await prismadb.payment.create({
        data: {
          userId: user.id,
          sum: price.toString(),
          transactionType: "subscription",
          paymentType: "direct",
          annoncementId: annoncement.id,
          subscriptionId: subscription.id,
          days: subscription.days,
          applied: false,
        },
      });

      const paymentUrl = await createGatewayPayment(
        payment,
        "subscription",
        user,
        "/cabinet/annoncements"
      );

      return Response.json(paymentUrl);
    }

    return new NextResponse("Unknown payment type", { status: 400 });
  } catch (error) {
    console.log("[subs_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
