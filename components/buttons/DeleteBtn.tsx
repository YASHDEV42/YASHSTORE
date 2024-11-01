"use client";
import React from "react";
import { useFormStatus } from "react-dom";

type Props = {};

const DeleteBtn = (props: Props) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`bg-red-600 px-6 py-2 rounded-md text-red-100 font-bold ${
        pending ? "opacity-60" : ""
      }`}
      disabled={pending}
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteBtn;
