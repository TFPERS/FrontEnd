import axios from "../config/axios.config";
class AuthService {
  login(username, password) {
    console.log(username, password);
    return axios
      .post("/api/auth/signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
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
