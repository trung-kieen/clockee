"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full mt-4 flex flex-col justify-center items-center">
      <h2 className="text-2xl mb-4">Something went wrong!</h2>
      <button className="btn btn-primary" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
