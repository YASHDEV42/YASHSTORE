

import { auth } from "@/auth";
import ProductDetail from "@/components/pages/ProductDetail";
import prisma from "@/lib/db";
import { Product } from "@/types";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const page = async ({ params }: { params: any }) => {
  const id = params.id;
  const session = (await auth()) as Session | null;
  const user = session?.user as any;

  const product = (await prisma.product.findUnique({
    where: {
      id: id,
    },
  })) as any as Product;
  console.log("product", product);
  console.log("id", id);
  if (!user) {
    redirect("/login");
  }

  return <ProductDetail product={product} user={user} />;
};

export default page;
