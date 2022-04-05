import { FETCH_ONE_USER_SUCCESS, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USER_FAILURE, FETCH_ONE_USER_ERROR, ONE_USER_REQUEST, RESET, RESET_FORM, SEARCHING, SEARCH_SUCCESS, STORING_USER, SWITCH_STATUS, TOTAL_PAGES, USERS_CURRENT_PAGE, USERS_PER_PAGE } from "./UserActionTypes"

const initialState = {
    loading: true,
    searching: false,
    searchValue: '',
    reset: {
        form: false
    },
    oneUser: {},
    oneUserLoading: false,
    oneUserLoadingError: false,
    perPage: 5,
    currentPage: 1,
    initialCurrentPage: 1,
    users: [],
    initialUsers: [],
    initialTotalPages: null,
    error: '',
    totalPages: null
}

export const UserReducers = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                users: [],
                loading: true,
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                initialUsers: action.payload,
                initialTotalPages: state.totalPages !== null ? state.totalPages : null,
                initialCurrentPage: state.currentPage !== null ? state.currentPage : null,
                loading: false,
            };
        case TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.payload
            };
        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload,
                totalPages: 0,
                perPage: 0,
            };
        case USERS_PER_PAGE:
            return {
                ...state,
                perPage: action.payload
            };
        case USERS_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };
        case SEARCHING:
            return {
                ...state,
                searching: true,
                loading: true,
                users: [],
                totalPages: 1,
                currentPage: state.initialCurrentPage,
                searchValue: action.payload
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                searching: false,
                loading: false,
                users: action.payload
            };
        case RESET:
            return {
                ...state,
                searching: false,
                loading: false,
                users: action.payload,
            };
        case STORING_USER:
            return {
                ...state,
                reset: {
                    form: false
                }
            };
        case RESET_FORM:
            return {
                ...state,
                reset: {
                    form: true
                }
            };
        case SWITCH_STATUS:
            return {
                ...state,
                users: state.users.map((user) => {
                   return user.uuid === action.payload ? {...user, active: !user.active} : user;
                }),
                initialUsers: state.initialUsers.map((user) => {
                    return user.uuid === action.payload ? {...user, active: !user.active} : user;
                })
            };
        case ONE_USER_REQUEST: 
            return {
                ...state,
                oneUser: {},
                oneUserLoading: true,
            };
        case FETCH_ONE_USER_SUCCESS:
            return {
                ...state,
                oneUserLoading: false,
                oneUserLoadingError: false,
                oneUser: action.payload
            };
        case FETCH_ONE_USER_ERROR:
            return {
                ...state,
                oneUserLoading: false,
                oneUser: {},
                oneUserLoadingError: true
            };
        default:
            return state;
    }
}