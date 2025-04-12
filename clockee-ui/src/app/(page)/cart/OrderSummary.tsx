"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface OrderSummaryProps {
  showCheckoutButton?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  showCheckoutButton = true,
}) => {
  // const { orderSummary, applyPromoCode } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const router = useRouter();
  // const navigate = ();

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">${Number(8).toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-shop-discount">
            -${Number(10).toFixed(2)}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-lg">${Number(18).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {showCheckoutButton && (
        <button
          className="w-full mt-4 btn-checkout"
          onClick={() => router.push("/checkout")}
          // disabled={orderSummary.subtotal === 0}
        >
          Go to Checkout
        </button>
      )}
    </div>
  );
};

export default OrderSummary;
