"use client";
import { updateProduct } from "@/actions/Products";
import { Product } from "@/types";
import React, { use } from "react";
import { useFormState, useFormStatus } from "react-dom";
type EditableProductData = {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string[];
};

const EditProduct = ({ product }: { product: Product }) => {
  const { pending } = useFormStatus();
  const [formData, setFormData] = React.useState<EditableProductData>({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    image_url: product.image_url as any,
  });
  const [state, formAction] = useFormState(updateProduct as any, product);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...formData.image_url];
    newImageUrls[index] = value;
    setFormData((prevData) => ({ ...prevData, image_url: newImageUrls }));
  };

  return (
    <form action={formAction} className="min-h-screen center-col pt-20">
      <input type="text" hidden defaultValue={formData.id} name="id" />
      <label htmlFor="">Image url:</label>
      {formData.image_url.map((url, index) => (
        <input
          type="text"
          key={index}
          className="my-input"
          name={`image_url-${index}`}
          value={url}
          onChange={(e) => handleImageUrlChange(index, e.target.value)}
        />
      ))}
      <label htmlFor="">Name:</label>
      <input
        type="text"
        className="my-input "
        name="name"
        defaultValue={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="">Price:</label>
      <input
        type="number"
        className="my-input"
        name="price"
        onChange={handleChange}
        defaultValue={formData.price}
      />
      <label htmlFor="">Description:</label>
      <textarea
        name="description"
        id="description"
        className="my-input"
        defaultValue={formData.description}
        onChange={handleChangeTextArea}
      />

      <button type="submit" className="secondary-btn">
        {pending ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default EditProduct;
