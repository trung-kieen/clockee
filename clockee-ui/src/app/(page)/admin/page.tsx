"use client";
import { LoadingScreen } from "@/app/components/common/loading"; // this is
import { RoleName } from "@/gen/backend";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
const AdminPage = () => {
  const { getRoles } = useAuth();
  const router = useRouter();

  const redirectDefaultPage = () => {
    const roles = getRoles();
    if (roles.includes(RoleName.PRODUCT_ADMIN) || roles.includes("ROLE_" + RoleName.PRODUCT_ADMIN)) {
      router.push("admin/dashboard");
    } else if (roles.includes(RoleName.INVENTORY_MANAGER) || roles.includes("ROLE_" + RoleName.INVENTORY_MANAGER)) {
      router.push("admin/suppliers");
    } else {
      router.push("forbidden");
    }
  };
  useEffect(() => {
    redirectDefaultPage();
  }, []);
  return <LoadingScreen />;
};

export default AdminPage;
