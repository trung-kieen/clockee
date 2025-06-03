"use client";
import { FormEvent, useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import Link from "next/link";
import { AuthControllerService, CreateUserRequest } from "@/gen";
import { useRouter } from "next/navigation";
const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Regex kiểm tra kí tự có dấu
  const hasVietnameseChars = (str: string) => /[À-Ỹà-ỹ]/.test(str);
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^\d{10}$/.test(phone);
  // Kiểm tra điều kiện mật khẩu
  const isPasswordValid = password.length >= 6;
  const isPasswordNoDiacritics = !hasVietnameseChars(password);
  const passwordMatch =
    password && confirmPassword && password == confirmPassword;
  const isFormValid =
    isPasswordValid &&
    isPasswordNoDiacritics &&
    passwordMatch &&
    isValidEmail(email) &&
    fullName.trim() !== "" &&
    isValidPhone(phoneNumber);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const createUserRequest: CreateUserRequest = {
      email: email,
      password: password,
      passwordConfirmation: confirmPassword,
      name: fullName,
    };

    try {
      const res = await AuthControllerService.register(createUserRequest);
      // TODO: redirect to login/success page to notice user confirm email
      console.log(res);
      router.push("/login");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="w-full md:w-[380px] bg-white p-8 rounded-lg shadow-lg border border-yellow-300">
        {/* Tiêu đề */}
        <div className="flex justify-between items-center bg-White rounded-md">
          <h2 className="text-xl font-bold text-black">ĐĂNG KÝ</h2>
        </div>
        {/* Form Đăng ký */}
        <input
          type="text"
          placeholder="Email"
          className="w-full border border-yellow-400 bg-transparent text-gray-700 p-2 mt-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email && !isValidEmail(email) && (
          <p className="text-red-500 mt-2 text-sm">Email không hợp lệ!</p>
        )}
        <input
          type="text"
          placeholder="Họ và tên"
          className="w-full border border-yellow-400 bg-transparent text-gray-700 p-2 mt-3 rounded"
          onChange={(e) => setFullName(e.target.value)}
        />
        {fullName.trim() === "" && (
          <p className="text-red-500 mt-2 text-sm">Vui lòng nhập họ và tên!</p>
        )}
        <input
          type="text"
          placeholder="Số điện thoại"
          className="w-full border border-yellow-400 bg-transparent text-gray-700 p-2 mt-3 rounded"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {phoneNumber && !isValidPhone(phoneNumber) && (
          <p className="text-red-500 mt-2 text-sm">
            Số điện thoại chưa hợp lệ!
          </p>
        )}
        {/*Xử lý mật khẩu nhập*/}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-yellow-400 bg-transparent text-gray-700 p-2 mt-3 rounded"
          />
          <button
            type="button"
            className="absolute top-3 inset-y-0 right-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {isPasswordValid && (
            <CheckCircle
              size={20}
              className="absolute inset-y-0 top-[22px] right-10 text-green-500"
            />
          )}
        </div>
        {/* Cảnh báo nếu nhập chưa đủ 6 ký tự */}
        {password && !isPasswordValid && (
          <p className="text-red-500 mt-2 text-sm">
            Mật khẩu phải có ít nhất 6 kí tự!
          </p>
        )}
        {/* Cảnh báo nếu mật khẩu chứa dấu tiếng việt */}
        {password && !isPasswordNoDiacritics && (
          <p className="text-red-500 mt-2 text-sm">
            Mật khẩu không được có dấu!
          </p>
        )}
        {/* Xử lý nhập lại mật khẩu */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Xác nhận mật khẩu"
            className="w-full border border-yellow-400 bg-transparent text-gray-700 p-2 mt-3 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute top-3 inset-y-0 right-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {passwordMatch && isPasswordValid && isPasswordNoDiacritics && (
            <CheckCircle
              size={20}
              className="absolute inset-y-0 top-[22px] right-10 text-green-500"
            />
          )}
        </div>
        {/* Cảnh báo nếu mật khẩu nhập lại không khớp*/}
        {confirmPassword &&
          !passwordMatch &&
          isPasswordValid &&
          isPasswordNoDiacritics && (
            <p className="text-red-500 mt-2 text-sm">Mat khau khong khop!</p>
          )}
        <button
          className="w-full bg-yellow-400 text-white p-3 rounded mt-3 font-semibold shadow-md disabled:opacity-50"
          disabled={!isFormValid}
        >
          Đăng Ký
        </button>

        {/* Link quên mật khẩu & đăng ký */}
        <div className="flex justify-center text-sm text-gray-600 mt-3 border-t border-gray-300 pt-4">
          <span className="text-gray-600 pr-2 ">Bạn đã có tài khoản?</span>
          <Link
            href={"/login"}
            className="text-yellow-700 cursor-pointer hover:text-yellow-900"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </form>
  );
};

export default function RegisterUser() {
  return (
    <div className="w-full flex flex-col items-center bg-white">
      {/* Header */}
      {/* Main Content */}
      <div className="bg-[#FFDA3E] w-full h-[604px] flex justify-center items-center ">
        <main className="w-full max-w-5xl flex flex-col  md:flex-row items-center bg-[#FFDA3E]">
          {/* Banner */}
          <div className="flex-1 p-5">
            <img src="/body.png" className="w-full rounded-lg" />
          </div>
          {/* Form Register */}
          <RegisterForm />
        </main>
      </div>
    </div>
  );
}
