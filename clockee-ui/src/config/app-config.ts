export const HOST = process.env.NEXT_PUBLIC_HOST || `https://localhost:8081`;
export const CONTEXT_API = process.env.NEXT_PUBLIC_CONTEXT_API || `/api`;
export const API_BASE = HOST + CONTEXT_API;

export const STRIPE_API_KEY = process.env.NEXT_PUBLIC_STRIPE_API_KEY || "";
export const USERNAME_COOKIE_KEY = "user";
export const ROLES_COOKIE_KEY = "roles";

export const NEXTJS_BASE_URL = process.env.NEXT_PUBLIC_NEXTJS_BASE_URL || "";

// One million is the unit for product value
export const UNIT = 1000000;
