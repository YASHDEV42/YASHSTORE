"use client";
import { addProductToCart } from "@/actions/Products";
import toast from "react-hot-toast";
import AddToCartSubmit from "./AddToCartSubmit";

type Props = {};

const AddToCart = ({
  product_id,
  user_id,
}: {
  product_id: string;
  user_id: string;
}) => {
  console.log("product_id", product_id);
  console.log("user_id", user_id);

  return (
    <form
      action={async () => {
        const toastLoading = toast.loading("Adding to cart...");
        await addProductToCart(product_id, user_id);
        toast.dismiss(toastLoading);
        toast.success("added to cart");
      }}
      className="z-10"
    >
      <AddToCartSubmit />
    </form>
  );
};

export default AddToCart;
