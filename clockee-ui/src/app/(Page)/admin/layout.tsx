import { AdminSideBar } from "@/app/components/sidebar/AdminSideBar";
import React, { ReactNode } from "react";
const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>

      {/* Use grid to layout dashboard sidebar, 200px fix for dashboard and the left for content */}
      <div className="min-h-screen grid grid-rows-[20px,_1fr]">
        <div>{
          /* TODO: Admin header for logout */
        }</div>
      <div className="grid gap-2  grid-cols-[220px,_1fr]">
        <div className="rounded-lg shadow bg-gray-50">
          <AdminSideBar />
        </div>
        <div className="bg-white rounded-lg shadow ">{children}</div>
      </div>
      </div>
    </>
  );
};

export default AdminLayout;
