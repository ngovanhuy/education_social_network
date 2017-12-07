import {classConstants, userConstants} from '../constants';

export function authentication(state = {}, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user,
                error: ''
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        case userConstants.USERS_GETBYID_REQUEST:
            return {
                ...state,
                error: ''
            };
        case userConstants.USERS_GETBYID_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user
            };
        case userConstants.USERS_GETBYID_FAILURE:
            return {};
        case userConstants.USERS_UPDATE_REQUEST:
            return {
                ...state,
                error: ''
            };
        case userConstants.USERS_UPDATE_SUCCESS:
            return {
                ...state,
                user: action.user
            };
        case userConstants.USERS_UPDATE_FAILURE:
            return {};
        case userConstants.USERS_GETCLASSJOINED_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case userConstants.USERS_GETCLASSJOINED_SUCCESS:
            return {
                ...state,
                loading: false,
                classUserJoined: action.classes
            };
        case userConstants.USERS_GETCLASSJOINED_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case userConstants.USERS_GETCLASSREQUEST_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case userConstants.USERS_GETCLASSREQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                classUserRequest: action.classes
            };
        case userConstants.USERS_GETCLASSREQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                classUserRequest: [],
                error: action.error
            };
        case userConstants.USERS_GETPOSTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case userConstants.USERS_GETPOSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.posts
            };
        case userConstants.USERS_GETPOSTS_FAILURE:
            return {
                ...state,
                loading: false,
                posts: [],
                error: action.error
            };
        case userConstants.USERS_GETCOMMENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case userConstants.USERS_GETCOMMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: (state.posts && state.posts.length > 0) ?
                    (
                        state.posts.map(post => post.id == action.data.post.postID ?
                            {
                                ...post,
                                comments: action.data.comments
                            } : post
                        )
                    ) : []
            };
        case userConstants.USERS_GETCOMMENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case userConstants.USERS_GETFAVOURITES_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case userConstants.USERS_GETFAVOURITES_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: (state.posts && state.posts.length > 0) ?
                    (
                        state.posts.map(post => post.id == action.data.post.postID ?
                            {
                                ...post,
                                favourites: action.data.likes
                            } : post
                        )

                    ) : []
            };
        case userConstants.USERS_GETFAVOURITES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case  userConstants.USERS_UPDATEPOSTINFO_SUCCESS:
            return {
                ...state,
                posts: (state.posts && state.posts.length > 0) &&
                (
                    state.posts.map(post => post.id == action.postDetail.id ?
                        {
                            ...post,
                            ...action.postDetail,
                        } : post
                    )
                )
            };
        case userConstants.USERS_DELETECLASSREQUEST_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case userConstants.USERS_DELETECLASSREQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case userConstants.USERS_DELETECLASSREQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case userConstants.USERS_CREATECLASSREQUEST_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case userConstants.USERS_CREATECLASSREQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case userConstants.USERS_CREATECLASSREQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case userConstants.USERS_APPROVECLASSREQUEST_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case userConstants.USERS_APPROVECLASSREQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case userConstants.USERS_APPROVECLASSREQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}