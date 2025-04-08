import React, { ReactNode } from "react";
type PrimaryButtonProps = {
  children: ReactNode
}
const PrimaryButton = ({ children }: PrimaryButtonProps) => {
  return (
    <>
      <button className="bg-primary  text-white px-4 py-2 rounded-lg flex items-center ml-3  shadow">
        {children}
      </button>

    </>
  );
};

export default PrimaryButton;
