import Link from "next/link";
export default function Header_home() {
  return (
    <header className="bg-white pt-6 w-full max-w-6xl flex justify-between items-center ">
      <div className="container mx-auto flex items-center justify-between ">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href={'/'}>
            <img className='mt-[-20px]' src="/logo_header.png" alt="logo login" /> 
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-yellow-500">THƯƠNG HIỆU</a>
          <a href="#" className="hover:text-yellow-500">NAM</a>
          <a href="#" className="hover:text-yellow-500">NỮ</a>
          <a href="#" className="hover:text-yellow-500">LIÊN HỆ</a>
        </nav>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-200 px-3 py-2 rounded-md w-64">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            className="bg-transparent focus:outline-none flex-grow text-sm"
          />
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10A7 7 0 1 1 3 10a7 7 0 0 1 14 0z"></path>
          </svg>
        </div>

        {/* Cart & Auth Buttons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-yellow-500">
            🛒
          </button>
          <Link className="text-gray-700 hover:text-yellow-500" href='/login'>Đăng nhập</Link>
          <Link className="text-gray-700 hover:text-yellow-500" href='/signup'>Đăng ký</Link>
        </div>
      </div>
    </header>
  );
}