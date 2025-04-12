import PrimaryButton from "@/app/components/button/Button";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";
import CartItem from "./CartItem";
import { CartItem as CartItemType } from "@/gen/backend";
import { CartItemDetails } from "@/gen/models/CartItemDetails";
import OrderSummary from "./OrderSummary";

const CartPage = () => {
  function clearCart(event): void {
    throw new Error("Function not implemented.");
  }

  const cartItems: CartItemDetails[] = [
    {
      productId: 101,
      name: "Wireless Mouse",
      quantity: 2,
      price: 19.99,
    },
    {
      productId: 102,
      name: "Mechanical Keyboard",
      quantity: 1,
      price: 55.0,
    },
    {
      productId: 103,
      name: "Water Bottle",
      quantity: 3,
      price: 12.0,
    },
    {
      productId: 104,
      name: "USB-C Charger",
      quantity: 1,
      price: 25.5,
    },
    {
      productId: 105,
      name: "Noise Cancelling Headphones",
      quantity: 1,
      price: 89.99,
    },
  ];

  return (
    <>
      <div className="py-10 mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            href={"/"}
            className="text-gray-600 hover:text-gray-900 inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Tiếp tục mua sắm
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-8">Giỏ hàng</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">
              Looks like you havent added anything to your cart yet.
            </p>
            <Link href="/">
              <PrimaryButton>Tiếp tục mua sắm</PrimaryButton>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Cart Items ({cartItems.length})
                  </h2>
                  <button
                    className="text-gray-500 hover:text-red-500"
                    // onClick={clearCart}
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item, index) => (
                    <CartItem key={index} item={item} />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
