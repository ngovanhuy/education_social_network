import {authHeader} from '../helpers';
import {DOMAIN_SERVICE} from '../constants'
import axios from 'axios';

export const classService = {
    getAll,
    getById,
    getMembers,
    getRequests,
    getFiles,
    insert,
    update,
    updateProfilePicture,
    uploadFile,
    deleteFile,
    searchByClassname,
    addMember,
    deleteMember,
    deleteClass,
    insertTopic,
    getTopics,
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

function insert(userId, name) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({name})
    };
    const url = DOMAIN_SERVICE + '/groups/create/' + userId;
    return fetch(url, requestOptions)
        .then(handleResponse)
}

function update(userId, classId, name, about, location) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({name, about, location})
    };
    const url = DOMAIN_SERVICE + '/groups/action/' + classId + "/" + userId;
    return fetch(url, requestOptions)
        .then(handleResponse)
}

function updateProfilePicture(classId, file) {
    const uploadProfilePictureUrl = DOMAIN_SERVICE + '/groups/profileImage/' + classId;
    const data = new FormData();
    data.append('profileImage', file);
    return axios.post(uploadProfilePictureUrl, data);
}

function uploadFile(classId, file, userId) {
    const uploadFileUrl = DOMAIN_SERVICE + '/groups/files/' + classId;
    const data = new FormData();
    data.append('fileUpload', file);
    data.append('userID', userId);
    return axios.post(uploadFileUrl, data);
}

function deleteFile(fileId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/files/delete/' + fileId;
    return fetch(url, requestOptions).then(handleResponse);
}

function searchByClassname(className) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/groups/search?groupname=' + className;
    return fetch(url, requestOptions).then(handleResponse);
}

function addMember(classId, userId, typeMember) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({typeMember})
    };
    const url = DOMAIN_SERVICE + '/groups/members/' + classId + "/" + userId;
    return fetch(url, requestOptions).then(handleResponse);
}

function deleteMember(classId, userId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/groups/members/' + classId + "/" + userId;
    return fetch(url, requestOptions).then(handleResponse);
}

function deleteClass(classId, userId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/groups/action/' + classId + "/" + userId;
    return fetch(url, requestOptions).then(handleResponse);
}

function insertTopic(classId, topicName) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/groups/topic/' + classId + "?topicname=" + topicName;
    return fetch(url, requestOptions)
        .then(handleResponse)
}

function getTopics(classId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/groups/topic/' + classId;
    return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}