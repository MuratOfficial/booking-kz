import { NextResponse } from "next/server";
import hmacSHA512 from "crypto-js/hmac-sha512";

import axios from "axios";

export async function POST(req: Request) {
  const dataObject = req.body;

  const dataJson = JSON.stringify({
    amount: 15000,
    currency: "KZT",
    order_id: "550e8511-e29b-41d5-a718-446655442051",
    description: "test",
    payment_type: "pay",
    payment_method: "ecom",
    items: [
      {
        merchant_id: "8133b22d-e91b-4176-a1b8-9b7cd0e07cf4",
        service_id: "e7146794-14bc-4e0c-8831-0234937fbc3f",
        merchant_name: "маркетплейс",
        name: "test pay",

        quantity: 1,
        amount_one_pcs: 15000,
        amount_sum: 15000,
      },
    ],
    user_id: "test",
    email: "test@example.com",
    phone: "+77777777777",
    success_url: "http://etazhi.kz",
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

  // if (!total) {
  //   return new NextResponse("total is required", { status: 400 });
  // }

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

    return Response.json(decodedData?.payment_page_url);
  } catch (error) {
    console.log("[refill_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
