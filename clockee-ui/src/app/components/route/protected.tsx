"use client";
import { useAuth } from "@/lib/hooks/use-auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import { LoadingScreen } from "../common/loading";
import { RoleName } from "@/gen/backend";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("login" + "?redirect=" + pathname);
    } else {
      setLoading(false);
    }
    setLoading(false);
  }, []);

  if (loading) return <LoadingScreen />;

  return isAuthenticated ? <>{children}</> : <></>;
};

interface RoleRouteProps {
  children: ReactNode;
  role: RoleName;
}

export const RoleRoute = ({ children, role }: RoleRouteProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const { getRoles } = useAuth();
  const storedRole = getRoles();
  useEffect(() => {
    if (!storedRole.includes(role)) {
      router.push("/forbidden");
    } else {
      setLoading(false);
    }
    setLoading(false);
  }, []);

  if (loading) return <LoadingScreen />;

  return storedRole.includes(role) ? <>{children}</> : <></>;
};

// Example usage:

interface CustomerRouteProps {
  children: ReactNode;
}

export const CustomerRoute = ({ children }: CustomerRouteProps) => {
  return <RoleRoute role={RoleName.CUSTOMER}>{children}</RoleRoute>;
};

interface AdminRouteProps {
  children: ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  return <RoleRoute role={RoleName.PRODUCT_ADMIN}>{children}</RoleRoute>;
};

interface ManagerRouteProps {
  children: ReactNode;
}

export const ManagerRoute = ({ children }: ManagerRouteProps) => {
  return <RoleRoute role={RoleName.INVENTORY_MANAGER}>{children}</RoleRoute>;
};
