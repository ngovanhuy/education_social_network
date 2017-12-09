import {announcementConstants} from '../constants';
import {announcementService} from '../services';
import {history} from "../helpers/history";
import {dateUtils} from "../utils";

export const announcementActions = {
    getAll,
    getAnnouncementNewest,
    getById,
    insert,
    update,
    filter
};

function getAll() {
    return dispatch => {
        dispatch(request());

        announcementService.getAll()
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: announcementConstants.ANNOUNCEMENTS_GETALL_REQUEST}
    }

    function success(announcements) {
        return {type: announcementConstants.ANNOUNCEMENTS_GETALL_SUCCESS, announcements}
    }

    function failure(error) {
        return {type: announcementConstants.ANNOUNCEMENTS_GETALL_FAILURE, error}
    }
}

function getAnnouncementNewest() {
    const dateNow = new Date().setHours(0, 0, 0, 0)
    return dispatch => {
        dispatch(request());

        announcementService.filter(null, null, dateUtils.convertDateTimeToISO(dateNow), null)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: announcementConstants.ANNOUNCEMENTS_GETNEWEST_REQUEST}
    }

    function success(announcements) {
        return {type: announcementConstants.ANNOUNCEMENTS_GETNEWEST_SUCCESS, announcements}
    }

    function failure(error) {
        return {type: announcementConstants.ANNOUNCEMENTS_GETNEWEST_FAILURE, error}
    }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        announcementService.getById(id)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: announcementConstants.ANNOUNCEMENTS_GETBYID_REQUEST}
    }

    function success(announcementDetail) {
        return {type: announcementConstants.ANNOUNCEMENTS_GETBYID_SUCCESS, announcementDetail}
    }

    function failure(error) {
        return {type: announcementConstants.ANNOUNCEMENTS_GETBYID_FAILURE, error}
    }
}

function insert(userId, title, content) {
    return dispatch => {
        dispatch(request());

        announcementService.insert(userId, title, content)
            .then(
                response => {
                    dispatch(success(response.data));
                    history.push(`/announcements/${response.data.id}`);
                },
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: announcementConstants.ANNOUNCEMENTS_INSERT_REQUEST}
    }

    function success(announcementDetail) {
        return {type: announcementConstants.ANNOUNCEMENTS_INSERT_SUCCESS, announcementDetail}
    }

    function failure(error) {
        return {type: announcementConstants.ANNOUNCEMENTS_INSERT_FAILURE, error}
    }
}

function update(title, content, userId) {
    return dispatch => {
        dispatch(request());

        announcementService.update(title, content, userId)
            .then(
                response => {
                    dispatch(success(response.data));
                    // history.push('/announcements/'+ response.data.id );
                },
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: announcementConstants.ANNOUNCEMENTS_UPDATE_REQUEST}
    }

    function success(announcementDetail) {
        return {type: announcementConstants.ANNOUNCEMENTS_UPDATE_SUCCESS, announcementDetail}
    }

    function failure(error) {
        return {type: announcementConstants.ANNOUNCEMENTS_UPDATE_FAILURE, error}
    }
}

function filter(userId, title, startDate, endDate) {
    return dispatch => {
        dispatch(request());

        announcementService.filter(userId, title, startDate, endDate)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request(filters) {
        return {type: announcementConstants.ANNOUNCEMENTS_FILTER_REQUEST, filters}
    }

    function success(announcements) {
        return {type: announcementConstants.ANNOUNCEMENTS_FILTER_SUCCESS, announcements}
    }

    function failure(error) {
        return {type: announcementConstants.ANNOUNCEMENTS_FILTER_FAILURE, error}
    }
}