import prismadb from "@/lib/prismadb";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { type NextAuthOptions } from "next-auth";
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
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
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...(session.user as User),
          id: token.id,
          isAdmin: token.isAdmin,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as User;
        return {
          ...token,
          id: u.id,
          name: u.name,
        };
      }
      return token;
    },

    redirect: async ({ url, baseUrl }) => {
      // Redirect after sign-in

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
