import { getServerSession } from "next-auth";
import prismadb from "./prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

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

    return user;
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
