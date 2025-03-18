import { API_BASE } from "@/utils/config";
import axios from "axios";
import { useRouter } from "next/navigation";

/// https://github.com/nextauthjs/next-auth/discussions/3550


const HttpClient = () => {
  // const router = useRouter();
  const instance = axios.create({
    baseURL: API_BASE,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  instance.interceptors.request.use(async (request) => {
    const token = localStorage.getItem('token');
    // console.log(`Interceptor ${JSON.stringify(request)}`);
    if (token) {

      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  })
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(`error`, error);
      if (error.response?.status == 401) {
        window.location.href = "/login";
        // router.push("/login")
      }
      return Promise.reject(error);
    },
  );

  return instance;

}

export default HttpClient();
