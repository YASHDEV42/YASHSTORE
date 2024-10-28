import React from "react";
import { useFormStatus } from "react-dom";

const AddToCartSubmit = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`bg-gold text-lg font-semibold rounded-md w-36 h-12
              shadow-lg border-2 border-gold
              hover:shadow-none hover:bg-gold-light hover:scale-95  transition duration-300 ease-in-out
              ${pending ? "opacity-60" : " "}
              `}
    >
      {pending ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCartSubmit;
