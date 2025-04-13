import { OpenAPI } from "@/gen";

export const HOST = process.env.HOST || `http://localhost:8080`;
export const CONTEXT_API = process.env.CONTEXT_API || `/api`;
export const API_BASE = HOST + CONTEXT_API;

// Override axios global variable config
OpenAPI.WITH_CREDENTIALS = true;

export const USERNAME_COOKIE_KEY = "user";
