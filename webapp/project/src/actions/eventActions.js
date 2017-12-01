import {eventConstants} from '../constants';
import {eventService} from '../services';
import {history} from "../helpers/history";

export const eventActions = {
    getAll,
    filter,
    getById,
    insert,
    update,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        eventService.getAll()
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: eventConstants.EVENTS_GETALL_REQUEST}
    }

    function success(classes) {
        return {type: eventConstants.EVENTS_GETALL_SUCCESS, classes}
    }

    function failure(error) {
        return {type: eventConstants.EVENTS_GETALL_FAILURE, error}
    }
}

function filter(textSearch, userId, classId, startDate, endDate) {
    return dispatch => {
        dispatch(request({textSearch, userId, classId, startDate, endDate}));

        eventService.filter(textSearch, userId, classId, startDate, endDate)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request(filters) {
        return {type: eventConstants.EVENTS_FILTER_REQUEST, filters}
    }

    function success(events) {
        return {type: eventConstants.EVENTS_FILTER_SUCCESS, events}
    }

    function failure(error) {
        return {type: eventConstants.EVENTS_FILTER_FAILURE, error}
    }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        eventService.getById(id)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: eventConstants.EVENTS_GETBYID_REQUEST}
    }

    function success(classDetail) {
        return {type: eventConstants.EVENTS_GETBYID_SUCCESS, classDetail}
    }

    function failure(error) {
        return {type: eventConstants.EVENTS_GETBYID_FAILURE, error}
    }
}

function insert(classId, userId, name) {
    return dispatch => {
        dispatch(request());

        eventService.insert(userId, name)
            .then(
                response => {
                    dispatch(success(response.data));
                    history.push('/events');
                },
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: eventConstants.EVENTS_INSERT_REQUEST}
    }

    function success(eventDetail) {
        return {type: eventConstants.EVENTS_INSERT_SUCCESS, eventDetail}
    }

    function failure(error) {
        return {type: eventConstants.EVENTS_INSERT_FAILURE, error}
    }
}

function update(userId, classId, name, about, location) {
    return dispatch => {
        dispatch(request());

        eventService.update(userId, classId, name, about, location)
            .then(
                response => {
                    dispatch(success(response.data));
                    history.push('/events/' + response.data.id);
                },
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: eventConstants.EVENTS_UPDATE_REQUEST}
    }

    function success(eventDetail) {
        return {type: eventConstants.EVENTS_UPDATE_SUCCESS, eventDetail}
    }

    function failure(error) {
        return {type: eventConstants.EVENTS_UPDATE_FAILURE, error}
    }
}