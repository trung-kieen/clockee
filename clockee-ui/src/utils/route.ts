import { USERNAME_COOKIE_KEY } from "./config";

/**
 * Save current route => Direct login => Go back previous page if authenticated
 */
export const redirectAuthenticateAndGoBack = () => {
  const currentRoute =
    window.location.pathname + window.location.search;
  window.location.href =
    "/login" + (currentRoute ? `?redirect=${currentRoute}` : "");
  localStorage.removeItem(USERNAME_COOKIE_KEY);


}
