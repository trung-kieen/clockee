'use client'
import { AuthControllerService, LoginRequest } from "@/gen";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
export default function LoginPage() {
  const [email, setEmail] = useState("nguyenvana123@gmail.com")
  const [password, setPassword] = useState("vana123@gmail")
  const [showPassword, setShowPassword] = useState(false)

  // Kiểm tra điều kiện email
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // Kiểm tra điều kiện mật khẩu
  const isPasswordValid = password.length >= 6;
  const isFormValid = isPasswordValid && isValidEmail(email);
  const router = useRouter();



  async function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const loginReq: LoginRequest = {
      email: email,
      password: password,
    }
    try {
      const res = await AuthControllerService.login(loginReq);
      console.log(res)
    } catch (e) {
      console.error(e);
    }
    // authService.login(email, password);
  }


  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      {/* Header */}
      {/* Main Content */}
      <div className="bg-[#FFDA3E] w-full h-[604px] flex justify-center items-center ">
        <main className="w-full max-w-5xl  flex flex-col  md:flex-row items-center bg-[#FFDA3E]">
          {/* Banner */}
          <div className="flex-1 p-5">
            <img src="/body.png" className="w-full rounded-lg " />
          </div>
          {/* Form Login */}
          <div className="w-full md:w-[400px] bg-white p-8 rounded-lg shadow-lg border border-yellow-300">
            {/* Banner trên cùng */}
            <div className="flex justify-between items-center bg-White p-1 rounded-md">
              <h2 className="text-xl font-bold text-black">Đăng nhập</h2>
              <img src="/hight_brand.png" alt="" />
            </div>

            {/* Form đăng nhập */}
            <form action="" onSubmit={handleSubmit}>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full border border-yellow-400 bg-transparent text-gray-700 p-2 mt-7 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {email && !isValidEmail(email) && <p className="absolute text-red-500 mt-1 text-sm ml-1">Email không hợp lệ!</p>}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  className="w-full border border-yellow-400 bg-transparent text-gray-700 p-2 mt-7 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute top-3 inset-y-0 right-3 top-6 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {password && !isPasswordValid && <p className="absolute text-red-500 mt-1 ml-1 text-sm">Mật khẩu phải có ít nhất 6 ký tự!</p>}
              </div>
              <button
                className={`w-full bg-yellow-400 text-white p-3 rounded mt-7 font-semibold shadow-md ${isFormValid ? "bg-yellow-400 hover:opacity-75" : "bg-yellow-230 cursor-not-allowed "}`}
                disabled={!email.trim()}
              >
                Tiếp theo
              </button>
            </form>
            {/* Link quên mật khẩu & đăng ký */}
            <div className="flex justify-between text-sm text-gray-600 mt-6 border-t border-gray-300 pt-2">
              <Link href={"/login/reset"} className="cursor-pointer hover:text-yellow-600">Quên mật khẩu</Link>
              <Link href={"/signup"} className="text-yellow-700 cursor-pointer hover:text-yellow-900">Đăng ký</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
