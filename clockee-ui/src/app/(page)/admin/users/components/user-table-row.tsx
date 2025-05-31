"use client";
import Link from "next/link";
import { AdminUserControllerService, UserDetailResponse } from "@/gen";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type UserRowProps = {
  item: UserDetailResponse;
  refreshCallBack: () => void;
  roleName?: string;
};



const UserTableRow = ({ item, refreshCallBack, roleName}: UserRowProps) => {
  const handleUpdate = async () => {
      if (!item.userId) return;
      try {
        await AdminUserControllerService.updateUserdeletedStatus(
        item.userId,
        !(item.isDeleted)
        );
      refreshCallBack(); // Reload lại bảng user sau khi update
      } catch (err) {
        console.error("Lỗi cập nhật trạng thái user:", err);
      };
  };
  const tdStyle = "border-2 border-t-0 border-b-4 border-gray-200 px-4 py-3";
  const canToggleAccount = (role?: string) => role === "CUSTOMER";
  return (
    <tr className="whitespace-nowrap text-xl text-center">
      <td className={`${tdStyle}`}><i className="fa fa-user"></i></td>
      <td className={`${tdStyle}`}>{item.name}</td>
      <td className={`${tdStyle}`}>{item.email}</td>
      <td className={`${tdStyle}`}>{roleName || "Đang tải"}</td>
      <td className={`${tdStyle}`}>{item.isDeleted  ? "Đang khóa" : "Đang mở"}</td>
      <td className={`hover:bg-gray-200 ${tdStyle}`}>
        {canToggleAccount(roleName) ? (
          <i
            className={`fa cursor-pointer ${item.isDeleted ? "fa-unlock" : "fa-lock"}`}
            title={item.isDeleted ? "Mở khóa" : "Khóa"}
            onClick={handleUpdate}
          ></i>
        ) : (
          <i
            className="fa fa-lock cursor-not-allowed text-gray-400"
            title="Không khả dụng"
          ></i>
        )}
      </td>
  
      {/* Nút xem thông tin chi tiết của người dùng */}
      <td className= {`hover:bg-gray-200 ${tdStyle} border-r-4`}>
        <Link href={`/admin/users/${item.userId}`}>
          {/* Action edit */}
          <i className="fa fa-external-link-alt  cursor-pointer"></i>
        </Link>
      </td>
    </tr>
  );
};
export default UserTableRow;
