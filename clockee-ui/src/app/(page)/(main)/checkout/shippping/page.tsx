"use client";
import CenterCard from "@/app/components/card/CenterCard";
import React from "react";
import DeliveryDetailsForm from "./DeliveryDetailsForm";
const CheckoutAddressPage = () => {
  return (
    <>
      <CenterCard className="">
        <div className="flex items-center flex-col">
          <ul className="steps steps-vertical lg:steps-horizontal mb-40">
            <li className="step step-primary">Giỏ hàng</li>
            <li className="step step-primary">Thông tin nhận hàng</li>
            <li className="step">Xác nhận</li>
          </ul>

          <DeliveryDetailsForm />
        </div>
      </CenterCard>
    </>
  );
};

export default CheckoutAddressPage;
