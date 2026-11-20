import prismadb from "@/lib/prismadb";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { type NextAuthOptions } from "next-auth";

const ROLE_REFRESH_MS = 5 * 60 * 1000;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "etazhi@example.com",
        },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string" ||
          !credentials.email ||
          !credentials.password
        ) {
          return null;
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email.trim(),
          },
          omit: { passwordHash: false },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        // Blocked accounts and accounts whose e-mail was never confirmed
        // cannot sign in. (isVerified === null covers legacy accounts.)
        if (user.status === "blocked" || user.isVerified === false) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          accessType: user.accessType,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          accessType: (user as { accessType?: string }).accessType ?? "user",
          roleCheckedAt: Date.now(),
        };
      }

      // Re-read the role periodically so a demoted / blocked admin loses
      // access to /admin without waiting for the session to expire.
      const checkedAt = Number(token.roleCheckedAt ?? 0);
      if (token.id && Date.now() - checkedAt > ROLE_REFRESH_MS) {
        try {
          const fresh = await prismadb.user.findUnique({
            where: { id: String(token.id) },
            select: { accessType: true, status: true },
          });
          token.accessType =
            fresh && fresh.status !== "blocked" ? fresh.accessType : "none";
          token.roleCheckedAt = Date.now();
        } catch {
          // DB unavailable: keep the previous role and retry next time.
        }
      }
      return token;
    },

    redirect: async ({ baseUrl }) => {
      // Always redirect to our own origin after sign-in / sign-out.
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
    signOut: "/",
  },
};

export default NextAuth(authOptions);
