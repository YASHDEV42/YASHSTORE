"use client";
import { removeProductFromCart } from "@/actions/Products";
import React from "react";
import toast from "react-hot-toast";

type Props = {};

const RemoveProductFromCart = ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  return (
    <form
      action={async () => {
        const toastLoading = toast.loading("Removing item from cart...");
        await removeProductFromCart(userId, productId);
        toast.dismiss(toastLoading);
        toast.success("Item removed from cart");
      }}
    >
      <button type="submit" className="primary-btn">
        Remove
      </button>
    </form>
  );
};

export default RemoveProductFromCart;
