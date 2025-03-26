import { AdminSideBar } from "@/app/components/admin/SideBar";
import { MainHeader } from "@/app/components/header/MainHeader";
import SimpleHeader from "@/app/components/header/SimpleHeader";
import React, { ReactNode } from "react";
const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>

      {/* Use grid to layout dashboard sidebar, 200px fix for dashboard and the left for content */}
      <div className="min-h-screen grid grid-rows-[20px,_1fr]">
        <div>{
          /* TODO: Admin header for logout */
        }</div>
      <div className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
        <div className="rounded-lg shadow ">
          <AdminSideBar />
        </div>
        <div className="bg-white rounded-lg pb-4 shadow ">{children}</div>
      </div>
      </div>
    </>
  );
};

export default AdminLayout;
