import { AdminSideBar } from "@/app/components/sidebar/AdminSideBar";
import React, { ReactNode } from "react";
const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Use grid to layout dashboard sidebar, 200px fix for dashboard and the left for content */}
      <div className="min-h-screen grid grid-rows-[20px,_1fr] bg-gray-100">
        <div>{/* TODO: Admin header for logout */}</div>
        <div className="grid gap-5  grid-cols-[220px,_1fr]">
          <div className="bg-gray-50">
            <AdminSideBar />
          </div>
          <div className="bg-white ">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
