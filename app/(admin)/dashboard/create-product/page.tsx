"use client";
import { createProduct } from "@/actions/Products";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

type Props = {};
const initialState = {
  message: null,
};
const page = (props: Props) => {
  const [state, formAction] = useFormState(createProduct as any, initialState);
  return (
    <section>
      <h1 className="my-14">create product</h1>
      <form action={formAction} className="center-col gap-5">
        <div className="w-full center-col">
          <label htmlFor="image">image</label>

          <input className="my-input" type="image" name="image" />
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
          <input
            type="number"
            className="my-input"
            required
            name="price"
            min="0"
            max="999999999999"
            step="any"
          />
        </div>
        <div className="w-full center-col">
          <label htmlFor="catagory">catagory</label>
          <input className="my-input" type="text" name="catagory" />
        </div>
        <button type="submit" className="primary-btn">
          submit
        </button>
      </form>
    </section>
  );
};

export default page;
