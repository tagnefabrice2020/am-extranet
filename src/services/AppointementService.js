import axios from "axios";
import { API_URL } from "../config";

class AppontementService {

    fetchAppointments (page, perPage) {
        return axios.get(API_URL + `/appointments?page=${page}&perPage=${perPage}`)
            .then((response) => {
                return response.data.data;
            })
    }

    search (search, page, perPage) {
        console.log(search)
        return axios.get(API_URL + `/appointments/${search}/search?page=${page}&perPage=${perPage}`)
            .then((response) => {
                return response.data.data;
            });
    }

    store (appointment) {
        return axios.post(API_URL + `/appointments`, appointment)
            .then((response) => {
                return response;
            })
    }

    fetchOneAppointment (uuid) {
        return axios.get(API_URL + `/appointments/${uuid}/show`)
            .then((response) => {
                console.log(response.data)
                return response.data.appointment;
            })
    }

    update (appointment, uuid) {
        console.log(uuid);
        return axios.patch(API_URL + `/appointments/${uuid}/update`, appointment)
            .then((response) => {
                return response
            })
    }
}

export default new AppontementService();