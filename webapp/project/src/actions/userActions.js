import { userConstants } from '../constants';
import { userService } from '../services';
import {history} from "../helpers/history";
import { alertAuthenActions } from './';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertAuthenActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertAuthenActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertAuthenActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERS_GETALL_REQUEST } }
    function success(users) { return { type: userConstants.USERS_GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.USERS_GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        userService.getById(id)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERS_GETBYID_REQUEST } }
    function success(user) { return { type: userConstants.USERS_GETBYID_SUCCESS, user } }
    function failure(error) { return { type: userConstants.USERS_GETBYID_FAILURE, error } }
}

function update(user) {
    return dispatch => {
        dispatch(request());

        userService.update(user)
            .then(
                response => {
                    dispatch(success(response.data))
                    history.push(`/users/${response.data.id}`)
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERS_UPDATE_REQUEST } }
    function success(user) { return { type: userConstants.USERS_UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.USERS_UPDATE_FAILURE, error } }
}