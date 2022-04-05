import { toast } from "react-toastify";
import AuthService from "../../services/AuthService";
import { AUTHENTICATED, AUTHENTICATING, AUTHENTICATION_FAILED, LOGOUT } from "./AuthActionTypes";

export const authenticating = () => {
    return {
        type: AUTHENTICATING
    };
}

export const authenticationFailed = (error) => {
    return {
        type: AUTHENTICATION_FAILED,
        payload: error
    }
}

export const authenticated = (user) => {
    return {
        type: AUTHENTICATED,
        payload: user
    }
}

export const authenticate = (data) => {
    return (dispatch) => {
        dispatch(authenticating());
        AuthService.login(data)
            .then((response) => {
                window.location.reload(); 
                dispatch(authenticated(response));
                return Promise.resolve();
            }, 
            (error) => {
                dispatch(authenticationFailed(error.message));
                toast.error('Vos identifiants sont incorrect.');
                return Promise.reject();
            })
    }
}

export const logout = () => {
    return (dispatch) => {
        AuthService.logout();
        dispatch({
            type: LOGOUT
        });
    }
}