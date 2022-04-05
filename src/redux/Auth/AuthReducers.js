import AuthService from "../../services/AuthService";
import { AUTHENTICATED, AUTHENTICATING, AUTHENTICATION_FAILED, LOGOUT } from "./AuthActionTypes";


const user = localStorage.getItem('user');

const initialState = {
    loading: false,
    authUser: user ? user : {},
    isLogin: AuthService.isLogin(),
    error: ''
};

export const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTHENTICATING:
            return {
                ...state,
                loading: true,
            };
        case AUTHENTICATED:
            return {
                ...state, 
                isLogin: true,
                loading: false,
                authUser: action.payload,
                error: ''
            };
        case AUTHENTICATION_FAILED:
            return {
                ...state,
                isLogin: false,
                loading: false,
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                isLogin: false,
                authUser: {}
            };
        default:
            return state;
    }
} 