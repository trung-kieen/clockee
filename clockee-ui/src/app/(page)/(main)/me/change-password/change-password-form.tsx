"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ErrorText from "@/app/components/typography/error-text";
import { ChangePasswordRequest, UserControllerService } from "@/gen";
import { mapApiErrorsToForm } from "@/util/form";
const ChangePasswordForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordRequest>();

  const onSubmit: SubmitHandler<ChangePasswordRequest> = async (data) => {
    try {
      await UserControllerService.changePassword(data);
      toast.success("Cập nhập thành công");
    } catch (error) {
      mapApiErrorsToForm(error, setError);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Mật khẩu cũ:
        </label>
        <input
          type="password"
          id="name"
          autoFocus
          {...register("oldPassword", {
            required: "Mật khẩu cũ không được để trống",
          })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700"
        >
          Mật khẩu mới:
        </label>
        <input
          type="password"
          {...register("newPassword", {
            required: "Mật khẩu mới không được để trống",
          })}
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
          type="password"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("newPasswordConfirmation", {
            validate: (val: string | undefined) => {
              if (watch("newPassword") != val) {
                return "Your passwords do no match";
              }
            },
          })}
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="validator-hint">
          {errors.oldPassword && (
            <ErrorText>{errors.oldPassword.message}</ErrorText>
          )}
          {errors.newPassword && (
            <ErrorText>{errors.newPassword.message}</ErrorText>
          )}
          {errors.newPasswordConfirmation && (
            <ErrorText>{errors.newPasswordConfirmation.message}</ErrorText>
          )}
          {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
        </div>
      </div>
      <button
        type="submit"
        className="w-full  bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors duration-200"
      >
        Đối mật khẩu
      </button>
    </form>
  );
};
export default ChangePasswordForm;
