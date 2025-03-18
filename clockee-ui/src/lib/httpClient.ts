import { API_BASE } from "@/utils/config";
import axios from "axios";
import { AuthManager } from "@/lib/auth/AuthManager";

/// https://github.com/nextauthjs/next-auth/discussions/3550


const HttpClient = () => {
  const instance = axios.create({
    baseURL: API_BASE,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  instance.interceptors.request.use(async (request) => {
    // const token = localStorage.getItem('token');
    const token = AuthManager.getAccessToken()
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`Interceptor ${JSON.stringify(request)}`);
    return request;
  })
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(`error`, error);
      if (error.response?.status == 401) {
        // use window action instead of useRouter otherwise violent hooks rule
        window.location.href = "/login";
      }
      return Promise.reject(error);
    },
  );

  return instance;

}

export default HttpClient();
