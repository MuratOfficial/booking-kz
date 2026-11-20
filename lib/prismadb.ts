import { PrismaClient } from "@prisma/client";

// Secret user fields are never returned by default — not in API responses and
// not in props passed from server to client components. Code that really needs
// one of them must opt in explicitly with `omit: { passwordHash: false }`.
const createPrismaClient = () =>
  new PrismaClient({
    omit: {
      user: {
        password: true,
        passwordHash: true,
        verificationCode: true,
        verificationCodeExpires: true,
        verificationAttempts: true,
      },
    },
  });

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

declare global {
  var prisma: ExtendedPrismaClient | undefined;
}

const prismadb = globalThis.prisma || createPrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
