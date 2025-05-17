"use client";
import ConfirmModal from "@/app/components/modal/confirm-modal";
import { AdminProductResponse } from "@/gen/models/AdminProductResponse";
import { AdminProductControllerService } from "@/gen/services/AdminProductControllerService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AdminUserResponse, updateMockUserById } from "../mockUsers";

type UserRowProps = {
  item: AdminUserResponse;
  refreshCallBack: () => void;
  setUsers: React.Dispatch<React.SetStateAction<AdminUserResponse[]>>;
};

const UserRole  = {
  1: 'CUSTOMER',
  2: 'PRODUCT_ADMIN',
  3: 'INVENTORY_MANAGER'
}

const UserTableRow = ({ item, refreshCallBack, setUsers }: UserRowProps) => {
  // 
  const handleUpdate = () => {
    // Xử lý việc update trạng thái tài khoản của người dùng
    setUsers((prevUsers) => 
      updateMockUserById(prevUsers, item.userId, {
        is_delete: item.is_delete == 1 ? 0 : 1,
    }));
    toast("Thay đổi trạng thái thành công!");
    refreshCallBack();
  };

  useEffect(() => {
  console.log("Rendering row for:", item.name, "is_delete:", item.is_delete);
}, [item]);

  const tdStyle = "border-2 border-t-0 border-b-4 border-gray-200 px-4 py-3";

  return (
    <tr className="whitespace-nowrap text-xl text-center">
      <td className={`${tdStyle}`}><i className="fa fa-user"></i></td>
      <td className={`${tdStyle}`}>{item.name}</td>
      <td className={`${tdStyle}`}>{item.email}</td>
      <td className={`${tdStyle}`}>{UserRole[item.role as keyof typeof UserRole] ?? "Không xác định"}</td>
      <td className={`${tdStyle}`}>{item.is_delete > 0 ? "Đang khóa" : "Đang mở"}</td>
      {/* Nếu là Admin thì khóa hẳn nút mở/khóa */}
      {item.role !== 1 && (
        <td className={`hover:bg-gray-200 ${tdStyle}`}>
          <i className={`fa fa-lock cursor-not-allowed text-gray-400`} 
          title= "Không khả dụng"></i>
      </td>
      )}

      {item.role === 1 && (
        <td onClick={handleUpdate} className={`hover:bg-gray-200 ${tdStyle}`}>
          <i className={`fa cursor-pointer ${item.is_delete > 0 ? "fa-unlock" : "fa-lock"}`}
            title={item.is_delete ? "Mở khóa" : "Khóa"}
            
          ></i>
      </td>)}

      
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
