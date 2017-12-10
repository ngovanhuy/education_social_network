import {authHeader} from '../helpers';
import {DOMAIN_SERVICE} from '../constants'
import {stringUtils} from "../utils";

export const announcementService = {
    getAll,
    getById,
    insert,
    update,
    filter,
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/announcements';
    return fetch(url, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/announcements/' + id;
    return fetch(url, requestOptions).then(handleResponse);
}

function insert(userId, title, content) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            title,
            content,
            "userID": userId
        })
    };
    const url = DOMAIN_SERVICE + '/announcements';
    return fetch(url, requestOptions)
        .then(handleResponse)
}

function update(title, content, userId) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({title, content})
    };
    const url = DOMAIN_SERVICE + '/announcements/' + userId;
    return fetch(url, requestOptions)
        .then(handleResponse)
}

function filter(userId, title, startDate, endDate) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    const url = DOMAIN_SERVICE + '/announcements/filter?' + `title=${stringUtils.converToString(title)}` +
        `&userID=${stringUtils.converToString(userId)}&startTime=${stringUtils.converToString(startDate)}` +
        `&endTime=${stringUtils.converToString(endDate)}`;
    return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}