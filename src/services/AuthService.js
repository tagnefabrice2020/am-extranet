import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_URL } from "../config";

class AuthService {

    login(data) {
        return axios.post(API_URL + `/manager_app/login/`, data)
            .then((response) => {
                const user = response.data.user;
                const token = response.data.tokens.access;
            
                if(token && user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('authToken', token);
                    this.setAxiosToken(token);
                } 
                return user;
            })
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        this.removeAxiosToken();
    }

    setAxiosToken (token) {
        axios.defaults.headers['Authorization'] = "Bearer " + token;
    }

    removeAxiosToken () {
        delete axios.defaults.headers['Authorization'];
    }

    isLogin () {
        const token = localStorage.getItem('authToken');
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

export default new AuthService()
