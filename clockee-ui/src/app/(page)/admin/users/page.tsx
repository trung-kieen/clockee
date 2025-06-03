"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import AdminMainCard from "@/app/components/card/admin-card";
import DataTable from "@/app/components/common/data-table";
import UserTableRow from "./components/user-table-row";
import {
  AdminUserControllerService,
  PageResponseUserDetailResponse,
  UserDetailResponse,
} from "@/gen";
import { usePageSearch } from "@/lib/hooks/use-page-search";
import PageController from "@/app/components/common/page-controller";

export default function UserAdminPage() {
  const [userRoles, setUserRoles] = useState<Record<number, string>>({});
  const fetchUsers = async () => {
    try {
      const resp = await AdminUserControllerService.getAllUsers(
        page - 1,
        undefined,
      );
      if (pageInfo) setPageInfo(resp);

      const users = resp.content || [];

      // Gọi song song lấy role cho từng user
      const roleResults = await Promise.all(
        users.map(async (user) => {
          try {
            const roles = await AdminUserControllerService.getRoleById(
              user.userId!,
            );
            return {
              userId: user.userId,
              role:
                roles.map((r) => r.roleName).join(", ") || "Không có vai trò",
            };
          } catch {
            return { userId: user.userId, role: "Lỗi khi lấy vai trò" };
          }
        }),
      );

      // Convert mảng thành object map userId -> roleName
      const roleMap: Record<number, string> = {};
      roleResults.forEach(({ userId, role }) => {
        roleMap[userId!] = role;
      });
      setUserRoles(roleMap);
      return resp;
    } catch (err) {
      console.warn(err);
    }
  };

  const { pageInfo, setPage, query, setQuery, setPageInfo, page } =
    usePageSearch<PageResponseUserDetailResponse>({
      fetchData: fetchUsers,
    });

  return (
    <AdminMainCard title="Danh sách người dùng" goBack={false}>
      <div className="flex flex-col gap-2 items-center">
        {/*
         * Search filter
         */}
        <div className="relative flex items-center w-1/3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            // value={query}
            // onChange={(event) => setQuery(event?.target.value)}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Tìm kiếm"
          />
        </div>

        {/*
         * Display list of brand
         */}
        <DataTable<UserDetailResponse>
          data={pageInfo.content || []}
          emptyMessage="Không tìm thấy sản phẩm nào"
          headers={[
            "Hình Ảnh",
            "Tên người dùng",
            "Email",
            "Vai trò",
            "Trạng thái",
          ]}
          renderRow={(item, index) => (
            <UserTableRow
              key={item.userId}
              item={item}
              roleName={userRoles[item.userId!]}
              refreshCallBack={fetchUsers}
            />
          )}
        />

        {/*
         * Pagination controller
         */}
        {/* <PageController setPage={setPage} page={pageInfo} /> */}
        <PageController
          setPage={(page: number) => {
            setPage(page);
          }}
          page={pageInfo}
        />
      </div>
    </AdminMainCard>
  );
}
