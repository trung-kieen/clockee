import React from "react";
import { Trash2 } from "lucide-react";
import { CartItemDetails } from "@/gen";

interface CartItemProps {
  item: CartItemDetails;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const handleQuantityChange = (change: number) => {
    const newQuantity = Number(item.quantity) + change;
    if (newQuantity > 0) {
      // updateQuantity(item.id, newQuantity);
    } else {
      // removeFromCart(item.id);
    }
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
        {/*
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        */}
      </div>

      <div className="flex-1 ml-4">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <div className="text-sm text-gray-600 space-y-1">
          {/*
          {item.size && <p>Size: {item.size}</p>}
          {item.color && <p>Color: {item.color}</p>}
          */}
        </div>
        <p className="font-bold mt-1">${item.price}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          className="h-8 w-8 rounded-full"
          // onClick={() => handleQuantityChange(-1)}
        >
          <span className="text-lg">-</span>
        </button>

        <span className="w-8 text-center">{item.quantity}</span>

        <button
          className="h-8 w-8 rounded-full"
          // onClick={() => handleQuantityChange(1)}
        >
          <span className="text-lg">+</span>
        </button>
      </div>

      <button
        className="ml-4 text-gray-500 hover:text-red-500"
        // onClick={() => removeFromCart(item.id)}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
export default CartItem;
