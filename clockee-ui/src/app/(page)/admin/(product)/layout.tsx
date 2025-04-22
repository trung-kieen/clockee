import { AdminRoute } from "@/app/components/route/protected";
import { ReactNode } from "react";

const AdminProductLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AdminRoute>{children}</AdminRoute>
    </>
  );
};

export default AdminProductLayout;
