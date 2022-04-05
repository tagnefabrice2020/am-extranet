import axios from "axios";
import { API_URL } from "../config";

class Dashboard {
    loadStats () {
        return axios.get(API_URL + `/dashboardCount`)
            .then((stats) => {
                return stats;
            })
    }
}

export default new Dashboard();