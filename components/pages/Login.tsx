"use client";
import React from "react";
import { Login } from "@/actions/User";
import { useFormState, useFormStatus } from "react-dom";
type Props = {};
const initialState = {
  message: null,
};
const LoginPage = (props: Props) => {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(Login as any, initialState);

  return (
    <section className="center-col gap-2">
      <div className="h-1/2 w-full flex items-center justify-center mb-8">
        <h1>Login Page</h1>
      </div>
      <form className="center-col w-full" action={formAction}>
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

        <div className="w-full flex items-center justify-center flex-col">
          <label htmlFor="password">Password :</label>
          <input
            className="my-input"
            placeholder=""
            type="password"
            name="password"
            id="password"
          />
        </div>
        {state.message && (
          <p className="text-red-700 text-lg md:text-xl lg:text-2xl font-bold">
            {state.message}
          </p>
        )}
        <button type="submit" className="primary-btn mt-4">
          {pending ? "Loading..." : "Login"}
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
