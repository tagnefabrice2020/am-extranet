import { APPOINTMENT_CURRENT_PAGE, FETCH_APPOINTMENT_REQUEST, FETCH_APPOINTMENT_SUCCESS, TOTAL_APPOINTMENT_PAGES, RESET_APPOINTMENT_FORM, STORING_APPOINTMENT, APPOINTMENT_PER_PAGE, SEARCHING_APPOINTMENTS, SEARCH_APPOINTMENTS_SUCCESS, RESET_APPOINTMENTS, FETCH_ONE_APPOINTMENT_SUCCESS, FETCH_ONE_APPOINTMENT_ERROR, FETCH_ONE_APPOINTMENT_REQUEST } from "./AppoinmentActionTypes";

const initialState = {
    loading: true,
    searching: false,
    searchValue: '',
    reset: {
        form: false
    },
    perPage: 5,
    currentPage: 1,
    initialCurrentPage: 1,
    appointments: [],
    initialAppointments: [],
    initialTotalPages: null,
    oneAppointmentLoading: false,
    oneAppointmentLoadingError: false,
    oneAppointment: {},
    error: '',
    totalPages: null
};

export const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_APPOINTMENT_REQUEST:
            return {
                ...state,
                appointments: {},
                oneAppointment: {},
                loading: true
            };
        case FETCH_APPOINTMENT_SUCCESS:
            return {
                ...state,
                appointments: action.payload,
                initialAppointments: action.payload,
                initialTotalPages: state.totalPages !== null ? state.totalPages : null,
                initialCurrentPage: state.currentPage !== null ? state.currentPage : null,
                loading: false,
                oneAppointment:{},
            };
        case APPOINTMENT_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };
        case RESET_APPOINTMENTS:
            return {
                ...state,
                searching: false,
                appointments: action.payload,
                loading: false,
            };
        case APPOINTMENT_PER_PAGE:
            return {
                ...state,
                perPage: action.payload
            };
        case TOTAL_APPOINTMENT_PAGES:
            return {
                ...state,
                totalPages: action.payload
            };
        case STORING_APPOINTMENT:
            return {
                ...state,
                reset: {
                    form: false
                }
            };
        case FETCH_ONE_APPOINTMENT_REQUEST:
            return {
                ...state,
                oneAppointmentLoading: true,
                oneAppointment: {},
            }
        case FETCH_ONE_APPOINTMENT_SUCCESS:
            return {
                ...state,
                oneAppointment: action.payload,
                oneAppointmentLoading: false,
                oneAppointmentLoadingError: false,
                appointments: [],
            };
        case FETCH_ONE_APPOINTMENT_ERROR:
            return {
                ...state,
                oneAppointment: {},
                oneAppointmentLoading: false,
                oneAppointmentLoadingError: true,
            };
        case RESET_APPOINTMENT_FORM:
            return {
                ...state,
                reset: {
                    form: true
                }
            };
        case SEARCHING_APPOINTMENTS:
            return {
                ...state,
                searching: true,
                loading: true,
                appointments: [],
                totalPages: 1,
                currentPage: state.initialCurrentPage,
                searchValue: action.payload
            };
        case SEARCH_APPOINTMENTS_SUCCESS:
            return {
                ...state,
                appointments: action.payload,
                searching: false,
                loading: false,
            };
        default:
            return state;
    }
}