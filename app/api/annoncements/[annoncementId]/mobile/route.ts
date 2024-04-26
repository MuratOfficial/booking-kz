import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
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
        testimonials: {
          include: {
            user: true,
          },
        },
        user: true,
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
    return NextResponse.json(annoncement);
  } catch (error) {
    console.log("[ANNONCEMENTS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
