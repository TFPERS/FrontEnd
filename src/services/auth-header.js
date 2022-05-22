import { getCookie } from "cookies-next";

export default function authHeader() {
  // const user = JSON.parse(localStorage.getItem("user"));
  const token = getCookie("TFPERSTOKEN");
  if (token) {
    console.log(token);
    return { "x-access-token": token };
  } else {
    return {};
  }
}
