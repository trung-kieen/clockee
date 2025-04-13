"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthControllerService, LoginRequest } from "@/gen";
import { Eye, EyeOff } from "lucide-react";
import { logger } from "@/utils/logger";
export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { saveUserDetails, isAuthenticated, logout } = useAuth();
  const params = useSearchParams();

  // Kiểm tra điều kiện email
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // Kiểm tra điều kiện mật khẩu
  const isPasswordValid = password.length >= 6;
  const isFormValid = isPasswordValid && isValidEmail(email);
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      logout();
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginReq: LoginRequest = {
      email: email,
      password: password,
    };
    try {
      const res = await AuthControllerService.login(loginReq);
      saveUserDetails(res);
      toast("Login success");
      const redirectUrl = params.get("redirect");
      logger.info("redirect to", redirectUrl);
      if (redirectUrl && redirectUrl != "/login") {
        router.push(redirectUrl);
      } else {
        router.push("/");
      }
    } catch (e) {
      console.error(e);
    }
    // authService.login(email, password);
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          autoFocus
          type="text"
          placeholder="Email"
          className="w-full border border-yellow-400 bg-transparent text-gray-700 p-2 mt-7 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email && !isValidEmail(email) && (
          <p className="absolute text-red-500 mt-1 text-sm ml-1">
            Email không hợp lệ!
          </p>
        )}
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
        {password && !isPasswordValid && (
          <p className="absolute text-red-500 mt-1 ml-1 text-sm">
            Mật khẩu phải có ít nhất 6 ký tự!
          </p>
        )}
      </div>
      <button
        className={`w-full bg-yellow-400 text-white p-3 rounded mt-7 font-semibold shadow-md ${isFormValid ? "bg-yellow-400 hover:opacity-75" : "bg-yellow-230 cursor-not-allowed "}`}
        disabled={!email.trim()}
      >
        Tiếp theo
      </button>
    </form>
  );
};
