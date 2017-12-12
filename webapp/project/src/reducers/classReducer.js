import {classConstants} from '../constants';

export function classes(state = {loading: false, items: [], classDetail: {}}, action) {
    switch (action.type) {
        case classConstants.CLASSES_GETALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case classConstants.CLASSES_GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.classes
            };
        case classConstants.CLASSES_GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                items: [],
                error: action.error
            };
        case classConstants.CLASSES_GETBYID_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case classConstants.CLASSES_GETBYID_SUCCESS:
            return {
                ...state,
                loading: false,
                classDetail: {
                    ...state.classDetail,
                    ...action.classDetail
                }
            };
        case classConstants.CLASSES_GETBYID_FAILURE:
            return {
                ...state,
                loading: false,
                classDetail: {},
                error: action.error
            };
        case classConstants.CLASSES_INSERT_REQUEST:
            return {
                ...state,
                error: ''
            };
        case classConstants.CLASSES_INSERT_SUCCESS:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.classDetail
                ]
            };
        case classConstants.CLASSES_INSERT_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case classConstants.CLASSES_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case classConstants.CLASSES_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                classDetail: {
                    ...state.classDetail,
                    ...action.classDetail
                }
            };
        case classConstants.CLASSES_UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                classDetail: {},
                error: action.error
            };
        case classConstants.CLASSES_GETMEMBERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case classConstants.CLASSES_GETMEMBERS_SUCCESS:
            return {
                ...state,
                loading: false,
                members: action.data
            };
        case classConstants.CLASSES_GETMEMBERS_FAILURE:
            return {
                ...state,
                loading: false,
                members: [],
                error: action.error
            };
        case classConstants.CLASSES_GETREQUESTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case classConstants.CLASSES_GETREQUESTS_SUCCESS:
            return {
                ...state,
                loading: false,
                requests: action.data,
            };
        case classConstants.CLASSES_GETREQUESTS_FAILURE:
            return {
                ...state,
                loading: false,
                requests: [],
                error: action.error
            };
        case classConstants.CLASSES_GETFILES_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case classConstants.CLASSES_GETFILES_SUCCESS:
            return {
                ...state,
                loading: false,
                files: action.data
            };
        case classConstants.CLASSES_GETFILES_FAILURE:
            return {
                ...state,
                loading: false,
                files: [],
                error: action.error
            };
        case classConstants.CLASSES_GETPOSTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case classConstants.CLASSES_GETPOSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.posts
            };
        case classConstants.CLASSES_GETPOSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                posts: []
            };
        case classConstants.CLASSES_GETPOSTSBYUSER_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case classConstants.CLASSES_GETPOSTSBYUSER_SUCCESS:
            return {
                ...state,
                loading: false,
                postsByUser: action.posts
            };
        case classConstants.CLASSES_GETPOSTSBYUSER_FAILURE:
            return {
                ...state,
                loading: false,
                postsByUser: [],
                error: action.error
            };
        case classConstants.CLASSES_GETEVENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case classConstants.CLASSES_GETEVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: action.data
            };
        case classConstants.CLASSES_GETEVENTS_FAILURE:
            return {
                ...state,
                loading: false,
                events: [],
                error: action.error
            };
        case classConstants.CLASSES_GETEVENTSBYUSER_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case classConstants.CLASSES_GETEVENTSBYUSER_SUCCESS:
            return {
                ...state,
                loading: false,
                eventsByUser: action.data
            };
        case classConstants.CLASSES_GETEVENTSBYUSER_FAILURE:
            return {
                ...state,
                loading: false,
                eventsByUser: [],
                error: action.error
            };
        case classConstants.CLASSES_GETTOPICS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case classConstants.CLASSES_GETTOPICS_SUCCESS:
            return {
                ...state,
                loading: false,
                topics: action.data
            };
        case classConstants.CLASSES_GETTOPICS_FAILURE:
            return {
                ...state,
                loading: false,
                topics: [],
                error: action.error
            };
        case classConstants.CLASSES_INSERTPOST_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case classConstants.CLASSES_INSERTPOST_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case classConstants.CLASSES_INSERTPOST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case classConstants.CLASSES_GETCOMMENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case classConstants.CLASSES_GETCOMMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                postsByUser: (state.postsByUser && state.postsByUser.length > 0) ?
                    (
                        state.postsByUser.map(post => post.id == action.data.post.postID ?
                            {
                                ...post,
                                comments: action.data.comments
                            } : post
                        )
                    ) : [],
            };
        case classConstants.CLASSES_GETCOMMENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case classConstants.CLASSES_GETFAVOURITES_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case classConstants.CLASSES_GETFAVOURITES_SUCCESS:
            return {
                ...state,
                loading: false,
                postsByUser: (state.postsByUser && state.postsByUser.length > 0) ?
                    (
                        state.postsByUser.map(post => post.id == action.data.post.postID ?
                            {
                                ...post,
                                favourites: action.data.likes
                            } : post
                        )
                    ) : []
            };
        case classConstants.CLASSES_GETFAVOURITES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case classConstants.CLASSES_DELETEFAVOURITE_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case classConstants.CLASSES_DELETEFAVOURITE_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case classConstants.CLASSES_DELETEFAVOURITE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case classConstants.CLASSES_UPDATEPOSTINFO_SUCCESS:
            return {
                ...state,
                postsByUser: (state.postsByUser && state.postsByUser.length > 0) &&
                (
                    state.postsByUser.map(post => post.id == action.postDetail.id ?
                        {
                            ...post,
                            ...action.postDetail,
                        } : post
                    )
                )
            };
        case classConstants.CLASSES_DELETEMEMBER_REQUEST:
            return {
                ...state,
                error: ''
            };
        case classConstants.CLASSES_DELETEMEMBER_SUCCESS:
            return {
                ...state
            };
        case classConstants.CLASSES_DELETEMEMBER_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case classConstants.CLASSES_ADDMEMBER_REQUEST:
            return {
                ...state,
                error: ''
            };
        case classConstants.CLASSES_ADDMEMBER_SUCCESS:
            return {
                ...state
            };
        case classConstants.CLASSES_ADDMEMBER_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case classConstants.CLASSES_DELETECLASS_REQUEST:
            return {
                ...state,
                error: ''
            };
        case classConstants.CLASSES_DELETECLASS_SUCCESS:
            return {
                ...state
            };
        case classConstants.CLASSES_DELETECLASS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case classConstants.CLASSES_DELETEFILE_REQUEST:
            return {
                ...state,
                error: ''
            };
        case classConstants.CLASSES_DELETEFILE_SUCCESS:
            return {
                ...state
            };
        case classConstants.CLASSES_DELETEFILE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case classConstants.CLASSES_UPLOADFILE_REQUEST:
            return {
                ...state,
                error: ''
            };
        case classConstants.CLASSES_UPLOADFILE_SUCCESS:
            return {
                ...state
            };
        case classConstants.CLASSES_UPLOADFILE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case classConstants.CLASSES_ADDTOPIC_REQUEST:
            return {
                ...state,
                error: ''
            };
        case classConstants.CLASSES_ADDTOPIC_SUCCESS:
            return {
                ...state
            };
        case classConstants.CLASSES_ADDTOPIC_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state
    }
}