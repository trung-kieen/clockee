"use client";
import Link from "next/link"
import Brand from "../brand"
import { ShoppingCart, User } from "lucide-react"
import { useAuth } from "@/lib/hooks/useAuth"

const SearchBar = () => {
  return (
    <div className="w-full max-w-sm min-w-[200px]">
      <div className="relative flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
          <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
        </svg>

        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Tìm kiếm sản phẩm"
        />
      </div>
    </div>
  )
}





export const MainHeader = ({ searchBar = true, filter = true }) => {
  const { isLogin } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Link href={"/"}>
            <Brand />
          </Link>

        </div>


        {
          // Quick filter product by gender, branch, ...
          filter && (
            <div className="flex justify-around mt-3  px-10 space-x-10 text-gray-700 font-medium ">
              {/* replace with Link */}
              <a href="#" className="hover:text-yellow-500">THƯƠNG HIỆU</a>
              <a href="#" className="hover:text-yellow-500">NAM</a>
              <a href="#" className="hover:text-yellow-500">NỮ</a>
              <a href="#" className="hover:text-yellow-500">LIÊN HỆ</a>
            </div>
          )}
      </div>
      {searchBar && <SearchBar />}
      <div className="flex items-center space-x-10 pr-5">
        {
          isLogin() && (

            <Link href={"/orders/"}>
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-black" />
            </Link>
          )
        }

        {
          // Display right coner button base on authenticate status
          (isLogin()) ? (
            <User className="w-6 h-6 text-gray-700 hover:text-black" />
          ) : (
            <>

              <Link className="text-gray-700 hover:text-yellow-500" href='/login'>Đăng nhập</Link>
              <Link className="text-gray-700 hover:text-yellow-500" href='/signup'>Đăng ký</Link>
            </>
          )

        }
      </div>

    </nav>
  )
}
