"use client";
import { addProductToCart } from "@/actions/Products";

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
        await addProductToCart(product_id, user_id);
      }}
      className="z-50"
    >
      <button
        type="submit"
        className="bg-red-500 text-red-100 text-lg font-semibold rounded-md w-36 h-12
              shadow-lg border-2 border-red-500
              hover:shadow-none hover:bg-red-200 hover:scale-95 hover:text-red-500 transition duration-300 ease-in-out"
      >
        Add to Cart
      </button>
    </form>
  );
};

export default AddToCart;
