"use client";
import { LoadingScreen } from "@/app/components/common/loading";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
const LogoutPage = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      logout();
      toast("Đăng xuất thành công");
    }
    router.push("/login");
  }, []);
  return <LoadingScreen />;
};

export default LogoutPage;
