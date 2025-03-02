import Link from "next/link";

 export default function Header_signup(){
  return(
    <header className="w-full bg-white py-3 px-6 flex justify-between items-center ">
      <div className="flex items-center text-xl font-bold text-orange-500">
        <Link href={'/'}>
          <img className='mr-[-9px] mt-[-5px]' src="/logo_header.png" alt="logo login" /> 
        </Link>
        <span className="ml-2 text-gray-600 mt-4">Đăng nhập</span>
      </div>
      <p className="text-sm text-yellow-500">Bạn cần giúp đỡ?</p>      
    </header>
  )
 }