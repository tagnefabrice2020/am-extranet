import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_URL } from "../config";
import { ADMIN, CLIENT_PARTICULIER, CLIENT_PROFESSIONEL, AGENT_SECTEUR } from "../utils/constant";

class AuthService {
  login(data) {
    return axios
      .post(API_URL + `/manager_app/login/`, data)
      .then((response) => {
        let user = response.data.user;
        if (user.group.toLowerCase() === CLIENT_PARTICULIER || user.group.toLowerCase() === CLIENT_PROFESSIONEL) {
          user = {...user, client_id: response.data.id}
        } else if (user.group.toLowerCase() === AGENT_SECTEUR) {
          user = {...user, agent_id: response.data.id}
        } else if (user.group.toLowerCase() === ADMIN) {
          user = {...user, admin_id: response.data.id}
        }
        const stats = response.data.stats;
        const token = response.data.tokens.access;

        if (token && user) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("stats", JSON.stringify(stats));
          localStorage.setItem("authToken", token);
          this.setAxiosToken(token);
        }
        return user;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("stats");
    localStorage.removeItem("authToken");
    this.removeAxiosToken();
  }

  setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
  }

  removeAxiosToken() {
    delete axios.defaults.headers["Authorization"];
  }

  isLogin() {
    const token = localStorage.getItem("authToken");
    // check if there is jwt token
    if (token) {
      // decodes the token
      const jwtData = jwtDecode(token);
      // check is token is expired
      if (jwtData.exp * 1000 > new Date().getTime()) {
        this.setAxiosToken(token);
        return true;
      }
      this.logout();
      return false;
    }
    return false;
  }
}

export default new AuthService();
