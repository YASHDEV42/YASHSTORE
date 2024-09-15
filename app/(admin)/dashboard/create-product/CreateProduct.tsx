"use client";
import { createProduct } from "@/actions/Products";
import CreateBtn from "@/components/buttons/CreateBtn";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { Plus } from "lucide-react";

type Props = {};
const initialState = {
  message: null,
  images: [] as string[],
};
const CreateProduct = (props: Props) => {
  const [state, formAction] = useFormState(createProduct as any, initialState);
  const [imageInputs, setImageInputs] = useState([""]);

  const addImageInput = () => {
    setImageInputs([...imageInputs, ""]); // Add a new empty string to the array
  };
  return (
    <section className="mt-28 mb-5">
      <h1 className="my-14 capitalize">create product</h1>
      <form action={formAction} className="center-col gap-5">
        <div className="w-full center-col">
          <label>image urls</label>
          {imageInputs.map((value, index) => (
            <input
              key={index}
              className="my-input mb-2"
              type="text"
              name={`image-${index}`} // Give each input a unique name
              value={value}
              onChange={(e) => {
                const newImageInputs = [...imageInputs];
                newImageInputs[index] = e.target.value;
                setImageInputs(newImageInputs);
              }}
            />
          ))}
          <button
            type="button"
            className="flex flex-row justify-between items-center gap-2 my-2 font-semibold
              bg-gradient-to-br from-red-400 to-red-600 text-white px-4 py-2 rounded-md
              hover:from-red-600 hover:to-red-700 transition duration-700 ease-in
            "
            onClick={addImageInput}
          >
            <Plus /> add image
          </button>
        </div>
        <div className="w-full center-col">
          <label htmlFor="name">name</label>
          <input className="my-input" type="text" name="name" />
        </div>
        <div className="w-full center-col">
          <label htmlFor="description">description</label>
          <input className="my-input" type="text" name="description" />
        </div>
        <div className="w-full center-col">
          <label htmlFor="price">price</label>
          <input type="text" className="my-input" name="price" />
        </div>
        <div className="w-full center-col">
          <label htmlFor="category">category</label>
          <input className="my-input" type="text" name="category" />
        </div>
        {state.message && <p>{state.message}</p>}
        <CreateBtn />
      </form>
    </section>
  );
};

export default CreateProduct;
