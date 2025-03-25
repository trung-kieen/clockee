import axios from "axios";
import { API_BASE } from "@/utils/config";

const AUTH_STORAGE_KEY = "auth";

class AuthService {
  // Hàm hỗ trợ để xử lý fetch và lỗi
  async #fetch(url: string, options) {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const body = await res.json();
    if (res.ok && body) return body;
    else return null;
  }

  // Authenticate to get token into localstorage
  async login(email: string, password: string) {
    const url = `${API_BASE}/auth/login`;
    const loginRequest = { email, password };
    axios.post(url, loginRequest).then((userDetails) => {
      // save token to memory
      localStorage.save(AUTH_STORAGE_KEY, userDetails);
      return userDetails;
    })
    // localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(jwtResponse));
  }

  // register user
  async register(email: string, password: string, passwordConfirmation: string, name: string) {
    const url = `${API_BASE}/auth/register`;
    const requestBody = {
      email,
      password,
      passwordConfirmation,
      name,
    };


    return axios.post(url, requestBody);
  }

  // Logout user
  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  // Get auth detail for current user
  getAuthDetails() {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    return storedAuth ? JSON.parse(storedAuth) : null;
  }
}

export default new AuthService();
