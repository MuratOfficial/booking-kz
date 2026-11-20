import type { User } from "@prisma/client";

/** A user record without secret fields (what prismadb returns by default). */
export type SafeUser = Omit<
  User,
  | "password"
  | "passwordHash"
  | "verificationCode"
  | "verificationCodeExpires"
  | "verificationAttempts"
>;

/** Minimal public profile shown next to listings, reviews and chats. */
export type PublicUser = Pick<User, "id" | "name" | "username">;
