'use client';
import { ShoppingCart, User } from "lucide-react"
import Brand from "../Brand"
import { usePathname } from 'next/navigation'


const NavLinks = () => {
  return (
    <div className="flex justify-around px-10 space-x-10 text-gray-700 font-medium">
      {/* replace with Link */}
      <a href="#" className="hover:text-black">THƯƠNG HIỆU</a>
      <a href="#" className="hover:text-black">NAM</a>
      <a href="#" className="hover:text-black">NỮ</a>
      <a href="#" className="hover:text-black">LIÊN HỆ</a>
    </div>
  )
}
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

        {/* Search button
        <button
          className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          type="button"
        >
          Search
        </button>
        */}
      </div>
    </div>
  )
}


const RightNavIcons = () => {
  return (
    <div className="flex items-center space-x-10 pr-5">
      <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-black" />
      <User className="w-6 h-6 text-gray-700 hover:text-black" />
    </div>
  )
}

const NavBar = () => {
  const pathname = usePathname();
  const simpleIconHeaderPages = ["/login", "logout"];
  const showHeaderDetail = !(simpleIconHeaderPages.indexOf(pathname) > -1);
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Brand />
        </div>
        {showHeaderDetail && <NavLinks />}
      </div>
      {showHeaderDetail && <SearchBar />}
      {showHeaderDetail && <RightNavIcons />}
    </nav>
  )
}

export const Header = () => {
  return (
    <div className="bg-white-800 text-white w-full">
      <NavBar />
    </div>
  )
}
