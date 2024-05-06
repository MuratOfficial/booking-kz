import { getServerSession } from "next-auth";
import prismadb from "./prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Payment } from "@prisma/client";
import axios from "axios";
import { HmacSHA512 } from "crypto-js";

async function processPendingPayments(
  pendingPayments: Payment[] | null | undefined
) {
  if (pendingPayments) {
    for (const payment of pendingPayments) {
      try {
        // Your existing code for processing each pending payment goes here
        const dataJson = JSON.stringify({
          // payment_id: parseInt(payment.transactionId || "0"),
          order_id: payment.id,
        });
        console.log(dataJson);

        const reqData = Buffer.from(dataJson).toString("base64");
        const sign = HmacSHA512(reqData, process.env.ONEVISION_API_SECRET!);

        const token = Buffer.from(process.env.ONEVISION_API_KEY!).toString(
          "base64"
        );
        const body = { data: reqData, sign: sign.toString() };

        const response = await axios.post(
          "https://api.onevisionpay.com/payment/status",
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.data;

        const decodedData =
          data.data &&
          JSON.parse(Buffer.from(data.data, "base64").toString("utf-8"));

        const newStatus =
          decodedData?.payment_status === "created"
            ? "pending"
            : decodedData?.payment_status === "withdraw"
            ? "success"
            : "fail";

        await prismadb.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            status: newStatus,
          },
        });

        console.log("updated payments");
      } catch (error) {
        console.log("[refill_GET]", error);
      }
    }
  }
}

export async function fetchUserData() {
  try {
    const session = await getServerSession(authOptions);
    const userIdData = JSON.parse(JSON.stringify(session))?.user;
    const user = userIdData
      ? await prismadb?.user?.findUnique({
          where: {
            id: userIdData.id,
          },
          include: {
            payments: true,
          },
        })
      : null;

    const refreshPayment = user?.payments.filter(
      (el) => el.status === "success"
    );

    const pendingPayments = user?.payments.filter(
      (el) =>
        el.status === "pending" && el.transactionId && el.transactionId !== ""
    );

    processPendingPayments(pendingPayments);

    let totalSum = 0;
    let totalBonus = 0;
    if (refreshPayment) {
      refreshPayment.forEach((payment) => {
        if (
          payment.transactionType === "refill" ||
          payment.transactionType === "refill-manual" ||
          payment.transactionType === "bonus"
        ) {
          totalSum += parseFloat(payment.sum);
          if (payment.bonus) {
            totalBonus += parseFloat(payment.bonus);
          }
        } else {
          if (payment.paymentType !== "direct") {
            totalSum -= parseFloat(payment.sum);
            if (payment.bonus) {
              totalBonus -= parseFloat(payment.bonus);
            }
          }
        }
      });
    }

    const updatedUser = await prismadb.user.update({
      where: {
        id: user?.id,
      },
      data: {
        totalBalance: totalSum.toString(),
        bonusBalance: totalBonus.toString(),
      },
      include: {
        payments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchSubscriptions() {
  try {
    const subs = await prismadb.subscription.findMany();

    return subs;
  } catch (error) {
    console.error("Database Error:", error);
  }
}
