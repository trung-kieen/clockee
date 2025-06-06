"use client";
import Link from "next/link";
import { AdminUserControllerService, UserDetailResponse } from "@/gen";

type UserRowProps = {
  item: UserDetailResponse;
  refreshCallBack: () => void;
  roleName?: string;
};

const UserTableRow = ({ item, refreshCallBack, roleName }: UserRowProps) => {
  const handleUpdate = async () => {
    if (!item.userId) return;
    try {
      await AdminUserControllerService.updateUserdeletedStatus(
        item.userId,
        !item.isDeleted,
      );
      refreshCallBack(); // Reload lại bảng user sau khi update
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái user:", err);
    }
  };
  const canToggleAccount = (role?: string) => role === "CUSTOMER";
  return (
    <tr >
      <td>
        <i className="fa fa-user"></i>
      </td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{roleName || "Đang tải"}</td>
      <td>
        {item.isDeleted ? "Đang khóa" : "Đang mở"}
      </td>
      <td>
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
      <td>
        <Link href={`/admin/users/${item.userId}/roles`}>
          {/* Action edit */}
          <i className="fa fa-external-link-alt  cursor-pointer"></i>
        </Link>
      </td>
    </tr>
  );
};
export default UserTableRow;
