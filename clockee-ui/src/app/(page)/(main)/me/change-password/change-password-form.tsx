"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ErrorText from "@/app/components/typography/error-text";
import { ChangePasswordRequest, UserControllerService } from "@/gen";
import { mapApiErrorsToForm } from "@/util/form";
import { Eye, EyeOff } from "lucide-react";

const ChangePasswordForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<ChangePasswordRequest>();

  const oldPassword = watch("oldPassword");
  const newPassword = watch("newPassword");
  const newPasswordConfirmation = watch("newPasswordConfirmation");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(prev => !prev);
  };

  const onSubmit: SubmitHandler<ChangePasswordRequest> = async (data) => {
    try {
      await UserControllerService.changePassword(data);
      toast.success("Cập nhật mật khẩu thành công");
    } catch (error) {
      mapApiErrorsToForm(error, setError);
    }
  };

  // Kiểm tra điều kiện và chỉ trả về lỗi đầu tiên
  const getPasswordError = (val?: string): string | undefined => {
    if (!val) return;
    if (val === oldPassword) return "Không được trùng với mật khẩu cũ";
    if (val.length < 6) return "Mật khẩu phải ít nhất 6 ký tự";
    if (!/[A-Z]/.test(val)) return "Mật khẩu phải có chữ in hoa";
    if (!/[0-9]/.test(val)) return "Mật khẩu phải có số";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(val)) return "Mật khẩu phải có ký tự đặc biệt";
    return;
  };

  const passwordError = getPasswordError(newPassword);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Mật khẩu cũ */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Mật khẩu cũ:</label>
        <div className="relative">
          <input
            type={showOld ? "text" : "password"}
            {...register("oldPassword", {
              required: "Mật khẩu cũ không được để trống",
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
            onClick={() => toggle(setShowOld)}
          >
            {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        {errors.oldPassword && (
          <ErrorText>{errors.oldPassword.message}</ErrorText>
        )}
      </div>

      {/* Mật khẩu mới */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Mật khẩu mới:</label>
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            {...register("newPassword", {
              required: "Mật khẩu mới không được để trống",
              validate: () => passwordError ?? true,
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
            onClick={() => toggle(setShowNew)}
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        {touchedFields.newPassword && passwordError && (
          <ErrorText>{passwordError}</ErrorText>
        )}
      </div>

      {/* Xác nhận mật khẩu */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu mới:</label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            {...register("newPasswordConfirmation", {
              validate: (val) =>
                val === newPassword || "Mật khẩu xác nhận không khớp",
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
            onClick={() => toggle(setShowConfirm)}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        {errors.newPasswordConfirmation && (
          <ErrorText>{errors.newPasswordConfirmation.message}</ErrorText>
        )}
      </div>

      {/* Nút submit */}
      <button
        type="submit"
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors duration-200"
      >
        Đổi mật khẩu
      </button>
    </form>
  );
};

export default ChangePasswordForm;
