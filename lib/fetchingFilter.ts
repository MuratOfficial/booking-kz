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

  more?: string[],
  cityOrTown?: string,
  street?: string,
  building?: string,
  priceNego?: string,
  serviceTypeExt?: string[]
) {
  try {
    noStore();
    const annoncements = await prismadb.annoncement.findMany({
      where: {
        serviceType: serviceType,
        phase: {
          in: ["активно"],
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
        cityOrDistrict: {
          endsWith: city?.slice(4),
        },
        cityOrTown: {
          contains: cityOrTown?.slice(1),
        },
        townOrStreet: {
          contains: street?.slice(1),
        },
        additionalFilters: {
          some: {
            value: Array.isArray(more)
              ? {
                  in: more && [...more],
                }
              : more,
          },
        },
        buildingId: building,
        priceNego: priceNego === "true" ? true : undefined,
        serviceTypeExt: Array.isArray(serviceTypeExt)
          ? {
              in: serviceTypeExt && [...serviceTypeExt],
            }
          : serviceTypeExt,
      },
      include: {
        testimonials: true,
        analytics: true,
        buildingName: true,
      },
      orderBy: [
        {
          topModifierDate: "desc",
        },
        { createdAt: "desc" },
      ],
    });

    return annoncements;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered Data");
  }
}

export async function fetchBuildings(city?: string) {
  try {
    noStore();
    const buildings = await prismadb.building.findMany({
      where: {
        cityOrDistrict: {
          contains: city?.slice(1),
        },
      },
    });
    return buildings;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered Data");
  }
}

export async function fetchCities() {
  try {
    noStore();
    const cities = await prismadb.city.findMany({
      include: {
        buildings: true,
      },
    });
    return cities;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered Data");
  }
}
