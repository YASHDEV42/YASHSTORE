"use server";

import prisma from "@/lib/db";

const createProduct = async (prevState: FormData, formData: FormData) => {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const catagory = formData.get("catagory") as string;

  if (!name || !description || !price || !catagory) {
    return { message: "failed" };
  }
  try {
    const product = await prisma.catagory.create({
      data: {
        name: catagory,
        products: {
          create: {
            image_url: "https://via.placeholder.com/150",
            name,
            description,
            price: parseFloat(price),
          },
        },
      },
    });
  } catch (error) {
    return { message: "failed" };
  }
};

export { createProduct };
