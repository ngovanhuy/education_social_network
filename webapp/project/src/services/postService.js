import {authHeader} from '../helpers';
import {classConstants, DOMAIN_SERVICE} from '../constants'
import axios from 'axios';

export const postService = {
    getPostsByUserId,
    getPostsByClassIdUserId,
    insert,
    getComments,
    insertComment,
    getFavourites,
    insertFavourite,
    deleteFavourite,
    getById,
};

function getPostsByUserId(userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/users/posts/' + userId;
    return fetch(url, requestOptions).then(handleResponse);
}

function getPostsByClassIdUserId(classId, userId, topicName) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    var url = DOMAIN_SERVICE + '/groups/post/' + classId + "/" + userId;
    if(topicName){
        url += "?topicname=" + topicName
    }
    return fetch(url, requestOptions).then(handleResponse);
}

function insert(classId, userId, title, content, fileUpload, scopeType, topic, isSchedule, members, startTime, endTime) {
    const url = DOMAIN_SERVICE + '/groups/post/' + classId + "/" + userId
    const data = new FormData();
    if (fileUpload && fileUpload.length > 0) {
        for (var i = 0; i < fileUpload.length; i++) {
            data.append('fileUpload', fileUpload[i]);
        }
    }
    data.append("title", title)
    data.append("content", content)
    data.append("scopeType", scopeType)
    if (topic) {
        data.append("topic", topic)
    } else {
        data.append("topic", classConstants.DEFAULT_ALL_TOPIC)
    }
    if (isSchedule) {
        data.append("isSchedule", isSchedule)
    }
    if (members && members.length > 0) {
        var memberReqquest = "["
        for (var i = 0; i < members.length; i++) {
            if(i == members.length - 1){
                memberReqquest += members[i]
            } else {
                memberReqquest += members[i] + ","
            }
        }
        memberReqquest += "]"
        data.append("members", memberReqquest)
    }
    if (startTime) {
        data.append("startTime", startTime)
    }
    if (endTime) {
        data.append("endTime", endTime)
    }
    return axios.post(url, data);
}

function getComments(postId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/posts/comment/' + postId;
    return fetch(url, requestOptions).then(handleResponse);
}

function insertComment(postId, userID, content, fileUpload) {
    const url = DOMAIN_SERVICE + '/posts/comment/' + postId
    const data = new FormData();
    if (fileUpload) {
        data.append('fileUpload', fileUpload);
    }
    data.append("userID", userID)
    data.append("content", content)
    return axios.post(url, data);
}

function getFavourites(postId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/posts/like/' + postId;
    return fetch(url, requestOptions).then(handleResponse);
}

function insertFavourite(postId, userID) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({userID})
    };
    const url = DOMAIN_SERVICE + '/posts/like/' + postId;
    return fetch(url, requestOptions)
        .then(handleResponse)
}

function deleteFavourite(postId, userID) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
        body: JSON.stringify({userID})
    };
    const url = DOMAIN_SERVICE + '/posts/like/' + postId;
    return fetch(url, requestOptions)
        .then(handleResponse)
}

function getById(postId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const url = DOMAIN_SERVICE + '/posts/' + postId;
    return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}