import {classService, postService} from "../services";
import {classConstants, postConstants, userConstants} from "../constants";
import {history} from "../helpers/history";

export const postActions = {
    getPostsByUserId,
    getPostsByClassId,
    getPostsByClassIdUserId,
    getPostsByClassIdTopicName,
    insert,
    getComments,
    insertComment,
    getFavourites,
    insertFavourite,
    deleteFavourite,
};

function getPostsByUserId(userId) {
    return dispatch => {
        dispatch(request());

        postService.getPostsByUserId(userId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERS_GETPOSTS_REQUEST } }
    function success(posts) { return { type: userConstants.USERS_GETPOSTS_SUCCESS, posts } }
    function failure(error) { return { type: userConstants.USERS_GETPOSTS_FAILURE, error } }
}

function getPostsByClassId(classId) {
    return dispatch => {
        dispatch(request());

        postService.getPostsByClassId(classId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_GETPOSTS_REQUEST } }
    function success(data) { return { type: classConstants.CLASSES_GETPOSTS_SUCCESS, data } }
    function failure(error) { return { type: classConstants.CLASSES_GETPOSTS_FAILURE, error } }
}

function getPostsByClassIdUserId(classId, userId) {
    return dispatch => {
        dispatch(request());

        postService.getPostsByClassIdUserId(classId, userId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_GETPOSTSBYUSER_REQUEST } }
    function success(data) { return { type: classConstants.CLASSES_GETPOSTSBYUSER_SUCCESS, data } }
    function failure(error) { return { type: classConstants.CLASSES_GETPOSTSBYUSER_FAILURE, error } }
}

function getPostsByClassIdTopicName(classId, topicName) {
    return dispatch => {
        dispatch(request());

        postService.getPostsByTopicName(classId, topicName)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_GETPOSTSBYTOPIC_REQUEST } }
    function success(data) { return { type: classConstants.CLASSES_GETPOSTSBYTOPIC_SUCCESS, data } }
    function failure(error) { return { type: classConstants.CLASSES_GETPOSTSBYTOPIC_FAILURE, error } }
}

function insert(classId, userId, title, content, fileUpload, scopeType, topic, isSchedule, members, startTime, endTime) {
    return dispatch => {
        dispatch(request());

        postService.insert(classId, userId, title, content, fileUpload, scopeType, topic, isSchedule, members, startTime, endTime)
            .then(
                response => {
                    dispatch(success());
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_INSERTPOST_REQUEST } }
    function success() { return { type: classConstants.CLASSES_INSERTPOST_SUCCESS } }
    function failure(error) { return { type: classConstants.CLASSES_INSERTPOST_FAILURE, error } }
}

function getComments(postId) {
    return dispatch => {
        dispatch(request());

        postService.getComments(postId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_GETCOMMENTS_REQUEST } }
    function success(data) { return { type: classConstants.CLASSES_GETCOMMENTS_SUCCESS, data } }
    function failure(error) { return { type: classConstants.CLASSES_GETCOMMENTS_FAILURE, error } }
}

function insertComment(postId, userID, content, fileUpload) {
    return dispatch => {
        dispatch(request());

        postService.insertComment(postId, userID, content, fileUpload)
            .then(
                response => {
                    dispatch(success());
                    dispatch(getComments(postId));
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_INSERTCOMMENT_REQUEST } }
    function success() { return { type: classConstants.CLASSES_INSERTCOMMENT_SUCCESS } }
    function failure(error) { return { type: classConstants.CLASSES_INSERTCOMMENT_FAILURE, error } }
}

function getFavourites(postId) {
    return dispatch => {
        dispatch(request());

        postService.getFavourites(postId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_GETFAVOURITES_REQUEST } }
    function success(data) { return { type: classConstants.CLASSES_GETFAVOURITES_SUCCESS, data } }
    function failure(error) { return { type: classConstants.CLASSES_GETFAVOURITES_FAILURE, error } }
}

function insertFavourite(postId, userID, content, fileUpload) {
    return dispatch => {
        dispatch(request());

        postService.insertFavourite(postId, userID)
            .then(
                response => {
                    dispatch(success());
                    dispatch(getFavourites(postId));
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_INSERTFAVOURITES_REQUEST } }
    function success() { return { type: classConstants.CLASSES_INSERTFAVOURITES_SUCCESS } }
    function failure(error) { return { type: classConstants.CLASSES_INSERTFAVOURITES_FAILURE, error } }
}

function deleteFavourite(postId, userID, content, fileUpload) {
    return dispatch => {
        dispatch(request());

        postService.deleteFavourite(postId, userID, content, fileUpload)
            .then(
                response => {
                    dispatch(success());
                    dispatch(getFavourites(postId));
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: classConstants.CLASSES_DELETEFAVOURITE_REQUEST } }
    function success() { return { type: classConstants.CLASSES_DELETEFAVOURITE_SUCCESS } }
    function failure(error) { return { type: classConstants.CLASSES_DELETEFAVOURITE_FAILURE, error } }
}

