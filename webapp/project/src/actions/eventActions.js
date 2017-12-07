import {eventConstants} from '../constants';
import {eventService} from '../services';
import {history} from "../helpers/history";

export const eventActions = {
    getAll,
    getEventsByUserId,
    getEventsByClassId,
    getEventsNotBelongClass,
    getEventsUpcomming,
    getEventsUpcommingOfClass,
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

    function success(events) {
        return {type: eventConstants.EVENTS_GETALL_SUCCESS, events}
    }

    function failure(error) {
        return {type: eventConstants.EVENTS_GETALL_FAILURE, error}
    }
}

function getEventsByUserId(userId) {
    return dispatch => {
        dispatch(request());

        eventService.getEventsByUserId(userId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: eventConstants.EVENTS_GETBYUSER_REQUEST}
    }

    function success(events) {
        return {type: eventConstants.EVENTS_GETBYUSER_SUCCESS, events}
    }

    function failure(error) {
        return {type: eventConstants.EVENTS_GETBYUSER_FAILURE, error}
    }
}

function getEventsByClassId(classId) {
    return dispatch => {
        dispatch(request());

        eventService.getEventsByClassId(classId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: eventConstants.EVENTS_GETBYCLASS_REQUEST}
    }

    function success(events) {
        return {type: eventConstants.EVENTS_GETBYCLASS_SUCCESS, events}
    }

    function failure(error) {
        return {type: eventConstants.EVENTS_GETBYCLASS_FAILURE, error}
    }
}

function getEventsNotBelongClass() {
    return dispatch => {
        dispatch(request());

        eventService.getEventsNotBelongClass()
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: eventConstants.EVENTS_GETNOTBELONGCLASS_REQUEST}
    }

    function success(events) {
        return {type: eventConstants.EVENTS_GETNOTBELONGCLASS_SUCCESS, events}
    }

    function failure(error) {
        return {type: eventConstants.EVENTS_GETNOTBELONGCLASS_FAILURE, error}
    }
}

function getEventsUpcomming() {
    return dispatch => {
        dispatch(request());

        eventService.getEventsUpcomming()
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: eventConstants.EVENTS_GETUPCOMMING_REQUEST}
    }

    function success(events) {
        return {type: eventConstants.EVENTS_GETUPCOMMING_SUCCESS, events}
    }

    function failure(error) {
        return {type: eventConstants.EVENTS_GETUPCOMMING_FAILURE, error}
    }
}

function getEventsUpcommingOfClass(classId) {
    return dispatch => {
        dispatch(request());

        eventService.getEventsUpcommingOfClass(classId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: eventConstants.EVENTS_GETUPCOMMINGOFCLASS_REQUEST}
    }

    function success(events) {
        return {type: eventConstants.EVENTS_GETUPCOMMINGOFCLASS_SUCCESS, events}
    }

    function failure(error) {
        return {type: eventConstants.EVENTS_GETUPCOMMINGOFCLASS_FAILURE, error}
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

    function success(eventDetail) {
        return {type: eventConstants.EVENTS_GETBYID_SUCCESS, eventDetail}
    }

    function failure(error) {
        return {type: eventConstants.EVENTS_GETBYID_FAILURE, error}
    }
}

function insert(classId, userId, imageUpload, title, location, content, start, end) {
    return dispatch => {
        dispatch(request());

        eventService.insert(classId, userId, imageUpload, title, location, content, start, end)
            .then(
                response => {
                    dispatch(success(response.data));
                    history.push(`/events/${response.data.data.id}`);
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