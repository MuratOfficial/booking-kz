import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { fetchUserData } from "@/lib/fetchUserData";

export async function PATCH(
  req: Request,
  { params }: { params: { annoncementId: string } }
) {
  const user = await fetchUserData();
  try {
    const body = await req.json();

    const {} = body;

    if (!params.annoncementId) {
      return new NextResponse("annoncement id is required", { status: 400 });
    }

    const annoncement = await prismadb.annoncement.findUnique({
      where: {
        id: params.annoncementId,
      },
      include: {
        analytics: true,
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
              mobileCount: {
                increment: 1,
              },
            },
          });
        } else {
          await prismadb.analytics.create({
            data: {
              annoncementId: annoncement?.id!,
              mobileCount: 1,
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
            mobileCount: {
              increment: 1,
            },
          },
        });
      } else {
        await prismadb.analytics.create({
          data: {
            annoncementId: annoncement?.id!,
            mobileCount: 1,
            createdDate: new Date().toLocaleDateString(),
          },
        });
      }
    }
    if (!annoncement) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Only the public contact phone is needed by the client.
    return NextResponse.json({ id: annoncement.id, phone: annoncement.phone });
  } catch (error) {
    console.log("[ANNONCEMENTS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
