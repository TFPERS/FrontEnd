import axios from "../config/axios.config";
import { setCookies, removeCookies, getCookie } from "cookies-next";
class AuthAgencyService {
  login(username, password) {
    return axios
      .post("/api/auth/agency/signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          setCookies("TFPERSAGENCYTOKEN", response.data.accessToken, {
            maxAge: 86400,
          });
          const { message, id, name, username, updatedAt, createdAt, role } =
            response.data;
          localStorage.setItem(
            "agency",
            JSON.stringify({
              id,
              name,
              username,
              updatedAt,
              createdAt,
              role,
            })
          );
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("agency");
    removeCookies("TFPERSAGENCYTOKEN");
  }
  getCurrentUser() {
    if (typeof window !== "undefined") {
      const agency = JSON.parse(localStorage.getItem("agency"));
      return agency;
    }
  }
  checkToken() {
    const token = getCookie("TFPERSAGENCYTOKEN");
    return token ? true : false;
  }
}
export default new AuthAgencyService();
