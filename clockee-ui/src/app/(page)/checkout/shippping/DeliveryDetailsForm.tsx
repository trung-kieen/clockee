"use client";
import { CurrentUserDetails, UserControllerService } from "@/gen";
import ErrorText from "@/app/components/typography/ErrorText";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DeliverDetailsType, useCart } from "@/lib/hooks/useCart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeliveryDetailsForm = () => {
  const { deliveryDetails, setDeliveryDetails, selectedItems } = useCart();
  const router = useRouter();

  const fetchDeliveryDetails = async () => {
    setDeliveryDetails(await UserControllerService.currentUserDetail());
  };
  // Get user information as default delivery information
  useEffect(() => {
    if (selectedItems.length === 0) {
      toast.error("Vui lòng chọn sản phẩm để thanh toán");
      router.push("/cart");
    }
    if (!deliveryDetails.name && !deliveryDetails.phone) {
      fetchDeliveryDetails();
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeliverDetailsType>({
    defaultValues: deliveryDetails,
  });
  const onSubmit: SubmitHandler<DeliverDetailsType> = async (data) => {
    setDeliveryDetails({
      ...data,
      name: deliveryDetails?.name,
    });
    router.push("/checkout/confirm");
  };
  return (
    <form
      className="container max-w-md"
      // className="flex items-center justify-center flex-col w-full bg-zinc-50"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <label className="fieldset-label">Địa chỉ</label>
        <input
          autoFocus
          placeholder="Địa chỉ"
          className="input validator w-full"
          {...register("address", { required: "Địa chỉ không được trống" })}
        />

        <label className="fieldset-label">Số điện thoại</label>
        <input
          className="input validator w-full"
          placeholder="Số điện thoại"
          {...register("phone", {
            required: "Số điện thoại không được trống",
            pattern: {
              value: /^[0-9]+$/,
              message: "Số điện thoại phải là số",
            },
          })}
        />

        {/* Validation error message */}
        <div className="flex items-center gap-2">
          <div className="validator-hint">
            {errors.address && <ErrorText>{errors.address.message}</ErrorText>}
            {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
            {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
          </div>
        </div>
        {/* Save & cancel button  */}
        <div className="flex justify-end mt-5">
          <button
            type="submit"
            className="text-white px-4 py-2 rounded bg-primary shadow"
          >
            Tiếp tục →
          </button>
        </div>
      </fieldset>
    </form>
  );
};
export default DeliveryDetailsForm;
