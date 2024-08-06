import Products from "@/components/Products";
import prisma from "@/lib/db";
import React from "react";
import { Product } from "@/types";
type Props = {};

const page = async (props: Props) => {
  const products: Product[] = await prisma.product.findMany({
    include: {
      catagory: true,
    },
  });
  console.log(products);
  return <Products products={products} />;
};

export default page;
