import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prismadb from "./prismadb";

export type SessionUser = NonNullable<
  Awaited<ReturnType<typeof getSessionUser>>
>;

type GuardResult =
  | { user: SessionUser; error: null }
  | { user: null; error: NextResponse };

/** Loads the signed-in user from the database (secret fields omitted). */
export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  const id = (session?.user as { id?: string } | undefined)?.id;
  if (!id) return null;

  try {
    const user = await prismadb.user.findUnique({ where: { id } });
    if (!user || user.status === "blocked") return null;
    return user;
  } catch {
    return null;
  }
}

/** Requires a signed-in, non-blocked user. */
export async function requireUser(): Promise<GuardResult> {
  const user = await getSessionUser();
  if (!user) {
    return {
      user: null,
      error: new NextResponse("Unauthorized", { status: 401 }),
    };
  }
  return { user, error: null };
}

export function isAdmin(user: { accessType?: string | null } | null) {
  return user?.accessType === "admin";
}

/** Requires a signed-in user whose role is "admin" (checked against the DB). */
export async function requireAdmin(): Promise<GuardResult> {
  const result = await requireUser();
  if (result.error) return result;
  if (!isAdmin(result.user)) {
    return {
      user: null,
      error: new NextResponse("Forbidden", { status: 403 }),
    };
  }
  return result;
}

/** Escapes text before inserting it into an HTML template (e-mails). */
export function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Requires that the signed-in user owns the announcement (admins are allowed
 * too). Returns the announcement on success.
 */
export async function requireAnnoncementOwner(annoncementId: unknown) {
  const { user, error } = await requireUser();
  if (error) return { user: null, annoncement: null, error };

  if (typeof annoncementId !== "string" || !annoncementId) {
    return {
      user: null,
      annoncement: null,
      error: new NextResponse("annoncement id is required", { status: 400 }),
    };
  }

  const annoncement = await prismadb.annoncement
    .findUnique({ where: { id: annoncementId } })
    .catch(() => null);

  if (!annoncement) {
    return {
      user: null,
      annoncement: null,
      error: new NextResponse("Not found", { status: 404 }),
    };
  }

  if (annoncement.userId !== user.id && !isAdmin(user)) {
    return {
      user: null,
      annoncement: null,
      error: new NextResponse("Forbidden", { status: 403 }),
    };
  }

  return { user, annoncement, error: null };
}
