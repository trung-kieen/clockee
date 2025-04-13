import React from "react";
import { Trash2 } from "lucide-react";
import { CartItemDetails } from "@/gen";
import { useCart } from "@/lib/hooks/useCart";

interface CartItemProps {
  item: CartItemDetails;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateItemQuantity } = useCart();
  const decreaseItemQuantity = () => {
    item.quantity = (item.quantity || 0) - 1;
    updateItemQuantity(item);
  };
  const increaseItemQuantity = () => {
    item.quantity = (item.quantity || 0) - 1;
    updateItemQuantity(item);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 ml-4">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <div className="text-sm text-gray-600 space-y-1"></div>
        <p className="font-bold mt-1">${item.price}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={decreaseItemQuantity}
        >
          <span className="text-lg">-</span>
        </button>

        <span className="w-8 text-center">{item.quantity}</span>

        <button
          className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={increaseItemQuantity}
        >
          <span className="text-lg">+</span>
        </button>
      </div>

      <button
        className="h-8 w-8 ml-5 text-gray-500 rounded-full hover:text-red-500 "
        onClick={() => removeFromCart(item)}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
export default CartItem;
