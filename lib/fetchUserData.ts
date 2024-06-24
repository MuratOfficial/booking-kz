import { getServerSession } from "next-auth";
import prismadb from "./prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Payment } from "@prisma/client";
import axios from "axios";
import { HmacSHA512 } from "crypto-js";

export async function fetchUserData() {
  const session = await getServerSession(authOptions);
  const userIdData = JSON.parse(JSON.stringify(session))?.user;
  try {
    const user = userIdData
      ? await prismadb?.user?.findUnique({
          where: {
            id: userIdData.id,
          },
          include: {
            payments: {
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        })
      : null;

    if (user) {
      return user;
    }
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
