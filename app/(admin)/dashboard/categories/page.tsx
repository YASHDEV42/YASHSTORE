import Categories from "@/components/admin/Categories";
import prisma from "@/lib/db";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const categories: any = await prisma.category.findMany();
  const products: any = await prisma.product.findMany();

  return <Categories categories={categories} products={products} />;
};

export default page;
