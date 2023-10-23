import Cookies from "js-cookie";

const COOKIE_KEY = "Authorization";

export function setCookie(token: string) {
  return Cookies.set(COOKIE_KEY, token);
}

export function getCookie() {
  return Cookies.get(COOKIE_KEY);
}

export function removeCookie() {
  return Cookies.remove(COOKIE_KEY);
}
