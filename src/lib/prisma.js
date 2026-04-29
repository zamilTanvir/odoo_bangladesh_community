import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prevent creating new PrismaClient instances in dev hot-reload.
const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prismaInstance ||
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaInstance = prisma;
}

export { prisma };

