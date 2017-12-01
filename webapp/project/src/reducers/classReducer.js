import {classConstants} from '../constants';

export function classes(state = {loading: false, items: [], classDetail: {}}, action) {
    switch (action.type) {
        case classConstants.CLASSES_GETALL_REQUEST:
            return {
                ...state,
                loading: true
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
                error: action.error
            };
        case classConstants.CLASSES_GETBYID_REQUEST:
            return {
                ...state,
                loading: true
            };
        case classConstants.CLASSES_GETBYID_SUCCESS:
            return {
                ...state,
                loading: false,
                classDetail: action.classDetail
            };
        case classConstants.CLASSES_GETBYID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        // case classConstants.CLASSES_GETBYUSERID_REQUEST:
        //     return {
        //         ...state,
        //         loading: true
        //     };
        // case classConstants.CLASSES_GETBYUSERID_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         classesByUserId: action.classes
        //     };
        // case classConstants.CLASSES_GETBYUSERID_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.error
        //     };
        case classConstants.CLASSES_INSERT_REQUEST:
            return {
                ...state,
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
                loading: true
            };
        case classConstants.CLASSES_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                classDetail: action.classDetail
            };
        case classConstants.CLASSES_UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case classConstants.CLASSES_GETMEMBERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case classConstants.CLASSES_GETMEMBERS_SUCCESS:
            return {
                ...state,
                loading: false,
                classDetail: {
                    ...state.classDetail,
                    members: action.data
                }
            };
        case classConstants.CLASSES_GETMEMBERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case classConstants.CLASSES_GETREQUESTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case classConstants.CLASSES_GETREQUESTS_SUCCESS:
            return {
                ...state,
                loading: false,
                classDetail: {
                    ...state.classDetail,
                    requests: action.data
                }
            };
        case classConstants.CLASSES_GETREQUESTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case classConstants.CLASSES_GETFILES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case classConstants.CLASSES_GETFILES_SUCCESS:
            return {
                ...state,
                loading: false,
                classDetail: {
                    ...state.classDetail,
                    files: action.data
                }
            };
        case classConstants.CLASSES_GETFILES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case classConstants.CLASSES_GETPOSTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case classConstants.CLASSES_GETPOSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                classDetail: {
                    ...state.classDetail,
                    posts: action.data
                }
            };
        case classConstants.CLASSES_GETPOSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case classConstants.CLASSES_GETPOSTSBYUSER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case classConstants.CLASSES_GETPOSTSBYUSER_SUCCESS:
            return {
                ...state,
                loading: false,
                classDetail: {
                    ...state.classDetail,
                    postsByUser: action.data
                }
            };
        case classConstants.CLASSES_GETPOSTSBYUSER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case classConstants.CLASSES_GETEVENTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case classConstants.CLASSES_GETEVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                classDetail: {
                    ...state.classDetail,
                    events: action.data
                }
            };
        case classConstants.CLASSES_GETEVENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case classConstants.CLASSES_GETEVENTSBYUSER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case classConstants.CLASSES_GETEVENTSBYUSER_SUCCESS:
            return {
                ...state,
                loading: false,
                classDetail: {
                    ...state.classDetail,
                    eventsByUser: action.data
                }
            };
        case classConstants.CLASSES_GETEVENTSBYUSER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}