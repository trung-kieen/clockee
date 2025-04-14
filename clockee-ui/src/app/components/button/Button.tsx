import React, { ReactNode } from "react";
type PrimaryButtonProps = {
  children: ReactNode;
  className?: string;
};
const PrimaryButton = ({ children, className = "btn" }: PrimaryButtonProps) => {
  return (
    <>
      <button
        className={`btn bg-primary  text-white px-4 py-2 rounded-lg flex items-center ml-3  shadow ${className}`}
      >
        {children}
      </button>
    </>
  );
};

export default PrimaryButton;
