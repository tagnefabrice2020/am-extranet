import { toast } from "react-toastify"
import AppointementService from "../../services/AppointementService"
import { APPOINTMENT_CURRENT_PAGE, FETCH_APPOINTMENT_REQUEST, APPOINTMENT_PER_PAGE, FETCH_APPOINTMENT_SUCCESS, RESET_APPOINTMENT_FORM, STORING_APPOINTMENT, TOTAL_APPOINTMENT_PAGES, SEARCHING_APPOINTMENTS, SEARCH_APPOINTMENTS_SUCCESS, RESET_APPOINTMENTS, FETCH_ONE_APPOINTMENT_REQUEST, FETCH_ONE_APPOINTMENT_SUCCESS, FETCH_ONE_APPOINTMENT_ERROR } from "./AppoinmentActionTypes";

export const fetchAppointmentsRequest = () => {
    return {
        type: FETCH_APPOINTMENT_REQUEST
    };
}

export const setAppointmentPage = (page) => {
    return {
        type: APPOINTMENT_CURRENT_PAGE,
        payload: page
    };
}

export const setAppointmentTotalPages = (pages) => {
    return {
        type: TOTAL_APPOINTMENT_PAGES,
        payload: pages
    };
}

export const fetchAppointmentSuccess = (appointments) => {
    return {
        type: FETCH_APPOINTMENT_SUCCESS,
        payload: appointments,
    };
}

export const storingAppointment = () => {
    return {
        type: STORING_APPOINTMENT
    };
}

export const resetAppointmentForm = () => {
    return {
        type: RESET_APPOINTMENT_FORM
    };
}

export const setAppointmentsPerPage = (per_page) => {
    return {
        type: APPOINTMENT_PER_PAGE,
        payload: per_page
    };
}

export const searchingAppointments = (value) => {
    return {
        type: SEARCHING_APPOINTMENTS,
        payload: value
    };
}

export const searchAppointmentSuccess = (appointments) => {
    return {
        type: SEARCH_APPOINTMENTS_SUCCESS,
        payload: appointments
    }
}


export const resetAppointments = (initialAppointments) => {
    return {
        type: RESET_APPOINTMENTS,
        payload: initialAppointments
    };
}

export const fetchOneAppointmentRequest = () => {
    return {
        type: FETCH_ONE_APPOINTMENT_REQUEST
    };
}

export const fetchOneAppointmentRequestSuccess = (appointment) => {
    return {
        type: FETCH_ONE_APPOINTMENT_SUCCESS,
        payload: appointment
    };
}

export const fetchOneAppointmentRequestError = () => {
    return {
        type: FETCH_ONE_APPOINTMENT_ERROR
    };
}


export const storeAppointment = (appointment) => {
    return dispatch => {
        dispatch(storingAppointment());
        AppointementService.store(appointment)
            .then(response => {
                if (response.status === 201) {
                    dispatch(resetAppointmentForm());
                    toast.success('Rendez-vous ajouter avec succèss.');
                    return Promise.resolve();
                }
            }, error => {
                toast.error('Une erreur c\'est produit pendant l\'ajouter du rendez-vous.');
                toast.error('Veuillez contacter le service de maintenance.');
            })
    }
}

export const fetchAppointments = (page, perPage) => {
    return (dispatch, getState) => {
        const state = getState();
        const appointments = state.appointments;
        if (appointments.searchValue.length <= 0) {
            dispatch(fetchAppointmentsRequest()); // fetchingAppointments
            AppointementService.fetchAppointments(page, perPage)
                .then((appointments) => {
                    console.log(appointments)
                    const totalPage = Math.ceil(appointments.count / 10);
                    dispatch(setAppointmentPage(page));
                    dispatch(setAppointmentTotalPages(totalPage));
                    dispatch(fetchAppointmentSuccess(appointments.results));
                    return Promise.resolve();
                }, () => {
                    toast.error('Une erreur est souvenue lors du chargement des rendez-vous.');
                    toast.error('Veuillez contacter le service de maintenance.');
                    return Promise.reject();
                })
        }
    }
}

export const searchAppointments = (page, perPage) => {
    return (dispatch, getState) => {
        const state = getState();
        const appointments = state.appointments;
        if (appointments.searchValue.length > 0) {
            AppointementService.search(appointments.searchValue, page, perPage) 
                .then((response) => {
                    const totalPage = Math.ceil(response.total / response.per_page); 
                    dispatch(setAppointmentPage(response.current_page)); 
                    dispatch(setAppointmentsPerPage(response.per_page));
                    dispatch(setAppointmentTotalPages(totalPage));
                    dispatch(searchAppointmentSuccess(response.data));
                    return Promise.resolve();
                }, () => {
                    toast.error('Une erreur est souvenue lors du chargement des rendez-vous.');
                    toast.error('Veuillez contacter le service de maintenance.');
                    return Promise.reject();
                })
        } else {
            dispatch(resetAppointments(appointments.initialAppointments));
            dispatch(setAppointmentTotalPages(appointments.initialTotalPages));
        }
    }
}

export const fetchOneAppointment = (uuid) => {
    return dispatch => {
        dispatch(fetchOneAppointmentRequest());
        AppointementService.fetchOneAppointment(uuid)
            .then((appointment) => { 
                dispatch(fetchOneAppointmentRequestSuccess(appointment))
                return Promise.resolve();
            }, error => {
                dispatch(fetchOneAppointmentRequestError());
                toast.error('Impossible de charger les information du rendez-vous.');
                return Promise.reject();
            })
    }
}

export const updateAppointment = (appointment, uuid) => {
    return dispatch => {
        AppointementService.update(appointment, uuid)
            .then((response) => {
                alert("rr")
                if(response.status === 200 || response.status === 201) {
                    toast.success('Rendez-vous enregistrer avec success.');
                }
            }, 
            error => {
                toast.error('Impossible de modifier le rendez-vous, veuillez contacter le service de maintenance.');
            })
    }
}