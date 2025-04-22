"use client";
import Link from "next/link";
import { Shield, ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/lib/hooks/use-auth";
import Logo from "../common/logo";
import { SearchBar } from "./search-bar";
import { USERNAME_COOKIE_KEY } from "@/config/app-config";
import { useCart } from "@/lib/hooks/use-cart";
import { useLocalStorage } from "usehooks-ts";
import { filterLinks } from "@/config/filter-links";
import { userMenuItems } from "@/config/user-menu-items";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const MainHeader = ({ searchBar = true, filter = true }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const [username] = useLocalStorage<string>(USERNAME_COOKIE_KEY, "");
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle hydration failed
  if (!mounted) return null;

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md skeleton">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {/*  Logo */}
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>

        {
          // Quick filter product by gender, branch, ...
          filter && (
            <div className="flex justify-around mt-3  px-10 space-x-10 text-gray-700 font-medium ">
              {filterLinks.map(({ label, href }) => (
                <Link key={href} href={href} className="hover:text-yellow-500">
                  {label}
                </Link>
              ))}
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

        {isAuthenticated || username ? (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn border-none bg-white"
              >
                <User className="text-gray-700 hover:text-black" />
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {isAdmin() && (
                  <li
                    onClick={() => {
                      router.push("/admin");
                    }}
                    className="hover:bg-gray-100 cursor-pointer p-2 text-gray-700 flex items-start gap-2 w-full"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <Shield size={18} />
                      Quản lý
                    </div>
                  </li>
                )}
                {userMenuItems.map(({ label, href, icon: Icon }) => (
                  <li
                    onClick={() => {
                      router.push(href);
                    }}
                    key={href}
                    className="hover:bg-gray-100 cursor-pointer p-2 text-gray-700 flex items-start gap-2 w-full"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <Icon size={18} />
                      {label}
                    </div>
                  </li>
                ))}
              </ul>
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
