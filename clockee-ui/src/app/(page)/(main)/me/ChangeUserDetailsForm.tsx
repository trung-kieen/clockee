"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ErrorText from "@/app/components/typography/ErrorText";
import { UpdateUserDetailsRequest, UserControllerService } from "@/gen";
import { mapApiErrorsToForm } from "@/utils/form";
const ChangeUserDetailsForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserDetailsRequest>({
    defaultValues: async () => {
      const current = await UserControllerService.currentUserDetails();
      return current as UpdateUserDetailsRequest;
    },
  });

  const onSubmit: SubmitHandler<UpdateUserDetailsRequest> = async (data) => {
    try {
      await UserControllerService.updateUserDetails({
        name: data.name,
        phone: data.phone,
        address: data.address,
      });
      toast.success("Cập nhập thành công");
    } catch (error) {
      mapApiErrorsToForm(error, setError);
      toast.error("Có lỗi xảy ra");
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Họ tên:
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Họ tên không được để trống" })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700"
        >
          Địa chỉ:
        </label>
        <input
          type="text"
          id="address"
          {...register("address", { required: "Địa chỉ không được trống" })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Số điện thoại:
        </label>
        <input
          type="tel"
          id="phone"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("phone", {
            required: "Số điện thoại không được trống",
            maxLength: {
              value: 11,
              message: "Số điện thoại chỉ được tối đa 11 ký tự",
            },
            pattern: {
              value: /^[0-9]+$/,
              message: "Số điện thoại phải là số",
            },
          })}
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="validator-hint">
          {errors.address && <ErrorText>{errors.address.message}</ErrorText>}
          {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
        </div>
      </div>
      <button
        type="submit"
        className="w-full  bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors duration-200"
      >
        Cập nhật thông tin
      </button>
    </form>
  );
};
export default ChangeUserDetailsForm;
