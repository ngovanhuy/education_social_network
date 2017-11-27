import {authHeader} from '../helpers';
import {DOMAIN_SERVICE} from '../constants'
import axios from 'axios';

export const classService = {
    getAll,
    getById,
    // getByUserId,
    getMembers,
    getRequests,
    getFiles,
    insert,
    update,
    updateProfilePicture,
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/groups/all';
    return fetch(url, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/groups/info/' + id;
    return fetch(url, requestOptions).then(handleResponse);
}

// function getByUserId(userId) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };
//     const url = DOMAIN_SERVICE + '/users/classs/' + userId;
//     return fetch(url, requestOptions).then(handleResponse);
// }

function getMembers(classId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/groups/members/' + classId;
    return fetch(url, requestOptions).then(handleResponse);
}

function getRequests(classId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/groups/requested/' + classId;
    return fetch(url, requestOptions).then(handleResponse);
}

function getFiles(classId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/groups/files/' + classId;
    return fetch(url, requestOptions).then(handleResponse);
}

function insert(name) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({name})
    };
    const url = DOMAIN_SERVICE + '/groups';
    return fetch(url, requestOptions)
        .then(handleResponse)
}

function update(classId, name, about, location) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({name, about, location})
    };
    const url = DOMAIN_SERVICE + '/groups/' + classId;
    return fetch(url, requestOptions)
        .then(handleResponse)
}

function updateProfilePicture(classId, file) {
    const uploadProfilePictureUrl = DOMAIN_SERVICE + '/groups/profileImage/' + classId;
    const data = new FormData();
    data.append('profileImage', file);
    return axios.post(uploadProfilePictureUrl, data);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}