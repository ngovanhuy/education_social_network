import {classConstants, eventConstants} from '../constants';

export function events(state = {loading: false, items: [], eventDetail: {}}, action) {
    switch (action.type) {
        case eventConstants.EVENTS_GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case eventConstants.EVENTS_GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.events
            };
        case eventConstants.EVENTS_GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case eventConstants.EVENTS_FILTER_REQUEST:
            return {
                ...state,
                loading: true,
                filters: action.filters
            };
        case eventConstants.EVENTS_FILTER_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.events
            };
        case eventConstants.EVENTS_FILTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case eventConstants.EVENTS_GETBYID_REQUEST:
            return {
                ...state,
                loading: true
            };
        case eventConstants.EVENTS_GETBYID_SUCCESS:
            return {
                ...state,
                loading: false,
                eventDetail: action.classDetail
            };
        case eventConstants.EVENTS_GETBYID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case eventConstants.EVENTS_INSERT_REQUEST:
            return {
                ...state,
            };
        case eventConstants.EVENTS_INSERT_SUCCESS:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.eventDetail
                ]
            };
        case eventConstants.EVENTS_INSERT_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case eventConstants.EVENTS_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case eventConstants.EVENTS_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                eventDetail: action.eventDetail
            };
        case eventConstants.EVENTS_UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}