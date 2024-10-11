import React from "react";
import { SignOut } from "@/actions/User";

type Props = {};

const SignOutBtn = (props: Props) => {
  return (
    <form action={SignOut}>
      <button
        className="p-2 transition duration-200 border-2 border-gold rounded-md
          hover:bg-gold-light hover:scale-95 hover:border-gold-dark"
        type="submit"
      >
        Log out
      </button>
    </form>
  );
};

export default SignOutBtn;
