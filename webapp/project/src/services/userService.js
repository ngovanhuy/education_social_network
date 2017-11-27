import {authHeader} from '../helpers';
import {DOMAIN_SERVICE} from '../constants'
import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    updateProfilePicture,
    updateCoverPhoto,
    getClassJoined,
    getClassRequest,
    createRequestJoinClass,
    deleteRequestJoinClass,
    approveRequestJoinClass,
    leaveClass
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    };
    const url = DOMAIN_SERVICE + '/users/login';
    // const url = '/users/authenticate'
    return fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(response => {
            // login successful if there's a jwt token in the response
            if (response) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                var user = {
                    "id": response.data.id,
                    "username": response.data.username
                };
                localStorage.setItem('user', JSON.stringify(user));
            }

            return response.data;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/test/users';
    return fetch(url, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/users/' + id;
    return fetch(url, requestOptions).then(handleResponse);
}

function updateProfilePicture(userId, file) {
    const uploadProfilePictureUrl = DOMAIN_SERVICE + '/users/profileImage/' + userId;
    const data = new FormData();
    data.append('profileImage', file);
    return axios.post(uploadProfilePictureUrl, data);
}

function updateCoverPhoto(userId, file) {
    const uploadCoverPhotoUrl = DOMAIN_SERVICE + '/users/coverImage/' + userId;
    const data = new FormData();
    data.append('coverImage', file);
    return axios.post(uploadCoverPhotoUrl, data);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };
    const url = DOMAIN_SERVICE + '/users';
// const url = '/users/register'
    return fetch(url, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };
    const url = DOMAIN_SERVICE + '/users/' + user.id;
    return fetch(url, requestOptions).then(handleResponse);
}

function createRequestJoinClass(userId, classId) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId, classId})
    };
    const url = DOMAIN_SERVICE + '/users/classrequest/' + userId + "/" + classId;
    return fetch(url, requestOptions)
        .then(handleResponse);
}

function deleteRequestJoinClass(userId, classId) {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId, classId})
    };
    const url = DOMAIN_SERVICE + '/users/classrequest/' + userId + "/" + classId;
    return fetch(url, requestOptions)
        .then(handleResponse);
}

function approveRequestJoinClass(userId, classId) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId, classId})
    };
    const url = DOMAIN_SERVICE + '/requested/' + classId + "/" + userId;
    return fetch(url, requestOptions)
        .then(handleResponse);
}

function leaveClass(userId, classId) {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId, classId})
    };
    const url = DOMAIN_SERVICE + '/users/classs/' + userId + "/" + classId;
    return fetch(url, requestOptions)
        .then(handleResponse);
}

function getClassJoined(userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/users/classs/' + userId;
    return fetch(url, requestOptions).then(handleResponse);
}

function getClassRequest(userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/users/classrequest/' + userId;
    return fetch(url, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/users/' + id, requestOptions).then(handleResponse);
    ;
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}