import React from "react";
import { auth } from "@/auth";
import { Session } from "next-auth";
import prisma from "@/lib/db";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import RemoveProductFromCart from "@/components/buttons/RemoveProductFromCart";
import { redirect } from "next/navigation";

type Props = {};
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
const page = async (props: Props) => {
  const session = (await auth()) as Session | null;
  const user = session?.user as any;
  if (!user) {
    redirect("/login");
  }
  const cart = await prisma.cart.findMany({ where: { user_id: user?.id } });

  const products_id = cart.map((item) => item.product_id);
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: products_id,
      },
    },
  });
  const totalPrice = products.reduce((acc, item) => acc + item.price, 0);

  if (products.length === 0) {
    return (
      <section className="center-col gap-5">
        <h1 className="mb-24">Cart</h1>
        <h2 className="text-2xl font-semibold">No items in cart 😔</h2>
      </section>
    );
  }
  return (
    <section className="center-col gap-5">
      <h1 className="mt-24 mb-10">Cart</h1>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-end lg:items-center flex-col lg:flex-row  lg:w-[45rem] lg:h-24 bg-gold-light p-3 rounded-md
          hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:border-gold transition duration-300 ease-in-out"
        >
          <div className="center-row gap-3">
            <Image
              src={product.image_url[0]}
              alt={product.name}
              width={75}
              height={75}
              style={{
                objectFit: "contain",
              }}
              className="border-2 border-gold rounded-md h-20 w-20"
            />
            <h2 className="text-3xl font-semibold">{product.name}</h2>
          </div>
          <div className="center-row gap-3">
            <p
              className=" 
            text-3xl font-semibold
            bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-500
            "
            >
              {product.price}$
            </p>
            <RemoveProductFromCart
              productId={product && product.id}
              userId={user && user.id}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-between items-end flex-row w-[100%] lg:w-[40rem]">
        <h2 className="lg:text-3xl text-xl font-semibold lg:mt-5">
          Total Price :
          <span
            className="
            bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-500"
          >
            {totalPrice}$
          </span>
        </h2>
        <Link href="/checkout">
          <button
            className="bg-white text-lg font-semibold rounded-md w-32 h-10 lg:w-36 lg:h-12
               shadow-lg border-2 border-gold
               hover:shadow-none hover:bg-gold hover:scale-95  transition duration-300 ease-in-out"
          >
            Checkout
          </button>
        </Link>
      </div>
    </section>
  );
};

export default page;
