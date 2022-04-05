import Dashboard from "../../services/Dashboard"
import { FETCHING_STATS, FETCHING_STATS_SUCCESS } from "./DashboardActionTypes"

export const fetchingStats = () => {
    return {
        type: FETCHING_STATS
    }
}

export const fetchingStatsSuccess = (stats) => {
    return {
        type: FETCHING_STATS_SUCCESS,
        payload: stats
    }
}

export const loadStats = () => {
    return dispatch => {
        dispatch(fetchingStats());
        Dashboard.loadStats()
            .then((response) => { 
                dispatch(fetchingStatsSuccess(response.data));
                return Promise.resolve();
            }, (error) => {
                return Promise.reject();
            })
    }
}