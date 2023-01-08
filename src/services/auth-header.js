import { getCookie } from "cookies-next";

export default function authHeader() {
  const token = getCookie("TFPERSTOKEN");
  if (token) {
    return { "x-access-token": token };
  } else {
    return {};
  }
}
