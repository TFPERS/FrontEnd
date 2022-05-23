import axios from "../config/axios.config";
import { setCookies, removeCookies, getCookie } from "cookies-next";
class AuthService {
  login(username, password) {
    return axios
      .post("/api/auth/signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          setCookies("TFPERSTOKEN", response.data.accessToken, {
            maxAge: 86400,
          });
          const {
            id,
            firstname,
            lastname,
            email,
            major,
            faculty,
            telephone,
            updatedAt,
            createdAt,
          } = response.data;
          localStorage.setItem(
            "user",
            JSON.stringify({
              id,
              firstname,
              lastname,
              email,
              major,
              faculty,
              telephone,
              updatedAt,
              createdAt,
            })
          );
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
    removeCookies("TFPERSTOKEN");
  }
  register({
    id,
    firstname,
    lastname,
    major,
    faculty,
    email,
    password,
    telephone = "",
  }) {
    if (!telephone) {
      telephone = "";
    }
    return axios
      .post("/api/auth/signup", {
        id,
        firstname,
        lastname,
        major,
        faculty,
        email,
        password,
        telephone,
      })
      .then((response) => {
        return response.data;
      });
  }
  getCurrentUser() {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      return user;
    }
  }
  checkToken() {
    const token = getCookie("TFPERSTOKEN");
    return token ? true : false;
  }
}
export default new AuthService();
