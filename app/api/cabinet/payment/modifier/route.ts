import { NextResponse } from "next/server";
import hmacSHA512 from "crypto-js/hmac-sha512";

import axios from "axios";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const dataObject = await req.json();

  const { sum, type, userId, email, phone, id, days, modifierType } =
    dataObject;

  let adddays: Date = new Date();
  adddays.setDate(adddays.getDate() + days);

  const modType: string = modifierType;
  const lowerModType = modType.toLowerCase();

  if (type === "wallet") {
    const payment = await prismadb.payment.create({
      data: {
        userId: userId,
        sum: sum,
        transactionType: "modifier",
        status: "success",
        annoncementId: id,
      },
    });
    if (lowerModType.includes("ячие")) {
      await prismadb.annoncement.update({
        where: {
          id: id,
        },
        data: {
          hotModifierDate: adddays,

          hotModifierPaidStatus: payment.id,
        },
      });
    }
    if (lowerModType.includes("топ")) {
      await prismadb.annoncement.update({
        where: {
          id: id,
        },
        data: {
          topModifierDate: adddays,
          topModifierPaidStatus: payment.id,
        },
      });
    }
    if (lowerModType.includes("очно")) {
      await prismadb.annoncement.update({
        where: {
          id: id,
        },
        data: {
          hurryModifierDate: adddays,
          hurryModifierPaidStatus: payment.id,
        },
      });
    }

    return Response.json({});
  }
  if (type === "bonus") {
    const payment = await prismadb.payment.create({
      data: {
        userId: userId,
        bonus: sum,
        transactionType: "modifier",
        status: "success",
        annoncementId: id,
      },
    });
    if (lowerModType.includes("ячие")) {
      await prismadb.annoncement.update({
        where: {
          id: id,
        },
        data: {
          hotModifierDate: adddays,

          hotModifierPaidStatus: payment.id,
        },
      });
    }
    if (lowerModType.includes("топ")) {
      await prismadb.annoncement.update({
        where: {
          id: id,
        },
        data: {
          topModifierDate: adddays,
          topModifierPaidStatus: payment.id,
        },
      });
    }
    if (lowerModType.includes("очно")) {
      await prismadb.annoncement.update({
        where: {
          id: id,
        },
        data: {
          hurryModifierDate: adddays,
          hurryModifierPaidStatus: payment.id,
        },
      });
    }

    return Response.json({});
  }

  if (type === "direct") {
    const payment = await prismadb.payment.create({
      data: {
        userId: userId,
        sum: sum,
        transactionType: "modifier",
        paymentType: "direct",
        annoncementId: id,
      },
    });

    if (lowerModType.includes("ячие")) {
      await prismadb.annoncement.update({
        where: {
          id: id,
        },
        data: {
          hotModifierDate: adddays,

          hotModifierPaidStatus: payment.id,
        },
      });
    }
    if (lowerModType.includes("топ")) {
      await prismadb.annoncement.update({
        where: {
          id: id,
        },
        data: {
          topModifierDate: adddays,
          topModifierPaidStatus: payment.id,
        },
      });
    }
    if (lowerModType.includes("очно")) {
      await prismadb.annoncement.update({
        where: {
          id: id,
        },
        data: {
          hurryModifierDate: adddays,
          hurryModifierPaidStatus: payment.id,
        },
      });
    }

    const dataJson = JSON.stringify({
      amount: parseFloat(payment.sum),
      currency: "KZT",
      order_id: payment.id,
      description: "modifier",
      payment_type: "pay",
      payment_method: "ecom",
      items: [
        {
          merchant_id: "8133b22d-e91b-4176-a1b8-9b7cd0e07cf4",
          service_id: "e7146794-14bc-4e0c-8831-0234937fbc3f",
          merchant_name: "маркетплейс",
          name: "modifier",

          quantity: 1,
          amount_one_pcs: parseFloat(payment.sum),
          amount_sum: parseFloat(payment.sum),
        },
      ],
      user_id: payment.userId,
      email: email || "test@example.com",
      phone: phone || "+77777777777",
      success_url: "http://etazhi.kz/cabinet/annoncements",
      // "failure_url"
      // :
      // http://example.com
      // "callback_url"
      // :
      // http://example.com
      payment_lifetime: 3600,
      create_recurrent_profile: false,
      recurrent_profile_lifetime: 0,
      lang: "ru",
    });

    const reqData: any = Buffer.from(dataJson).toString("base64");
    const sign = hmacSHA512(reqData, process.env.ONEVISION_API_SECRET!);
    try {
      // const body = await req.json();

      const token = Buffer.from(process.env.ONEVISION_API_KEY!).toString(
        "base64"
      );

      const body = { data: reqData, sign: sign.toString() };

      const response = await axios.post(
        "https://api.onevisionpay.com/payment/create",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.data.data;
      const decodedData = JSON.parse(
        Buffer.from(data, "base64").toString("utf-8")
      );

      await prismadb.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          paymentUrl: decodedData?.payment_page_url,
          transactionId: decodedData?.payment_id.toString(),
        },
      });

      return Response.json(decodedData?.payment_page_url);
    } catch (error) {
      console.log("[subs_POST]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
}
