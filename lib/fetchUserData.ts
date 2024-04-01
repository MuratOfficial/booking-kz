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
        })
      : null;

    return user;
  } catch (error) {
    console.error("Database Error:", error);
  }
}
