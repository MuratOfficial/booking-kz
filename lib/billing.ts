import axios from "axios";
import hmacSHA512 from "crypto-js/hmac-sha512";
import type { Payment } from "@prisma/client";

import prismadb from "./prismadb";

const ONEVISION_CREATE_URL = "https://api.onevisionpay.com/payment/create";
const MERCHANT_ID = "8133b22d-e91b-4176-a1b8-9b7cd0e07cf4";
const SERVICE_ID = "e7146794-14bc-4e0c-8831-0234937fbc3f";
const SITE_URL = process.env.NEXTAUTH_URL || "https://etazhi.kz";

const toNumber = (value: string | null | undefined) => {
  const n = parseFloat(value || "0");
  return Number.isFinite(n) ? n : 0;
};

/** Sums a user's successful payments (same rules as the billing page). */
export function computeBalances(payments: Payment[]) {
  let total = 0;
  let bonus = 0;

  for (const payment of payments) {
    if (payment.status !== "success") continue;

    if (
      payment.transactionType === "refill" ||
      payment.transactionType === "refill-manual" ||
      payment.transactionType === "bonus"
    ) {
      total += toNumber(payment.sum);
      bonus += toNumber(payment.bonus);
    } else if (payment.paymentType !== "direct") {
      total -= toNumber(payment.sum);
      bonus -= toNumber(payment.bonus);
    }
  }

  return { total, bonus };
}

export async function getUserBalances(userId: string) {
  const payments = await prismadb.payment.findMany({
    where: { userId, status: "success" },
  });
  return computeBalances(payments);
}

export type ModifierKind = "hot" | "top" | "hurry";

export function modifierKind(name: string | null | undefined) {
  const lower = (name || "").toLowerCase();
  if (lower.includes("ячие")) return "hot" as const;
  if (lower.includes("топ")) return "top" as const;
  if (lower.includes("очно")) return "hurry" as const;
  return null;
}

/** Finds the price of a modifier for the given duration from the DB. */
export async function resolveModifierPrice(modifierName: unknown, days: unknown) {
  if (typeof modifierName !== "string" || typeof days !== "number") {
    return null;
  }

  const modifier = await prismadb.modifierType.findFirst({
    where: { modifier: modifierName },
  });
  if (!modifier) return null;

  const options: [number | null, string | null][] = [
    [modifier.modifierDays, modifier.modifierPrice],
    [modifier.modifierDays2, modifier.modifierPrice2],
    [modifier.modifierDays3, modifier.modifierPrice3],
  ];

  const match = options.find(([d]) => d !== null && d > 0 && d === days);
  if (!match) return null;

  const price = toNumber(match[1]);
  if (price < 0) return null;

  const kind = modifierKind(modifier.modifier);
  if (!kind) return null;

  return { price, days: match[0] as number, kind, name: modifier.modifier! };
}

const addDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export async function applyModifier(
  annoncementId: string,
  kind: ModifierKind,
  days: number,
  paymentId: string
) {
  const until = addDays(days);
  const data =
    kind === "hot"
      ? { hotModifierDate: until, hotModifierPaidStatus: paymentId }
      : kind === "top"
      ? { topModifierDate: until, topModifierPaidStatus: paymentId }
      : { hurryModifierDate: until, hurryModifierPaidStatus: paymentId };

  await prismadb.annoncement.update({ where: { id: annoncementId }, data });
}

export async function applySubscription(
  annoncementId: string,
  subscriptionId: string,
  days: number,
  paymentId: string
) {
  await prismadb.annoncement.update({
    where: { id: annoncementId },
    data: {
      subscriptionId,
      companySubscription: addDays(days).toLocaleDateString(),
      subsStatus: paymentId,
    },
  });
}

/**
 * Activates what a card ("direct") payment was for, once the gateway has
 * confirmed it. Safe to call repeatedly — each payment is applied once.
 */
export async function applyConfirmedPayment(payment: Payment) {
  if (payment.status !== "success" || !payment.annoncementId) return;
  if (!payment.modifierType && !payment.subscriptionId) return;

  const claimed = await prismadb.payment.updateMany({
    where: { id: payment.id, applied: false },
    data: { applied: true },
  });
  if (claimed.count !== 1) return;

  const days = payment.days ?? 0;
  if (payment.transactionType === "modifier" && payment.modifierType) {
    const kind = modifierKind(payment.modifierType);
    if (kind) await applyModifier(payment.annoncementId, kind, days, payment.id);
  }
  if (payment.transactionType === "subscription" && payment.subscriptionId) {
    await applySubscription(
      payment.annoncementId,
      payment.subscriptionId,
      days,
      payment.id
    );
  }
}

/** Creates a OneVision payment page for an existing pending payment. */
export async function createGatewayPayment(
  payment: Payment,
  description: string,
  contact: { email?: string | null; phone?: string | null },
  successPath: string
) {
  const amount = toNumber(payment.sum);

  const dataJson = JSON.stringify({
    amount,
    currency: "KZT",
    order_id: payment.id,
    description,
    payment_type: "pay",
    payment_method: "ecom",
    items: [
      {
        merchant_id: MERCHANT_ID,
        service_id: SERVICE_ID,
        merchant_name: "маркетплейс",
        name: description,
        quantity: 1,
        amount_one_pcs: amount,
        amount_sum: amount,
      },
    ],
    user_id: payment.userId,
    email: contact.email || "test@example.com",
    phone: contact.phone || "+77777777777",
    success_url: new URL(successPath, SITE_URL).toString(),
    payment_lifetime: 3600,
    create_recurrent_profile: false,
    recurrent_profile_lifetime: 0,
    lang: "ru",
  });

  const reqData = Buffer.from(dataJson).toString("base64");
  const sign = hmacSHA512(reqData, process.env.ONEVISION_API_SECRET!);
  const token = Buffer.from(process.env.ONEVISION_API_KEY!).toString("base64");

  const response = await axios.post(
    ONEVISION_CREATE_URL,
    { data: reqData, sign: sign.toString() },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const decodedData = JSON.parse(
    Buffer.from(response.data.data, "base64").toString("utf-8")
  );

  await prismadb.payment.update({
    where: { id: payment.id },
    data: {
      paymentUrl: decodedData?.payment_page_url,
      transactionId: decodedData?.payment_id?.toString(),
    },
  });

  return decodedData?.payment_page_url as string | undefined;
}
