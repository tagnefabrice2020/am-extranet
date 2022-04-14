import { toast } from 'react-toastify';
import UserService from "../../services/UserService";
import { CHANGE_BULK_STATUS_ACTIONS, FETCH_ONE_USER_ERROR, FETCH_ONE_USER_SUCCESS, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USER_FAILURE, ONE_USER_REQUEST, RESET, RESET_FORM, SEARCHING, SEARCH_SUCCESS, SELECT_USERS, STORE_USER_ERROR, STORING_USER, SWITCH_STATUS, TOTAL_PAGES, USERS_CURRENT_PAGE, USERS_PER_PAGE } from "./UserActionTypes"

export const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    };
}

export const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    };
}

export const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    };
}

export const setUsersPerPage = (perPage) => {
    return {
        type: USERS_PER_PAGE,
        payload: perPage
    };
}

export const setPage = (page) => {
    return {
        type: USERS_CURRENT_PAGE,
        payload: page
    };
}

export const setTotalPage = (total) => {
    return {
        type: TOTAL_PAGES,
        payload: total
    };
}

export const searching = (value) => {
    return {
        type: SEARCHING,
        payload: value
    };
}

export const searchSuccess = (users, last_page) => {
    return {
        type: SEARCH_SUCCESS,
        payload: users, 
        last_page: last_page
        
    }
}

export const reset = (initialUsers) => {
    return {
        type: RESET,
        payload: initialUsers
    };
}

export const storingUser = () => {
    return {
        type: STORING_USER
    };
}

export const resetForm = () => {
    return {
        type: RESET_FORM
    };
}

export const storeUserError = () => {
    return {
        type: STORE_USER_ERROR
    };
}

export const switchStatus = (uuid) => {
    return {
        type: SWITCH_STATUS,
        payload: uuid
    };
}


export const selectUsers = (uuid) => {
    return {
        type: SELECT_USERS,
        payload: uuid
    };
}

export const changeBulkStatus = (status) => {
    return {
        type: CHANGE_BULK_STATUS_ACTIONS,
        payload: status
    };
}

export const fetchOneUserRequest = () => {
    return {
        type: ONE_USER_REQUEST
    };
}

export const fetchOneUserRequestSucces = (user) => {
    return {
        type: FETCH_ONE_USER_SUCCESS,
        payload: user
    }
}

export const fetchSingleUserFailed = () => {
    return {
        type: FETCH_ONE_USER_ERROR
    }
}


export const fetchUsers = (page, perPage) => {
    return (dispatch, getState) => {
        const state = getState();
        const users = state.users;
        dispatch(fetchUsersRequest());
        if (users.searchValue.length <= 0)  {
            UserService.fetchUsers(page, perPage)
                .then((users) => {
                    //console.log(users)
                    const totalPage = Math.ceil(users.total / users.per_page);
                    dispatch(setPage(users.current_page));
                    dispatch(setUsersPerPage(users.per_page));
                    dispatch(setTotalPage(totalPage));
                    dispatch(fetchUsersSuccess(users.data, users.last_page));
                    return Promise.resolve();
                }, 
                (error) => {
                    dispatch(fetchUsersFailure(error.message));
                    return Promise.reject();
                })
        } 
    } 
}

export const searchUsers = (page, perPage) => {
    return (dispatch, getState) => {
        const state = getState();
        const users = state.users;
        if (users.searchValue.length > 0) {
            UserService.search(users.searchValue, page, perPage)
                .then((users) => {
                    const totalPage = Math.ceil(users.total / users.per_page);
                    dispatch(setPage(users.current_page));
                    dispatch(setUsersPerPage(users.per_page));
                    dispatch(setTotalPage(totalPage));
                    dispatch(searchSuccess(users.data));
                    return Promise.resolve(); 
                }, 
                (error) => {
                    dispatch(fetchUsersFailure(error.message));
                    return Promise.reject();
                })
        } else {
            dispatch(reset(users.initialUsers));
            dispatch(setTotalPage(users.initialTotalPages));
        }
    }
}

export const storeUser = (user) => {
    return (dispatch) => {
        dispatch(storingUser());
        UserService.store(user)
            .then((response) => {
                if(typeof(response.data) === 'string' && response.data === 'success') {
                    dispatch(resetForm());
                    toast.success('Utilisateur ajouter avec sucèss.');
                    return Promise.resolve();
                }
            },
            (error) => {
                toast.error('La sauvegarde de l\'utilisateur a échouée.');
                return Promise.reject();
            })

    }
}

export const fetchOneUser = (user) => {
    return dispatch => {
        dispatch(fetchOneUserRequest());
        UserService.fetchOneUser(user)
            .then((user) => {
                dispatch(fetchOneUserRequestSucces(user));
                console.log(user)
                return Promise.resolve();
            }, error => {
                dispatch(fetchSingleUserFailed());
                toast.error('Impossible de charger les information de l\'utilisateur.');
            })
    }
}

export const switchUserStatus = (uuid) => {
    return dispatch => {
        UserService.switchStatus(uuid)
            .then((response) => {
                if(response.status === 201) {
                    dispatch(switchStatus(uuid));
                    toast.success('Le status de l\'utilisateur a été changer.');
                }
            }, (error) => {
                toast.error('Le status de l\'utilisateur n\'a pas été changer.');
            })
    }
}

export const updateUser = (user, uuid) => {
    return dispatch => {
        UserService.updateUser(user, uuid)
            .then((response) => {
                if(response.status === 200) {
                    toast.success('L\'utilisateur enregistrer avec sucess.');
                }
            }, (error) => {
                console.log(error)
            })
    }
}

export const switchBulkUserStatus = () => {
    return (dispatch, getState) => {
        let state = getState();
        let selectedUuids = state.users.selectedUsers;
        UserService.switchUserBulkStatus(selectedUuids)
            .then((response) => {
                if (response.status === 200) {
                    toast.success('Les différents status on été modifier avec succèss.');
                    dispatch(fetchUsers(state.users.current_page, state.users.perPage));
                }
            }, error => {
                console.log(error);
            })
    }
}

export const test = (user) => {
    return (dispatch, getState) => {
        console.log(user)
        const state = getState();
        dispatch(searchSuccess({}));
        console.log(state);
    }
}


/*
const state = getState();
        console.log(state.users.searchValue);
        if (state.users.searchValue.length > 0) {
            UserService.search(state.users.searchValue, page, perPage)
                .then((users) => {
                    dispatch(searchSuccess(users.data));
                    return Promise.resolve();
                }, (error) => {
                    return Promise.reject();
                })
        } else {
            dispatch(reset(state.users.initialUsers));
        }*/