import { CartDetailsResponse } from "@/gen";
import { ReactNode, useEffect, useState } from "react";
import { createContext } from "vm";

const CartContext = createContext<CartDetailsResponse | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartDetails, setCartDetails] = useState<Car>(null);
  // TODO
  return <div></div>;
};
