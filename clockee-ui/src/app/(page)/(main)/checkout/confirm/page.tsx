"use client";
import CenterCard from "@/app/components/card/CenterCard";
import { useCart } from "@/lib/hooks/useCart";
import { MapPin } from "lucide-react";
import React from "react";
import { ProductImage } from "@/app/components/common/Base64Image";
import { CartItemDetails } from "@/gen";
import Link from "next/link";
const OrderItem = ({ item }: { item: CartItemDetails }) => {
  return (
    <div className="flex items-center py-4 border-b border-gray-200 card-xs">
      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
        <ProductImage data={item.image || ""} />
      </div>

      <div className="flex-1 bg-red-50">
        <h3 className="font-semibold text-lg">
          <Link href={`/product/${item.productId}`}>{item.name}</Link>
        </h3>

        <div className="w-40">
          <div className="flex justify-between">
            <span>Giá</span>
            <span>{item.price}</span>
          </div>
          <div className="flex justify-between">
            <span>Số lượng</span>
            <span>{item.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const CheckoutAddressPage = () => {
  const { selectedItems } = useCart();
  console.log(selectedItems);
  return (
    <>
      <CenterCard>
        <div className="flex items-center flex-col">
          <ul className="steps steps-vertical lg:steps-horizontal mb-40">
            <li className="step step-primary">Giỏ hàng</li>
            <li className="step step-primary">Thông tin nhận hàng</li>
            <li className="step step-primary">Xác nhận</li>
          </ul>

          <div>
            <div className="container mx-auto px-4 py-8 max-w-2xl">
              <div className="mb-6 p-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-yellow-400 mt-1" />
                  <div>
                    <h2 className="font-medium mb-1">Địa chỉ nhận hàng</h2>
                    <div className="flex gap-2 text-sm">
                      <span className="font-medium">Đức Vi</span>
                      <span>(+84) 987834129</span>
                      <span>xxx, Tân bình, TP Hồ Chí Minh</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedItems.map((item, index) => {
                return <OrderItem item={item} key={index} />;
              })}

              <div className="card bg-base-100 card-md shadow-sm">
                <div className="card-body">
                  <div className="flex justify-between mb-4">
                    <span>Tạm tính</span>
                    <span>{Number(91292).toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Tổng tiền</span>
                    <span className="text-lg">
                      {Number(9122).toLocaleString()}đ
                    </span>
                  </div>

                  <div className="p-4 mb-6 rounded-2xl shadow-sm border bg-white">
                    <h2 className="font-medium mb-4">Phương thức thanh toán</h2>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="radio"
                          id="bank"
                          name="paymentMethod"
                          value="bank"
                          // checked={paymentMethod === "bank"}
                          // onChange={() => setPaymentMethod("bank")}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="bank" className="text-sm text-gray-700">
                          Chuyển khoản ngân hàng
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          value="cod"
                          // checked={paymentMethod === "cod"}
                          // onChange={() => setPaymentMethod("cod")}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="cod" className="text-sm text-gray-700">
                          Thanh toán khi nhận hàng
                        </label>
                      </div>
                    </div>
                  </div>

                  <button className="btn w-full bg-red-500 hover:bg-red-600 text-white">
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CenterCard>
    </>
  );
};

export default CheckoutAddressPage;
