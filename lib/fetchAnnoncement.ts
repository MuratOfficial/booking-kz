import { getServerSession } from "next-auth";
import prismadb from "./prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { fetchUserData } from "./fetchUserData";

export async function fetchAnnoncement(id: string) {
  try {
    const annoncement = await prismadb.annoncement.findUnique({
      where: {
        id: id,
      },
      include: {
        testimonials: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });

    return annoncement;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch annoncement");
  }
}

export async function fetchHotModifierAnnoncementsSell() {
  try {
    const annoncement = await prismadb.annoncement.findMany({
      where: {
        serviceType: "Продажа",
        modificators: {
          is: {
            hotModifier: {
              gt: 0,
            },
          },
        },
      },
      include: {
        testimonials: true,
      },
    });

    return annoncement;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch annoncement");
  }
}

export async function fetchHotModifierAnnoncementsRent() {
  try {
    const annoncement = await prismadb.annoncement.findMany({
      where: {
        serviceType: "Аренда",
        modificators: {
          is: {
            hotModifier: {
              gt: 0,
            },
          },
        },
      },
      include: {
        testimonials: true,
      },
    });

    return annoncement;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch annoncement");
  }
}

export async function fetchFavorites() {
  const user = await fetchUserData();

  const favorites = user?.favourites.map((el) => el.annoncementId);

  try {
    const annoncements = await prismadb.annoncement.findMany({
      where: {
        id: { in: favorites },
      },
      include: {
        testimonials: true,
      },
    });

    return annoncements;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch annoncements");
  }
}
