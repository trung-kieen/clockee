"use client";

import { ProtectedRoute } from "@/app/components/route/protected";
import { useCart } from "@/lib/hooks/use-cart";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { selectedItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (selectedItems.length === 0) {
      toast.error("Vui lòng chọn sản phẩm để thanh toán");
      router.push("/cart");
    }
  }, []);

  return <ProtectedRoute>{children}</ProtectedRoute>;
}
