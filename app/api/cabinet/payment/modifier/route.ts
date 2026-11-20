import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireAnnoncementOwner } from "@/lib/auth-guard";
import {
  applyModifier,
  createGatewayPayment,
  getUserBalances,
  resolveModifierPrice,
} from "@/lib/billing";

export async function POST(req: Request) {
  try {
    const dataObject = await req.json();

    // sum / userId / email / phone from the body are ignored: the price comes
    // from the DB and the payer is always the signed-in owner.
    const { type, id, days, modifierType } = dataObject ?? {};

    const { user, annoncement, error } = await requireAnnoncementOwner(id);
    if (error) return error;

    const modifier = await resolveModifierPrice(modifierType, days);
    if (!modifier) {
      return new NextResponse("Unknown modifier or duration", { status: 400 });
    }

    if (type === "wallet" || type === "bonus") {
      const balances = await getUserBalances(user.id);
      const available = type === "wallet" ? balances.total : balances.bonus;

      if (available < modifier.price) {
        return new NextResponse("Insufficient balance", { status: 402 });
      }

      const payment = await prismadb.payment.create({
        data: {
          userId: user.id,
          ...(type === "wallet"
            ? { sum: modifier.price.toString() }
            : { bonus: modifier.price.toString() }),
          transactionType: "modifier",
          status: "success",
          annoncementId: annoncement.id,
          modifierType: modifier.name,
          days: modifier.days,
          applied: true,
        },
      });

      await applyModifier(
        annoncement.id,
        modifier.kind,
        modifier.days,
        payment.id
      );

      return Response.json({});
    }

    if (type === "direct") {
      // The modifier is activated only after the gateway confirms the payment.
      const payment = await prismadb.payment.create({
        data: {
          userId: user.id,
          sum: modifier.price.toString(),
          transactionType: "modifier",
          paymentType: "direct",
          annoncementId: annoncement.id,
          modifierType: modifier.name,
          days: modifier.days,
          applied: false,
        },
      });

      const paymentUrl = await createGatewayPayment(
        payment,
        "modifier",
        user,
        "/cabinet/annoncements"
      );

      return Response.json(paymentUrl);
    }

    return new NextResponse("Unknown payment type", { status: 400 });
  } catch (error) {
    console.log("[modifier_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
