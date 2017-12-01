import {authHeader} from '../helpers';
import {DOMAIN_SERVICE} from '../constants'
import axios from 'axios';

export const eventService = {
    getAll,
    getById,
    insert,
    update,
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/events/all';
    return fetch(url, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/events/info/' + id;
    return fetch(url, requestOptions).then(handleResponse);
}

function insert(userId, classId, title, location, start, end, description) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({userId, classId, title, location, start, end, description})
    };
    const url = DOMAIN_SERVICE + '/events/create/' + userId;
    return fetch(url, requestOptions)
        .then(handleResponse)
}

function update(userId, eventId, title, location, start, end, description) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({title, location, start, end, description})
    };
    const url = DOMAIN_SERVICE + '/events/action/' + eventId + "/" + userId;
    return fetch(url, requestOptions)
        .then(handleResponse)
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}