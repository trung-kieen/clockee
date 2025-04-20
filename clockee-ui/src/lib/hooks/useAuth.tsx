"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthManager } from "../auth/AuthManager";
import { AuthControllerService, JwtTokenResponse } from "@/gen";
import { ROLES_COOKIE_KEY, USERNAME_COOKIE_KEY } from "@/utils/config";
import { logger } from "@/utils/logger";
import { getRefreshToken } from "../httpClient";

type UserDetails = Omit<JwtTokenResponse, "accessToken" | "refreshToken">;
type AuthContextType = {
  user: UserDetails | null;
  token: string | null;
  isAuthenticated: boolean;
  saveUserDetails: (authDetails: JwtTokenResponse) => void;
  isAdmin: () => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState(AuthManager.getAccessToken());
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    // Callback for notify change token in AuthManager
    const handleTokenChange = (newToken: string) => {
      setAccessToken(newToken);
    };

    AuthManager.addListener(handleTokenChange);
    setAccessToken(AuthManager.getAccessToken());

    return () => {
      // Destroy listener when component is umnount
      AuthManager.removeListener(handleTokenChange);
    };
  }, []);

  useEffect(() => {
    _refreshAuth();
  }, []);

  const _updateToken = (token: string) => {
    setAccessToken(token);
    AuthManager.setAccessToken(token);
  };

  const saveUserDetails = (authDetails: JwtTokenResponse) => {
    _updateToken(authDetails.accessToken || "");
    setUser(authDetails || null);
    setIsAuthenticated(true);

    // Save username as flag islogin if user refresh browser
    localStorage.setItem(USERNAME_COOKIE_KEY, authDetails.username || "");
    localStorage.setItem(ROLES_COOKIE_KEY, JSON.stringify(authDetails.roles));
  };

  const logout = async () => {
    try {
      AuthControllerService.logoutUser();
    } catch (error) {
      logger.error(error);
    }
    _removeUserDetails();
  };
  const _removeUserDetails = () => {
    _clearToken();
    setUser(null);
    setIsAuthenticated(false);
    global?.localStorage?.removeItem(USERNAME_COOKIE_KEY);
    global?.localStorage?.removeItem(ROLES_COOKIE_KEY);
  };

  const _clearToken = () => {
    setAccessToken(null);
    AuthManager.clearAccessToken();
  };

  const isAdmin = () => {
    const roles: Array<string> =
      user?.roles ??
      (() => {
        try {
          const stored = global?.localStorage?.getItem(ROLES_COOKIE_KEY);
          return stored ? JSON.parse(stored) : [];
        } catch {
          return [];
        }
      })();

    return (
      roles.includes("PRODUCT_ADMIN") || roles.includes("INVENTORY_MANAGER")
    );
  };
  const _refreshAuth = async () => {
    try {
      const resp = await getRefreshToken();
      _updateToken(resp.data.accessToken || "");
    } catch {
      _removeUserDetails();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: accessToken,
        isAuthenticated,
        user,
        saveUserDetails,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
