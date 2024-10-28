import React from "react";
import { useFormStatus } from "react-dom";

type Props = {};

const CreateBtn = (props: Props) => {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <button className="primary-btn opacity-60" disabled>
        Creating...
      </button>
    );
  }

  return <button className="primary-btn">Create</button>;
};

export default CreateBtn;
