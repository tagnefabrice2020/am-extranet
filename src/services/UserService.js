import axios from "axios";
import { API_URL } from "../config";

class UserService {
    fetchUsers (page, perPage) {
        return axios.get(API_URL + `/users?page=${page}&perPage=${perPage}`)
            .then((response) => {
                const users = response.data.data;
                return users;
            })
    }

    store (user) {
        return axios.post(API_URL + '/users', user)
            .then((response) => {
                return response;
            })
    }

    search (value, page, perPage) {
        return axios.get(API_URL + `/users/${value}/search?page=${page}&perPage=${perPage}`)
            .then((response) => {
                const users = response.data.data;
                return users;
            })
    }

    switchStatus (uuid) {
        return axios.patch(API_URL + `/users/${uuid}/status`)
            .then((response) => {
                return response;
            })
    }

    fetchOneUser (uuid) {
        return axios.get(API_URL + `/users/${uuid}/show`)
            .then((response) => {
                return response.data.user;
            })
    }

    updateUser (user, uuid) {
        return axios.patch(API_URL + `/users/${uuid}/update`, user)
            .then((response) => {
                return response
            })
    } 

}

export default new UserService();