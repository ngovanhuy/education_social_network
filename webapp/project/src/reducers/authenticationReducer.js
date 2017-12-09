import {classConstants, userConstants} from '../constants';

export function authentication(state = {}, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                error: ''
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                currentUser: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        case userConstants.LOGINBYUSERID_REQUEST:
            return {
                loggingIn: true,
                error: ''
            };
        case userConstants.LOGINBYUSERID_SUCCESS:
            return {
                loggedIn: true,
                currentUser: action.user
            };
        case userConstants.LOGINBYUSERID_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}