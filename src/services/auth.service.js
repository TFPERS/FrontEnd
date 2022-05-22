import axios from "../config/axios.config";
import { setCookies, removeCookies } from "cookies-next";
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
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
  getCurrentUser() {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      return user;
    }
  }
}
export default new AuthService();
