import { ManagerRoute } from "@/app/components/route/protected";
import { ReactNode } from "react";

const InventoryManagerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ManagerRoute>{children}</ManagerRoute>
    </>
  );
};

export default InventoryManagerLayout;
