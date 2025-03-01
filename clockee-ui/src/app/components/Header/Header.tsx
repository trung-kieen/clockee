'use client';
import { ShoppingCart, User } from "lucide-react"
import Brand from "../Brand"
import { usePathname } from 'next/navigation'


const NavLinks = () => {

  return (
    <div className="flex space-x-6 text-gray-700 font-medium">
      {/* replace with Link */}
      <a href="#" className="hover:text-black">THƯƠNG HIỆU</a>
      <a href="#" className="hover:text-black">NAM</a>
      <a href="#" className="hover:text-black">NỮ</a>
      <a href="#" className="hover:text-black">LIÊN HỆ</a>
    </div>
  )
}
const SearchBar = () => {
  return <input placeholder="Tìm kiếm sản phẩm" className="w-64 pr-10" />
}


const RightNavIcons = () => {
  return (
    <div className="flex items-center space-x-4">
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
    <div className="bg-white-800 text-white w-full  ">
      <NavBar />
    </div>
  )
}
