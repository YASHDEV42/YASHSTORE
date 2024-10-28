"use client";
import React from "react";
import { useFormStatus } from "react-dom";
type Props = {};

const SignupBtn = (props: Props) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`primary-btn mt-4 ${pending ? "opacity-60" : " "}`}
    >
      {pending ? "Signing Up..." : "Sign Up"}
    </button>
  );
};

export default SignupBtn;
