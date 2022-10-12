import axios from "axios";
import { API_URL } from "../config";

class UserService {
  async fetchUsers(page, perPage) {
    return axios
      .get(API_URL + `/admin_app/users?page=${page}`)
      .then((response) => {
        const users = response.data;
        return users;
      });
  }

  async store(user) {
    switch (user.role) {
      case "1":
        const response = await axios.post(API_URL + "/admin_app/admin/", user);
        return response;
      case "2":
        const response_1 = await axios.post(
          API_URL + "/agent_app/agent/",
          user
        );
        return response_1;
      case "3":
        delete user.role;
        const response_2 = await axios.post(
          API_URL + "/agent_app/agent/",
          user
        );
        return response_2;
      case "4":
        delete user.role;
        const response_3 = await axios.post(
          API_URL + "/client_app/client/",
          user
        );
        return response_3;
      case "5":
        delete user.role;
        const response_4 = await axios.post(
          API_URL + "/client_app/client/",
          user
        );
        return response_4;
      case "6":
        delete user.role;
        const response_5 = await axios.post(
          API_URL + "/client_app/client/",
          user
        );
        return response_5;
      default:
        return null;
    }
  }

  async search(value, page, perPage) {
    return axios
      .get(
        API_URL +
          `/admin_app/users/?value=${value}&page=${page}&perPage=${perPage}`
      )
      .then((response) => {
        const users = response.data;
        return users;
      });
  }

  switchStatus(uuid) {
    return axios.patch(API_URL + `/users/${uuid}/status`).then((response) => {
      return response;
    });
  }

  fetchOneUser(id, type) {
    let url;
    if (type === "administrateur") {
      url = `/admin_app/admin/${id}`;
    } else if (type === "agent") {
      url = `/agent_app/agent/${id}`;
    } else if (type === "client") {
      url = `/client_app/client/${id}`;
    } else if (type === "salarie") {
      url = `/salarie_app/salarie/${id}`;
    }
    return axios.get(API_URL + url).then((response) => {
      return response.data[0];
    });
  }

  updateUser(user, id) {
    let url;
    if (user.role === "1") {
      url = `/admin_app/admin/${id}`;
      delete user.role;
    } else if (user.role === "2" || user.role === "3" || user.role === "4") {
      url = `/agent_app/agent/${id}`;
      user = { ...user, role: parseInt(user.role) };
    } else if (user.role === "5" || user.role === "6") {
      url = `/client_app/client/${id}`;
      delete user.role;
    } else if (user.role === "7") {
      url = `/salarie_app/salarie/${id}`;
      delete user.role;
    }
    console.log(user);
    return axios.put(API_URL + `${url}`, user).then((response) => {
      return response;
    });
  }

  switchUserBulkStatus(data) {
    let newData = { uuids: data };
    return axios
      .patch(API_URL + `/users/switchStatuses`, newData)
      .then((response) => {
        return response;
      });
  }
}

export default new UserService();
