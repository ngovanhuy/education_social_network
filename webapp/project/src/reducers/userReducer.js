import {userConstants} from '../constants';

export function users(state = {loading: false, items: []}, action) {
    switch (action.type) {
        case userConstants.USERS_GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.USERS_GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.users
            };
        case userConstants.USERS_GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}