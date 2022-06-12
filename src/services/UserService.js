import axios from "axios";
import { API_URL } from "../config";

class UserService {
  async fetchUsers(page, perPage) {
    return axios
      .get(API_URL + `/admin_app/users?limit=${perPage}&page=${page}`)
      .then((response) => {
        const users = response.data;
        return users;
      });
  }

  async store(user) {
    switch (user.role) {
      case "1":
        console.log(user.role);
        const response = await axios.post(API_URL + "/admin_app/admin/", user);
        return response;
      case "2":
        console.log(user.role);
        const response_1 = await axios.post(
          API_URL + "/agent_app/agent/",
          user
        );
        return response_1;
      case "3":
        const response_2 = await axios.post(
          API_URL + "/client_app/client/",
          user
        );
        return response_2;
      case 4:
        break;
      default:
        return null;
    }

    const response_3 = await axios.post(API_URL + "/users", user);
    return response_3;
  }

  async search(value, page, perPage) {
    return axios
      .get(API_URL + `/users/${value}/search?page=${page}&perPage=${perPage}`)
      .then((response) => {
        const users = response.data.data;
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
      console.log(type);
      url = `/admin_app/admin/${id}`;
    } else if (type === "agent") {
      console.log(type);
      url = `/agent_app/agent/${id}`;
    } else if (type === "client") {
      console.log(type);
      url = `/client_app/client/${id}`;
    } else if (type === "salarie") {
      console.log(type);
      url = `/salarie_app/salarie/${id}`;
    }
    console.log(url, type, id);
    return axios.get(API_URL + url).then((response) => {
      console.log(response.data[0]);
      return response.data[0];
    });
  }

  updateUser(user, uuid) {
    return axios
      .patch(API_URL + `/users/${uuid}/update`, user)
      .then((response) => {
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
