import { createStore, combineReducers, applyMiddleware } from "redux";
import { AuthReducer } from "./redux/Auth/AuthReducers";
import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";
import thunk from 'redux-thunk';
import { UserReducers } from "./redux/User/UserReducer";
import AuthService from './services/AuthService';
import { appointmentReducer } from "./redux/Apppointment/AppointmentReducer";
import { DashBoardCardReducer } from "./redux/DashBoardCard/DashboardCardReducers";

const rootReducers = combineReducers({
    auth: AuthReducer,
    users: UserReducers,
    appointments: appointmentReducer,
    stats: DashBoardCardReducer,
});

const emptyReducer = combineReducers({auth: AuthReducer});

const auth = AuthService.isLogin();

export const store = createStore(auth ? rootReducers : emptyReducer, composeWithDevTools(applyMiddleware(thunk)));