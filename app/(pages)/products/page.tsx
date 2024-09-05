import Products from "@/components/Products";
import prisma from "@/lib/db";
import React from "react";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { User } from "@/types";
import { redirect } from "next/navigation";

const page = async () => {
  const products: any = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  console.log(products);

  const session = (await auth()) as Session | null;
  const user = session?.user as any as User;

  if (!user) {
    redirect("/login");
  }

  return <Products products={products} user={user} />;
};

export default page;
