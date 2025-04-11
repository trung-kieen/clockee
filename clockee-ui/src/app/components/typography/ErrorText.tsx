import { ReactNode } from "react";

const ErrorText = ({ children }: { children: ReactNode }) => {
  return <p className={`text-center  text-error `}>{children}</p>;
};

export default ErrorText;
