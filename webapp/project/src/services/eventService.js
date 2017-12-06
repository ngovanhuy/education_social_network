import {authHeader} from '../helpers';
import {DOMAIN_SERVICE, eventConstants} from '../constants'
import axios from 'axios';

export const eventService = {
    getAll,
    getEventsByUserId,
    getEventsByClassId,
    getEventsNotBelongClass,
    filter,
    getById,
    insert,
    update,
    delete: _delete,
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/events';
    return fetch(url, requestOptions).then(handleResponse);
}

function getEventsByUserId(userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/events/user/' + userId;
    return fetch(url, requestOptions).then(handleResponse);
}

function getEventsByClassId(userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/events/group/' + userId;
    return fetch(url, requestOptions).then(handleResponse);
}

function getEventsNotBelongClass() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/events/system';
    return fetch(url, requestOptions).then(handleResponse);
}

function filter(textSearch, userId, classId, startDate, endDate) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    const url = DOMAIN_SERVICE + '/groups/filter?' + `title=${textSearch}&userID=${userId}&groupID=${classId}&startDate=${startDate}&endDate=${endDate}&`;
    return fetch(url, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/events/' + id;
    return fetch(url, requestOptions).then(handleResponse);
}

function insert(classId, userId, imageUpload, title, location, content, startTime, endTime) {
    const url = DOMAIN_SERVICE + '/events'
    const data = new FormData();
    if (imageUpload) {
        data.append('imageUpload', imageUpload);
    }
    data.append("userID", userId)
    var context = eventConstants.EVENT_CONTEXT.SYSTEM
    if(classId && classId > 0){
        data.append("groupID", classId)
        context = eventConstants.EVENT_CONTEXT.GROUP
    }
    data.append("title", title)
    data.append("content", content)
    data.append("location", location)
    data.append("context", context)
    data.append("startTime", startTime)
    data.append("endTime", endTime)
    return axios.post(url, data);
}

function update(userId, classId, imageUpload, title, content, location, context, isAllDay, startTime, endTime) {
    const url = DOMAIN_SERVICE + '/events'
    const data = new FormData();
    if (imageUpload) {
        data.append('imageUpload', imageUpload);
    }
    data.append("userID", userId)
    data.append("groupID", classId)
    data.append("title", title)
    data.append("content", content)
    data.append("location", location)
    data.append("context", context)
    data.append("isAllDay", isAllDay)
    data.append("startTime", startTime)
    data.append("endTime", endTime)
    return axios.put(url, data);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/events/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}