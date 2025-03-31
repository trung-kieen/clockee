/**
 * Use to wrap react layout with react toast for display notification
 * https://github.com/fkhadra/react-toastify/issues/963
 */
"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}

      <ToastContainer />
    </>
  );
}
