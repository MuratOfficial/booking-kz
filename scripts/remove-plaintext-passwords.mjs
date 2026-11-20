// One-off cleanup: removes the legacy plaintext `password` field (and any
// stale verification codes) from every user document in MongoDB.
// Usage:  node scripts/remove-plaintext-passwords.mjs
// Requires DATABASE_URL in the environment (e.g. loaded from .env).
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
  const result = await prisma.$runCommandRaw({
    update: "User",
    updates: [
      {
        q: { password: { $exists: true } },
        u: { $unset: { password: "" } },
        multi: true,
      },
    ],
  });
  console.log("Plaintext passwords removed:", result);
} finally {
  await prisma.$disconnect();
}
