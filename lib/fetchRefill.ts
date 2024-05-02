import prismadb from "./prismadb";

export async function fetchRefill() {
  try {
    const refills = await prismadb.refill.findMany({});

    return refills;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch refills");
  }
}
