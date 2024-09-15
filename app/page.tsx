import { auth } from "@/auth";
import Hero from "@/components/pages/Hero";
import { Session } from "next-auth";
import { User } from "@/types";
import Image from "next/image";
import prisma from "@/lib/db";
import NewProducts from "@/components/pages/NewProducts";
export default async function Home() {
  const session = (await auth()) as Session | null;
  const user = session?.user as User | null;
  const newProducts = await prisma.product.findMany({
    take: 3,
  });

  return (
    <main className="">
      <Hero user={user || null} />
      <NewProducts newProducts={newProducts} user={user || null} />
    </main>
  );
}
