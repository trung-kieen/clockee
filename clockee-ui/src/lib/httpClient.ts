import { API_BASE } from "@/utils/config";
import axios from "axios";
import { AuthManager } from "@/lib/auth/AuthManager";

// https://github.com/nextauthjs/next-auth/discussions/3550


const getRefreshToken = async () => {
  try {
    return await axios.post(`${API_BASE}/auth/refresh`);
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

      if (
        error.response.status !== 401
        || originalConfig.retry
      ) {
        return Promise.reject(error);
      }


      /**
       * Refresh retry when get response status 401 (UNAUTHORIZED)
       */
      originalConfig.retry = true;
      try {
        const refreshResponse = getRefreshToken();
        if (refreshResponse.data?.accessToken) {
          const refreshToken = refreshResponse.data.accesstoken;
          AuthManager.setAccessToken(refreshToken);  // Assume { accesstoken: xxyyzzz}



          // update original  header request
          originalConfig.headers.Authorization = `Bearer ${refreshToken}`;


          // retry request with new header
          return instance(originalConfig);
        }

      }
      catch {
      }

      // Refresh fail => logout
      AuthManager.clearAccessToken();
      return Promise.reject(error);
    },
  );

  return instance;

}

export default HttpClient();
