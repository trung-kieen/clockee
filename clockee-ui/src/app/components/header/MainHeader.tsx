"use client";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import Brand from "../Brand";
import { SearchBar } from "./SearchBar";
import { useCart } from "@/lib/hooks/useCart";
import { USERNAME_COOKIE_KEY } from "@/utils/config";

export const MainHeader = ({ searchBar = true, filter = true }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const userName = localStorage.getItem(USERNAME_COOKIE_KEY);

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

        {isAuthenticated || userName ? (
          <>
            <div>
              <details className="dropdown dropdown-end">
                <summary className="btn border-none bg-white">
                  <User className="text-gray-700 hover:text-black" />
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li className="hover:bg-gray-100 cursor-pointer p-2 text-gray-700">
                    <Link href={"/me"}>Tài khoản của tôi</Link>
                  </li>
                  {isAdmin() && (
                    <li className="hover:bg-gray-100 cursor-pointer p-2 text-gray-700">
                      <Link href={"/admin"}>Quản lý</Link>
                    </li>
                  )}
                  <li className="hover:bg-gray-100 cursor-pointer p-2 text-gray-700">
                    <Link href={"/me/change-password"}>Đổi mật khẩu</Link>
                  </li>
                  <li className="hover:bg-gray-100 cursor-pointer p-2 text-gray-700">
                    <Link href={"/logout"}>Đăng xuất</Link>
                  </li>
                </ul>
              </details>
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
