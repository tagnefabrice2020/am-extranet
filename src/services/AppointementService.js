import axios from "axios";
import { API_URL } from "../config";
import { CLIENT_PARTICULIER, CLIENT_PROFESSIONEL, AGENT_SECTEUR } from "../utils/constant";
import { parseData } from "../utils/transformer";

class AppontementService {

    fetchAppointments (page, perPage) {
        let url = `/rdv_app/rdv/?page=${page}`;
        return axios.get(API_URL + url)
            .then((response) => {
                return response.data;
            })
    }

    search (search, page, perPage) {
        return axios.get(API_URL + `/appointments/${search}/search?page=${page}&perPage=${perPage}`)
            .then((response) => {
                return response.data.data;
            });
    }

    store (appointment) {
        return axios.post(API_URL + `/rdv_app/rdv/`, appointment)
            .then((response) => {
                return response;
            })
    }

    fetchOneAppointment (uuid) {
        return axios.get(API_URL + `/rdv_app/rdv/${uuid}`)
            .then((response) => {
                return response.data[0];
            })
    }

    update (appointment, uuid) {
        return axios.put(API_URL + `/rdv_app/rdv/${uuid}`, appointment)
            .then((response) => {
                return response
            })
    }
}

export default new AppontementService();