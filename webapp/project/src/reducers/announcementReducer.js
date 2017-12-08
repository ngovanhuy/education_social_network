import {announcementConstants} from '../constants';

export function announcements(state = {loading: false, items: [], announcementDetail: {}}, action) {
    switch (action.type) {
        case announcementConstants.ANNOUNCEMENTS_GETALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case announcementConstants.ANNOUNCEMENTS_GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.announcements
            };
        case announcementConstants.ANNOUNCEMENTS_GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                items: [],
                error: action.error
            };
        case announcementConstants.ANNOUNCEMENTS_GETNEWEST_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case announcementConstants.ANNOUNCEMENTS_GETNEWEST_SUCCESS:
            return {
                ...state,
                loading: false,
                announcementsNewest: action.announcements
            };
        case announcementConstants.ANNOUNCEMENTS_GETNEWEST_FAILURE:
            return {
                ...state,
                loading: false,
                items: [],
                error: action.error
            };
        case announcementConstants.ANNOUNCEMENTS_GETBYID_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case announcementConstants.ANNOUNCEMENTS_GETBYID_SUCCESS:
            return {
                ...state,
                loading: false,
                announcementDetail: {
                    ...state.announcementDetail,
                    ...action.announcementDetail
                }
            };
        case announcementConstants.ANNOUNCEMENTS_GETBYID_FAILURE:
            return {
                ...state,
                loading: false,
                announcementDetail: {},
                error: action.error
            };
        case announcementConstants.ANNOUNCEMENTS_INSERT_REQUEST:
            return {
                ...state,
                error: ''
            };
        case announcementConstants.ANNOUNCEMENTS_INSERT_SUCCESS:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.announcementDetail
                ]
            };
        case announcementConstants.ANNOUNCEMENTS_INSERT_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case announcementConstants.ANNOUNCEMENTS_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case announcementConstants.ANNOUNCEMENTS_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                announcementDetail: {
                    ...state.announcementDetail,
                    ...action.announcementDetail
                }
            };
        case announcementConstants.ANNOUNCEMENTS_UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                announcementDetail: {},
                error: action.error
            };
        case announcementConstants.ANNOUNCEMENTS_FILTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case announcementConstants.ANNOUNCEMENTS_FILTER_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.announcements
            };
        case announcementConstants.ANNOUNCEMENTS_FILTER_FAILURE:
            return {
                ...state,
                loading: false,
                items: [],
                error: action.error
            };
        default:
            return state
    }
}