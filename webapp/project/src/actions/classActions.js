import { classConstants } from '../constants';
import { classService } from '../services';
import {history} from "../helpers/history";

export const classActions = {
    getAll,
    getById,
    // getByUserId,
    getMembers,
    getRequests,
    getFiles,
    getPosts,
    getPostsByUser,
    getEvents,
    getEventsByUser,
    insert,
    update,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        classService.getAll()
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_GETALL_REQUEST } }
    function success(classes) { return { type: classConstants.CLASSES_GETALL_SUCCESS, classes } }
    function failure(error) { return { type: classConstants.CLASSES_GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        classService.getById(id)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_GETBYID_REQUEST } }
    function success(classDetail) { return { type: classConstants.CLASSES_GETBYID_SUCCESS, classDetail } }
    function failure(error) { return { type: classConstants.CLASSES_GETBYID_FAILURE, error } }
}

function getMembers(classId) {
    return dispatch => {
        dispatch(request());

        classService.getMembers(classId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_GETMEMBERS_REQUEST } }
    function success(data) { return { type: classConstants.CLASSES_GETMEMBERS_SUCCESS, data } }
    function failure(error) { return { type: classConstants.CLASSES_GETMEMBERS_FAILURE, error } }
}

function getRequests(classId) {
    return dispatch => {
        dispatch(request());

        classService.getRequests(classId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_GETREQUESTS_REQUEST } }
    function success(data) { return { type: classConstants.CLASSES_GETREQUESTS_SUCCESS, data } }
    function failure(error) { return { type: classConstants.CLASSES_GETREQUESTS_FAILURE, error } }
}

function getFiles(classId) {
    return dispatch => {
        dispatch(request());

        classService.getFiles(classId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_GETFILES_REQUEST } }
    function success(data) { return { type: classConstants.CLASSES_GETFILES_SUCCESS, data } }
    function failure(error) { return { type: classConstants.CLASSES_GETFILES_FAILURE, error } }
}

function getPosts(classId) {
    return dispatch => {
        dispatch(request());

        classService.getPosts(classId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_GETPOSTS_REQUEST } }
    function success(data) { return { type: classConstants.CLASSES_GETPOSTS_SUCCESS, data } }
    function failure(error) { return { type: classConstants.CLASSES_GETPOSTS_FAILURE, error } }
}

function getPostsByUser(classId, userId) {
    return dispatch => {
        dispatch(request());

        classService.getPostsByUser(classId, userId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_GETPOSTSBYUSER_REQUEST } }
    function success(data) { return { type: classConstants.CLASSES_GETPOSTSBYUSER_SUCCESS, data } }
    function failure(error) { return { type: classConstants.CLASSES_GETPOSTSBYUSER_FAILURE, error } }
}

function getEvents(classId) {
    return dispatch => {
        dispatch(request());

        classService.getEvents(classId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_GETEVENTS_REQUEST } }
    function success(data) { return { type: classConstants.CLASSES_GETEVENTS_SUCCESS, data } }
    function failure(error) { return { type: classConstants.CLASSES_GETEVENTS_FAILURE, error } }
}

function getEventsByUser(classId, userId) {
    return dispatch => {
        dispatch(request());

        classService.getEventsByUser(classId, userId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_GETEVENTSBYUSER_REQUEST } }
    function success(data) { return { type: classConstants.CLASSES_GETEVENTSBYUSER_SUCCESS, data } }
    function failure(error) { return { type: classConstants.CLASSES_GETEVENTSBYUSER_FAILURE, error } }
}

function insert(userId, name) {
    return dispatch => {
        dispatch(request());

        classService.insert(userId, name)
            .then(
                response => {
                    dispatch(success(response.data));
                    history.push('/classes');
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_INSERT_REQUEST } }
    function success(classDetail) { return { type: classConstants.CLASSES_INSERT_SUCCESS, classDetail } }
    function failure(error) { return { type: classConstants.CLASSES_INSERT_FAILURE, error } }
}

function update(userId, classId, name, about, location) {
    return dispatch => {
        dispatch(request());

        classService.update(userId, classId, name, about, location)
            .then(
                response => {
                    dispatch(success(response.data));
                    history.push('/classes/'+ response.data.id );
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_UPDATE_REQUEST } }
    function success(classDetail) { return { type: classConstants.CLASSES_UPDATE_SUCCESS, classDetail } }
    function failure(error) { return { type: classConstants.CLASSES_UPDATE_FAILURE, error } }
}
