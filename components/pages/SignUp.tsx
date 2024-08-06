"use client";
import { Register } from "@/actions/User";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
type Props = {};
const initialState = {
  message: null,
};
const SignUp = (props: Props) => {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(Register as any, initialState);
  return (
    <section className="center-col gap-2">
      <div className="h-1/2 w-full flex items-center justify-center mb-8">
        <h1>Register Page</h1>
      </div>
      <form className="center-col w-full" action={formAction}>
        <div className="w-full flex items-center justify-center flex-col">
          <label htmlFor="name" className="my-label">
            Name :
          </label>
          <input
            className="my-input"
            placeholder=""
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className="w-full center-col">
          <label htmlFor="email">Email :</label>
          <input
            className="my-input"
            placeholder=""
            type="email"
            name="email"
            id="email"
          />
        </div>
        {/* <div className="w-full flex items-center justify-center flex-col">
          <label htmlFor="phone">Phone Number :</label>
          <input
            className="my-input"
            placeholder=""
            type="phone"
            name="phone"
            id="phone"
          />
        </div> */}
        <div className="w-full flex items-center justify-center flex-col">
          <label htmlFor="password">Password :</label>
          <input
            className="my-input"
            placeholder=""
            type="password"
            name="password"
            id="password"
          />
          <label htmlFor="confirmPassword">Confirm Password :</label>
          <input
            className="my-input"
            placeholder=""
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
        </div>
        {state.message && (
          <p className="text-red-700 text-lg md:text-xl lg:text-2xl font-bold">
            {state.message}
          </p>
        )}
        <button type="submit" className="primary-btn mt-4">
          {pending ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <span>or</span>
      <form>
        <button className="google-btn w-12">Sign Up with Google</button>
      </form>
    </section>
  );
};

export default SignUp;
