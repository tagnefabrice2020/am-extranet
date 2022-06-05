import axios from "axios";
import { API_URL } from "../config";

class UserService {
    fetchUsers (page, perPage) {
        return axios.get(API_URL + `/admin_app/admin?limit=${perPage}`)
            .then((response) => {
                console.log(response)
                const users = response.data.data;
                return users;
            })
    }

    store (user) {
        switch (user.role) {
            case "1":
                console.log(user.role);
                return axios.post(API_URL + '/admin_app/admin/', user)
                    .then((response) => {
                        return response;
                    })
            case "2":
                console.log(user.role);
                return axios.post(API_URL + '/agent_app/agent/', user)
                    .then((response) => {
                        return response;
                    })
            case "3":
                return axios.post(API_URL + '/client_app/client/', user)
                    .then((response) => {
                        return response;
                    })
            case 4:
                break
            default:
                return null
        }

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

    switchUserBulkStatus (data) {
        let newData = {uuids: data};
        return axios.patch(API_URL + `/users/switchStatuses`, newData)
            .then((response) => {
                return response
            })
    }

}

export default new UserService();