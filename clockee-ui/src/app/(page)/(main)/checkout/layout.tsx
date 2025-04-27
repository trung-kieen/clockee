"use client";

import { ProtectedRoute } from "@/app/components/route/protected";
import { useAuth } from "@/lib/hooks/use-auth";
import { useCart } from "@/lib/hooks/use-cart";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { selectedItems } = useCart();
  const router = useRouter();

  const { user } = useAuth();
  useEffect(() => {
    const refuteUserNotVerfied = () => {
      if (user === null || !user.verified) {
        toast.warn("Bạn cần xác thực email để thực hiện đặt hàng");
        redirect("/me");
      }
    };
    refuteUserNotVerfied();
  }, [user]);

  useEffect(() => {
    if (selectedItems.length === 0) {
      toast.error("Vui lòng chọn sản phẩm để thanh toán");
      router.push("/cart");
    }
  }, []);

  return <ProtectedRoute>{children}</ProtectedRoute>;
}
