import { getServerSession } from "next-auth";
import prismadb from "./prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { fetchUserData } from "./fetchUserData";

export async function fetchAnnoncement(id: string) {
  const user = await fetchUserData();
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
        analytics: true,
        buildingName: true,
      },
    });

    if (user) {
      if (annoncement?.userId !== user.id) {
        if (
          annoncement?.analytics.find(
            (el) => el.createdDate === new Date().toLocaleDateString()
          )
        ) {
          const todayAnalytics = annoncement.analytics.find(
            (el) => el.createdDate === new Date().toLocaleDateString()
          );
          await prismadb.analytics.update({
            where: {
              id: todayAnalytics?.id,
            },
            data: {
              viewCount: {
                increment: 1,
              },
            },
          });
        } else {
          await prismadb.analytics.create({
            data: {
              annoncementId: annoncement?.id!,
              viewCount: 1,
              createdDate: new Date().toLocaleDateString(),
            },
          });
        }
      }
    } else {
      if (
        annoncement?.analytics.find(
          (el) => el.createdDate === new Date().toLocaleDateString()
        )
      ) {
        const todayAnalytics = annoncement.analytics.find(
          (el) => el.createdDate === new Date().toLocaleDateString()
        );
        await prismadb.analytics.update({
          where: {
            id: todayAnalytics?.id,
          },
          data: {
            viewCount: {
              increment: 1,
            },
          },
        });
      } else {
        await prismadb.analytics.create({
          data: {
            annoncementId: annoncement?.id!,
            viewCount: 1,
            createdDate: new Date().toLocaleDateString(),
          },
        });
      }
    }

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
