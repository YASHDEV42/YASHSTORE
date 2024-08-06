import { PrismaClient } from "@prisma/client";
import { Return } from "@prisma/client/runtime/library";

const prismaClientSignleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: Return<typeof prismaClientSignleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSignleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
