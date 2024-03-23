import { getServerSession } from "next-auth";
import prismadb from "./prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function fetchAnnoncement(id: string) {
  try {
    const annoncement = await prismadb.annoncement.findUnique({
      where: {
        id: id,
      },
      include: {
        testimonials: true,
        user: true,
      },
    });

    return annoncement;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch annoncement");
  }
}
