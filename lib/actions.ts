"use server";

import { z } from "zod";
import AuthError, { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prismadb from "./prismadb";

const FormSchema = z.object({
  id: z.string({}),
});

const AddFavourite = FormSchema.omit({});

// This is temporary
export type State = {
  errors?: {
    id: string;
    status?: string[];
  };
  message?: string | null;
};

export async function addFavourite(formData: FormData) {
  const session = await getServerSession(authOptions);
  const userIdData = JSON.parse(JSON.stringify(session))?.user;
  // Validate form fields using Zod
  const validatedFields = AddFavourite.safeParse({
    id: formData.get("id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Add Favourite Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { id } = validatedFields.data;

  // Insert data into the database
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id: userIdData.id,
      },
    });

    await prismadb.user.update({
      where: {
        id: userIdData.id,
      },
      data: {
        favourites: [
          ...(user?.favourites || []),
          { annoncementId: id, text: "" },
        ],
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Add Favourites.",
    };
  }
}
