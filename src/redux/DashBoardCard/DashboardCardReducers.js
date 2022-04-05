import { FETCHING_STATS, FETCHING_STATS_SUCCESS } from "./DashboardActionTypes";

const intialState = {
    loading: true,
    totalUsers: null,
    totalAppointments: null,
    totalCanceledAppointments: null,
    totalCashIn: null,
};

export const DashBoardCardReducer = (state = intialState, action) => {
    switch(action.type) {
        case FETCHING_STATS: 
            return  {
                ...state,
                loading: true,
            }
        case FETCHING_STATS_SUCCESS:
            return {
                ...state,
                loading: false,
                totalUsers: action.payload.users[0].total_users,
                totalAppointments: action.payload.appointment[0].total_appointments,
                totalCanceledAppointments: action.payload.canceledAppointments[0].total_canceled_aapointments

            };
        default:
            return state;

    }
}