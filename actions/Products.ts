"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createProduct = async (prevState: FormData, formData: FormData) => {
  /* Storing data */

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const category = formData.get("category") as string;
  const imageUrls = [];
  for (let [key, value] of formData.entries() as any) {
    if (key.startsWith("image-") && value) {
      // Assuming your image input names are like "image-0", "image-1", etc.
      imageUrls.push(value as string);
    }
  }
  console.log(imageUrls);

  /* Validation */
  if (!name || !description || !price || !category) {
    return { message: "Please fill in all fields" };
  }

  if (parseFloat(price) < 0) {
    return { message: "Price cannot be negative" };
  }
  if (parseFloat(price) === 0) {
    return { message: "Please enter a valid price" };
  }

  /* Creating a new product */
  try {
    let category_id;
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: category,
      },
    });
    if (existingCategory) {
      category_id = existingCategory.id;
    } else {
      const newCategory = await prisma.category.create({
        data: {
          name: category,
        },
      });
      category_id = newCategory.id;
    }
    await prisma.product.create({
      data: {
        image_url: imageUrls,
        name,
        price: parseFloat(price),
        description,
        category: {
          connect: { id: category_id },
        },
      },
    });
  } catch (error) {
    return { message: "failed" };
  }
  redirect("/dashboard");
};

const deleteProduct = async (id: string) => {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    });

    await Promise.all(
      categories.map(async (category) => {
        if (category.products.length === 0) {
          await prisma.category.delete({
            where: {
              id: category.id,
            },
          });
        }
      })
    );

    revalidatePath("/dashboard");
  } catch (error) {
    console.error(error);
  }
};

const updateProduct = async (prevState: FormData, formData: FormData) => {
  const id = formData.get("id") as string;
  const images_urls: string[] = [];
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  for (let [key, value] of formData.entries() as any) {
    if (key.startsWith("image_url-") && value) {
      images_urls.push(value as string);
    }
  }

  if (!name || !description || !price) {
    return { message: "Please fill in all fields" };
  }
  try {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        image_url: images_urls,
        name,
        description,
        price: parseFloat(price),
      },
    });
  } catch (error) {
    throw new Error("Something went wrong");
  }
  redirect("/dashboard/products");
};
async function addProductToCart(product_id: string, user_id: string) {
  const existingProduct = await prisma.cart.findFirst({
    where: {
      product_id,
      user_id,
    },
  });
  if (existingProduct) {
    return { message: "Product already in cart" };
  }

  try {
    const product = await prisma.cart.create({
      data: {
        product_id,
        user_id,
      },
    });
  } catch (error) {
    return { message: "failed" };
  }
  revalidatePath("/products");
}
const removeProductFromCart = async (userId: string, productId: string) => {
  console.log("Removing product from cart");

  try {
    console.log("userId", userId);
    console.log("productId", productId);
    const existingCartItems = await prisma.cart.findMany({
      where: {
        product_id: productId,
      },
    });
    console.log("existingCartItems", existingCartItems);

    const data = await prisma.cart.deleteMany({
      where: {
        product_id: productId,
        user_id: userId,
      },
    });
    console.log("Product removed from cart", data);

    revalidatePath("/cart");
    console.log("Revalidated path");
  } catch (error) {
    console.error(error);
  }
};

export {
  createProduct,
  deleteProduct,
  updateProduct,
  addProductToCart,
  removeProductFromCart,
};
