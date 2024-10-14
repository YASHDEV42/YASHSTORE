"use client";
import { addProductToCart } from "@/actions/Products";
import toast from "react-hot-toast";

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
      <button
        type="submit"
        className="bg-gold text-lg font-semibold rounded-md w-36 h-12
              shadow-lg border-2 border-gold
              hover:shadow-none hover:bg-gold-light hover:scale-95  transition duration-300 ease-in-out"
      >
        Add to Cart
      </button>
    </form>
  );
};

export default AddToCart;
