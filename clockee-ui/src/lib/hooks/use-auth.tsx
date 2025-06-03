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
import { ROLES_COOKIE_KEY, USERNAME_COOKIE_KEY } from "@/config/app-config";
import { logger } from "@/util/logger";
import { useLocalStorage } from "usehooks-ts";
import { getRefreshToken } from "../http-client";

type UserDetails = Omit<JwtTokenResponse, "accessToken" | "refreshToken">;
type AuthContextType = {
  user: UserDetails | null;
  token: string | null;
  isAuthenticated: boolean;
  saveUserDetails: (authDetails: JwtTokenResponse) => void;
  isAdmin: () => boolean;
  logout: () => void;
  getRoles: () => Array<string>;
};

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState(AuthManager.getAccessToken());
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [, setUsername, removeUsername] = useLocalStorage(
    USERNAME_COOKIE_KEY,
    "",
  );
  const [roles, setRoles, removeRoles] = useLocalStorage<string[]>(
    ROLES_COOKIE_KEY,
    [],
  );
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
    setUsername(authDetails.username || "");
    setRoles(authDetails.roles || []);
  };

  const logout = async () => {
    try {
      await AuthControllerService.logoutUser();

      removeRoles();
      removeUsername();
    } catch (error) {
      logger.error(error);
    }
    _removeUserDetails();
  };
  const _removeUserDetails = () => {
    _clearToken();
    setUser(null);
    setIsAuthenticated(false);
    removeRoles();
    removeUsername();
  };

  const _clearToken = () => {
    setAccessToken(null);
    AuthManager.clearAccessToken();
  };

  const getRoles = (): Array<string> => {
    return user?.roles ?? roles;
  };
  const isAdmin = () => {
    return (
      roles.includes("ROLE_PRODUCT_ADMIN") ||
      roles.includes("ROLE_INVENTORY_MANAGER") ||
      roles.includes("PRODUCT_ADMIN") ||
      roles.includes("INVENTORY_MANAGER")
    );
  };
  const _refreshAuth = async () => {
    try {
      const resp = await getRefreshToken();
      if (resp.data.accessToken) {
        _updateToken(resp.data.accessToken);
        setIsAuthenticated(true);
      }
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
        getRoles,
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
