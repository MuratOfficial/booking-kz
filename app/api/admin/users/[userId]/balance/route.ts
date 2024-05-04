import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
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

    if (!params.userId) {
      return new NextResponse("user id is required", { status: 400 });
    }

    const defined = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
    });

    let totalBalanceChanged = parseFloat(defined?.totalBalance || "0");
    let bonusBalanceChanged = parseFloat(defined?.bonusBalance || "0");

    if (transactionType) {
      if (
        transactionType === "refill" ||
        transactionType === "refill-manual" ||
        transactionType === "bonus"
      ) {
        totalBalanceChanged += parseFloat(sum);
        bonusBalanceChanged += parseFloat(bonus);
      }
      if (
        transactionType === "subscription" ||
        transactionType === "modifier"
      ) {
        totalBalanceChanged -= parseFloat(sum);
        bonusBalanceChanged -= parseFloat(bonus);
      }
    }

    const user = await prismadb.user.update({
      where: {
        id: params.userId,
      },
      data: {
        totalBalance: totalBalanceChanged.toString(),
        bonusBalance: bonusBalanceChanged.toString(),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[user_PAYMNT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
