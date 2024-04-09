import { unstable_noStore as noStore } from "next/cache";
import prismadb from "./prismadb";

export async function fetchFilteredAnnoncements(
  serviceType?: string,
  phase?: string,
  categoryType?: string[],
  roomNumber?: string[],
  priceFrom?: string,
  priceTo?: string,
  areaSqFrom?: string,
  areaSqTo?: string,
  city?: string,
  more?: string[]
) {
  try {
    noStore();
    const annoncements = await prismadb.annoncement.findMany({
      where: {
        serviceType: serviceType,
        phase: {
          in: ["активно", "проверка"],
        },

        categoryType: Array.isArray(categoryType)
          ? {
              in: categoryType && [...categoryType],
            }
          : categoryType,

        roomNumber: Array.isArray(roomNumber)
          ? {
              in: roomNumber && [...roomNumber?.map((el) => parseInt(el))],
              gte: roomNumber?.includes("5+") ? 5 : undefined,
            }
          : roomNumber
          ? parseInt(roomNumber)
          : {
              gte: roomNumber === "5+" ? 5 : undefined,
            },
        price: {
          gte: parseInt(priceFrom || "0"),
          lte: parseInt(priceTo || "9990000000"),
        },
        areaSq: {
          gte: parseInt(areaSqFrom || "0"),
          lte: parseInt(areaSqTo || "999000"),
        },
        // cityOrDistrict: city,
        additionalFilters: {
          some: {
            value: Array.isArray(more)
              ? {
                  in: more && [...more],
                }
              : more,
          },
        },
      },
      include: {
        testimonials: true,
      },
    });

    return annoncements;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered Data");
  }
}
