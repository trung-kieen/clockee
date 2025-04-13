"use client";
import Link from "next/link";
import { LogOutIcon, ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import Brand from "../Brand";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SearchBar } from "./SearchBar";
import { useCart } from "@/lib/hooks/useCart";

export const MainHeader = ({ searchBar = true, filter = true }) => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const { totalItems } = useCart();

  const handleLogout = () => {
    logout();
    toast("Đăng xuất thành công");
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {/*  Logo */}
          <Link href={"/"}>
            <Brand />
          </Link>
        </div>

        {
          // Quick filter product by gender, branch, ...
          filter && (
            <div className="flex justify-around mt-3  px-10 space-x-10 text-gray-700 font-medium ">
              {/* replace with Link */}
              <a href="#" className="hover:text-yellow-500">
                Thương hiệu
              </a>
              <a href="#" className="hover:text-yellow-500">
                Nam
              </a>
              <a href="#" className="hover:text-yellow-500">
                Nữ
              </a>
              <a href="#" className="hover:text-yellow-500">
                Liên hệ
              </a>
            </div>
          )
        }
      </div>
      {searchBar && <SearchBar />}
      <div className="flex items-center space-x-10 pr-5">
        {
          // Display button login, register base in authentication status
          isAuthenticated && (
            <div>
              <div className="indicator">
                <span className="indicator-item badge badge-xs badge-neutral">
                  {totalItems}
                </span>
                <Link href={"/cart/"}>
                  <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-black" />
                </Link>
              </div>
            </div>
          )
        }

        {isAuthenticated ? (
          <>
            <div>
              <Link href={"/me"}>
                <User className="w-6 h-6 text-gray-700 hover:text-black" />
              </Link>
            </div>
            <div>
              <LogOutIcon
                onClick={handleLogout}
                className="w-6 h-6 text-gray-700 hover:text-black"
              />
            </div>
          </>
        ) : (
          <>
            <Link className="text-gray-700 hover:text-yellow-500" href="/login">
              Đăng nhập
            </Link>
            <Link
              className="text-gray-700 hover:text-yellow-500"
              href="/signup"
            >
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
