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
    function success(posts) { return { type: classConstants.CLASSES_GETPOSTS_SUCCESS, posts } }
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
    function success(posts) { return { type: classConstants.CLASSES_GETPOSTSBYUSER_SUCCESS, posts } }
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
    function success(posts) { return { type: classConstants.CLASSES_GETPOSTSBYTOPIC_SUCCESS, posts } }
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

function getComments(postId, contextView) {
    return dispatch => {
        if(contextView === postConstants.CONTEXT_VIEW.IN_CLASS_PAGE){
            dispatch(classGetCommentsRequest());
        } else if(contextView === postConstants.CONTEXT_VIEW.IN_USER_PAGE || contextView === postConstants.CONTEXT_VIEW.IN_HOME_PAGE){
            dispatch(userGetCommentsRequest());
        } else {
            dispatch(classGetCommentsRequest());
            dispatch(userGetCommentsRequest());
        }

        postService.getComments(postId)
            .then(
                response => {
                    if(contextView === postConstants.CONTEXT_VIEW.IN_CLASS_PAGE){
                        dispatch(classGetCommentsSuccess(response.data));
                    } else if(contextView === postConstants.CONTEXT_VIEW.IN_USER_PAGE || contextView === postConstants.CONTEXT_VIEW.IN_HOME_PAGE){
                        dispatch(userGetCommentsSuccess(response.data))
                    } else {
                        dispatch(classGetCommentsSuccess(response.data));
                        dispatch(userGetCommentsSuccess(response.data))
                    }
                },
                error => {
                    if(contextView === postConstants.CONTEXT_VIEW.IN_CLASS_PAGE){
                        dispatch(classGetCommentsfailure(error));
                    } else if(contextView === postConstants.CONTEXT_VIEW.IN_USER_PAGE || contextView === postConstants.CONTEXT_VIEW.IN_HOME_PAGE){
                        dispatch(userGetCommentsfailure(error));
                    } else{
                        dispatch(classGetCommentsfailure(error));
                        dispatch(userGetCommentsfailure(error));
                    }
                }
            );
    };

    function classGetCommentsRequest() { return { type: classConstants.CLASSES_GETCOMMENTS_REQUEST } }
    function userGetCommentsRequest() { return { type: userConstants.USERS_GETCOMMENTS_REQUEST } }
    function classGetCommentsSuccess(data) { return { type: classConstants.CLASSES_GETCOMMENTS_SUCCESS, data } }
    function userGetCommentsSuccess(data) { return { type: userConstants.USERS_GETCOMMENTS_SUCCESS, data } }
    function classGetCommentsfailure(error) { return { type: classConstants.CLASSES_GETCOMMENTS_FAILURE, error } }
    function userGetCommentsfailure(error) { return { type: userConstants.USERS_GETCOMMENTS_FAILURE, error } }
}

function insertComment(postId, userID, content, fileUpload, contextView) {
    return dispatch => {
        dispatch(request());

        postService.insertComment(postId, userID, content, fileUpload)
            .then(
                response => {
                    dispatch(success());
                    dispatch(_updateInfoPost(postId, contextView));
                    dispatch(getComments(postId, contextView));
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: postConstants.POSTS_INSERTCOMMENT_REQUEST } }
    function success() { return { type: postConstants.POSTS_INSERTCOMMENT_SUCCESS } }
    function failure(error) { return { type: postConstants.POSTS_INSERTCOMMENT_FAILURE, error } }
}

function getFavourites(postId, contextView) {
    return dispatch => {
        if(contextView === postConstants.CONTEXT_VIEW.IN_CLASS_PAGE){
            dispatch(classGetFavouriteRequest());
        } else if(contextView === postConstants.CONTEXT_VIEW.IN_USER_PAGE || contextView === postConstants.CONTEXT_VIEW.IN_HOME_PAGE){
            dispatch(userGetFavouriteRequest());
        } else {
            dispatch(classGetFavouriteRequest());
            dispatch(userGetFavouriteRequest());
        }

        postService.getFavourites(postId)
            .then(
                response => {
                    if(contextView === postConstants.CONTEXT_VIEW.IN_CLASS_PAGE){
                        dispatch(classGetFavouriteSuccess(response.data));
                    } else if(contextView === postConstants.CONTEXT_VIEW.IN_USER_PAGE || contextView === postConstants.CONTEXT_VIEW.IN_HOME_PAGE){
                        dispatch(userGetFavouriteSuccess(response.data));
                    } else {
                        dispatch(classGetFavouriteSuccess(response.data));
                        dispatch(userGetFavouriteSuccess(response.data));
                    }
                },
                error => {
                    if(contextView === postConstants.CONTEXT_VIEW.IN_CLASS_PAGE){
                        dispatch(classGetFavouriteFailure(error))
                    } else if(contextView === postConstants.CONTEXT_VIEW.IN_USER_PAGE || contextView === postConstants.CONTEXT_VIEW.IN_HOME_PAGE){
                        dispatch(userGetFavouriteFailure(error))
                    } else {
                        dispatch(classGetFavouriteFailure(error))
                        dispatch(userGetFavouriteFailure(error))
                    }
                }
            );
    };

    function classGetFavouriteRequest() { return { type: classConstants.CLASSES_GETFAVOURITES_REQUEST } }
    function userGetFavouriteRequest() { return { type: userConstants.USERS_GETFAVOURITES_REQUEST } }
    function classGetFavouriteSuccess(data) { return { type: classConstants.CLASSES_GETFAVOURITES_SUCCESS, data } }
    function userGetFavouriteSuccess(data) { return { type: userConstants.USERS_GETFAVOURITES_SUCCESS, data } }
    function classGetFavouriteFailure(error) { return { type: classConstants.CLASSES_GETFAVOURITES_FAILURE, error } }
    function userGetFavouriteFailure(error) { return { type: userConstants.USERS_GETFAVOURITES_FAILURE, error } }
}

function insertFavourite(post, userID, contextView) {
    return dispatch => {
        dispatch(request());

        postService.insertFavourite(post.id, userID)
            .then(
                response => {
                    dispatch(success());
                    dispatch(getFavourites(post.id, contextView));
                    dispatch(_updateInfoPost(post.id, contextView));
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: postConstants.POSTS_INSERTFAVOURITE_REQUEST } }
    function success() { return { type: postConstants.POSTS_INSERTFAVOURITE_SUCCESS } }
    function failure(error) { return { type: postConstants.POSTS_INSERTFAVOURITE_FAILURE, error } }
}

function deleteFavourite(post, userID, contextView) {
    return dispatch => {
        dispatch(request());

        postService.deleteFavourite(post.id, userID)
            .then(
                response => {
                    dispatch(success());
                    dispatch(getFavourites(post.id, contextView));
                    dispatch(_updateInfoPost(post.id, contextView));
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: postConstants.POSTS_DELETEFAVOURITE_REQUEST } }
    function success() { return { type: postConstants.POSTS_DELETEFAVOURITE_SUCCESS } }
    function failure(error) { return { type: postConstants.POSTS_DELETEFAVOURITE_FAILURE, error } }
}

function _updateInfoPost(postId, contextView) {
    return dispatch => {
        dispatch(request());

        postService.getById(postId)
            .then(
                response => {
                    dispatch(success());
                    if(contextView === postConstants.CONTEXT_VIEW.IN_USER_PAGE || contextView === postConstants.CONTEXT_VIEW.IN_HOME_PAGE){
                        dispatch(updatePostInfoInPostsByUserId(response.data))
                    } else if(contextView === postConstants.CONTEXT_VIEW.IN_CLASS_PAGE){
                        dispatch(updatePostInfoInPostsByClassIdUserId(postId))
                    } else {
                        dispatch(updatePostInfoInPostsByUserId(response.data))
                        dispatch(updatePostInfoInPostsByClassIdUserId(postId))
                    }
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: postConstants.POSTS_UPDATEPOSTINFO_REQUEST } }
    function success() { return { type: postConstants.POSTS_UPDATEPOSTINFO_SUCCESS } }
    function updatePostInfoInPostsByUserId(postDetail) { return { type: userConstants.USERS_UPDATEPOSTINFO_SUCCESS, postDetail } }
    function updatePostInfoInPostsByClassIdUserId(postDetail) { return { type: classConstants.CLASSES_UPDATEPOSTINFO_SUCCESS, postDetail } }
    function failure(error) { return { type: postConstants.POSTS_UPDATEPOSTINFO_FAILURE, error } }
}

