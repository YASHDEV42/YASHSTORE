"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const LoginBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`primary-btn mt-4 ${pending ? "opacity-60" : " "}`}
    >
      {pending ? "Loading..." : "Login"}
    </button>
  );
};

export default LoginBtn;
