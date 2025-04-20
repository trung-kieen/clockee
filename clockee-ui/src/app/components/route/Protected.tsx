"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { redirectAuthenticateAndGoBack } from "@/utils/route";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      redirectAuthenticateAndGoBack();
      router.push("/login");
    }
  }, [router, isAuthenticated]);

  return <>{children}</>;
}
