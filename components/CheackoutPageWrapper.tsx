"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheackoutPage from "./pages/CheackoutPage";
import { Cart, Product, User } from "@/types";
type Props = {};
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
const CheackoutPageWrapper = ({
  amount,
  products,
  user,
  cart,
}: {
  amount: number;
  products: Product[];
  user: User;
  cart: Cart[];
}) => {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        currency: "usd",
        amount: amount,
      }}
    >
      <CheackoutPage
        amount={amount}
        products={products}
        user={user}
        cart={cart}
      />
    </Elements>
  );
};

export default CheackoutPageWrapper;
