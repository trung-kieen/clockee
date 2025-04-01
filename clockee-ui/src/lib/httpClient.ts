import { API_BASE } from "@/utils/config";
import axios from "axios";
import { AuthManager } from "@/lib/auth/AuthManager";
import { toast } from "react-toastify";

// https://github.com/nextauthjs/next-auth/discussions/3550


interface RefreshTokenResponse {
  accessToken: string;
}
const getRefreshToken = async () => {
  try {
    return await axios.post<RefreshTokenResponse>(`${API_BASE}/auth/refresh`);
  } catch (error) {
    throw error;
  }

}
/**
 * Main axios config for the whole application
 * interceptor inject jwt token and refresh token when exipred
 */
const HttpClient = () => {
  const instance = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
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
  }

  )
  /**
   * Handle response when access token not available or exipred
   * Perform refresh token
   */
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    /**
     * Perform refresh token action only when error occur
     */
    async (error) => {

      const originalConfig = error.config;


      if (!error.response) {
        // No network connectivity
        toast("Network error");
        return;
      }

      if (error.response.status === 401) {
        if (originalConfig.retry) {
          /**
           * Unauthorized retry fail
           * Recursive base case
           */

          toast("Unable refresh token TODO redirect login")
          return Promise.reject(error);
        } else {

          toast("Refresht token retry ")
          originalConfig.retry = true;
          try {
            const refreshResponse = await getRefreshToken();
            if (refreshResponse.data.accessToken) {
              const refreshToken = refreshResponse.data.accessToken;
              AuthManager.setAccessToken(refreshToken);  // Assume { accesstoken: xxyyzzz}



              // update original  header request
              originalConfig.headers.Authorization = `Bearer ${refreshToken}`;


              // retry request with new header
              return instance(originalConfig);
            }

          }
          catch (refreshError) {
            AuthManager.clearAccessToken();
            const currentRoute = window.location.pathname + window.location.search;
            window.location.href = "/login" + (currentRoute ? `?redirect=${currentRoute}` : '');
            return Promise.reject(refreshError);
          }


        }
      }


      if (error.response.status === 422) {
        toast("Invalid data")
        return Promise.reject(error);
      }

      if (error.response.status === 404) {
        window.location.href = "/not-found";
      }

      if (error.response.status === 500) {
        toast.error("Lỗi server");
      }
      // Refresh fail => logout
    },
  );

  return instance;

}

export default HttpClient();
