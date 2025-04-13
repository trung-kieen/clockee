"use client";
import {
  CartControllerService,
  CartDetailsResponse,
  CartItemDetails,
} from "@/gen";
import { logger } from "@/utils/logger";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./useAuth";

type CartContextType = {
  cart: CartDetailsResponse;
  totalItems: number;
  fetchCart: () => void;
  addToCart: (item: CartItemDetails) => void;
  removeFromCart: (item: CartItemDetails) => void;
  updateItemQuantity: (updatedItem: CartItemDetails) => void;
};
const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartDetailsResponse>({});
  const { isAuthenticated } = useAuth();

  /**
   * Fetch user cart information for server
   * Require to run after user login
   */
  const fetchCart = async () => {
    try {
      const resp = await CartControllerService.getAllItems();
      setCart(resp);
    } catch (e) {
      setCart({});
      logger.error(e);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const addToCart = (item: CartItemDetails) => {
    try {
      // If update item value in server success => Update in context without refresh
      CartControllerService.addItem(item);
      const defaultQuanitty = 1;
      setCart((previous) => {
        return {
          ...previous,
          items: [
            ...(previous.items || []),
            { ...item, quantity: item.quantity || defaultQuanitty },
          ],
        };
      });
    } catch (e) {
      logger.error(e);
      fetchCart();
    }
  };

  const removeFromCart = (item: CartItemDetails) => {
    if (!item.productId) {
      logger.warn("Unable to remove item from cart without product id");
      return;
    }
    try {
      CartControllerService.removeItem(item.productId);
      setCart((previous) => {
        return {
          ...previous,
          items: previous.items?.filter((i) => i.productId !== item.productId),
        };
      });
    } catch (e) {
      logger.error(e);
      fetchCart();
    }
  };

  const updateItemQuantity = (updatedItem: CartItemDetails) => {
    if (Number(updatedItem.quantity) < 1) {
      removeFromCart(updatedItem);
      return;
    }

    try {
      CartControllerService.updateItem(updatedItem);

      setCart((previous) => {
        return {
          ...previous,
          items: previous.items?.map((oldItem) => {
            return oldItem.productId === updatedItem.productId
              ? updatedItem
              : oldItem;
          }),
        };
      });
    } catch (e) {
      logger.error(e);
      fetchCart();
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        totalItems: cart.items?.length || 0,
        fetchCart: fetchCart,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        updateItemQuantity: updateItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
