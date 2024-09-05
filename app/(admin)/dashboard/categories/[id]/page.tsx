import CategoryDetail from "@/components/admin/CategoryDetail";
import prisma from "@/lib/db";
import { Product } from "@/types";
import React from "react";

type Props = {};

const page = async ({ params }: { params: any }) => {
  const id = params.id;
  const products = await prisma.product.findMany();
  const categoryProducts: any = products.filter(
    (product) => product.category_id === id
  );

  return <CategoryDetail categoryProducts={categoryProducts} />;
};

export default page;
