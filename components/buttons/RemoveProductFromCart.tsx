"use client";
import { removeProductFromCart } from "@/actions/Products";
import React from "react";
import { useFormStatus } from "react-dom";
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
      <RemoveProductFromCartSubmit />
    </form>
  );
};
const RemoveProductFromCartSubmit = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`primary-btn ${pending ? "opacity-60" : ""}`}
      disabled={pending}
    >
      {pending ? "Removing..." : "Remove"}
    </button>
  );
};
export default RemoveProductFromCart;
