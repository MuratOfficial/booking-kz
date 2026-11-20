import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { requireUser } from "@/lib/auth-guard";

const RANKING_KEYS = [
  "overall",
  "ranking1",
  "ranking2",
  "ranking3",
  "ranking4",
  "ranking5",
  "ranking6",
] as const;

export async function PATCH(req: Request, props: { params: Promise<{ annoncementId: string }> }) {
  const params = await props.params;
  try {
    const { user, error } = await requireUser();
    if (error) return error;

    if (!params.annoncementId) {
      return new NextResponse("annoncement id is required", { status: 400 });
    }

    const body = await req.json();
    const { comment, ranking } = body ?? {};

    if (comment !== undefined && comment !== null) {
      if (typeof comment !== "string" || comment.length > 2000) {
        return new NextResponse("Invalid comment", { status: 400 });
      }
    }

    if (!ranking || typeof ranking !== "object") {
      return new NextResponse("ranking is required", { status: 400 });
    }

    // Only the known ranking keys are stored, each as a short string.
    const cleanRanking = Object.fromEntries(
      RANKING_KEYS.map((key) => [key, String(ranking[key] ?? "").slice(0, 10)])
    ) as Record<(typeof RANKING_KEYS)[number], string>;

    const annoncement = await prismadb.annoncement
      .findUnique({ where: { id: params.annoncementId }, select: { id: true } })
      .catch(() => null);

    if (!annoncement) {
      return new NextResponse("Not found", { status: 404 });
    }

    const testimonial = await prismadb.testimonial.create({
      data: {
        userId: user.id,
        annoncementId: annoncement.id,
        ranking: cleanRanking,
        comment,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.log("[TESTIMONIAL_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
