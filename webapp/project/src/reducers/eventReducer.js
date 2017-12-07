import {classConstants, eventConstants} from '../constants';

export function events(state = {loading: false, filters:{}, items: [], eventsUpcomming: [], eventsByUser: [], eventsByClass: [], eventsNotBelongClass: [],  eventDetail: {}}, action) {
    switch (action.type) {
        case eventConstants.EVENTS_GETALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
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
                items: [],
                error: action.error
            };
        case eventConstants.EVENTS_GETBYUSER_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case eventConstants.EVENTS_GETBYUSER_SUCCESS:
            return {
                ...state,
                loading: false,
                eventsByUser: action.events
            };
        case eventConstants.EVENTS_GETBYUSER_FAILURE:
            return {
                ...state,
                loading: false,
                eventsByUser: [],
                error: action.error
            };
        case eventConstants.EVENTS_GETBYCLASS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case eventConstants.EVENTS_GETBYCLASS_SUCCESS:
            return {
                ...state,
                loading: false,
                eventsByClass: action.events
            };
        case eventConstants.EVENTS_GETBYCLASS_FAILURE:
            return {
                ...state,
                loading: false,
                eventsByClass: [],
                error: action.error
            };
        case eventConstants.EVENTS_GETNOTBELONGCLASS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case eventConstants.EVENTS_GETNOTBELONGCLASS_SUCCESS:
            return {
                ...state,
                loading: false,
                eventsNotBelongClass: action.events
            };
        case eventConstants.EVENTS_GETNOTBELONGCLASS_FAILURE:
            return {
                ...state,
                loading: false,
                eventsNotBelongClass: [],
                error: action.error
            };
        case eventConstants.EVENTS_GETUPCOMMING_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case eventConstants.EVENTS_GETUPCOMMING_SUCCESS:
            return {
                ...state,
                loading: false,
                eventsUpcomming: action.events
            };
        case eventConstants.EVENTS_GETUPCOMMING_FAILURE:
            return {
                ...state,
                loading: false,
                eventsUpcomming: [],
                error: action.error
            };
        case eventConstants.EVENTS_GETUPCOMMINGOFCLASS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case eventConstants.EVENTS_GETUPCOMMINGOFCLASS_SUCCESS:
            return {
                ...state,
                loading: false,
                eventsUpcommingOfClass: action.events
            };
        case eventConstants.EVENTS_GETUPCOMMINGOFCLASS_FAILURE:
            return {
                ...state,
                loading: false,
                eventsUpcomming: [],
                error: action.error
            };
        case eventConstants.EVENTS_FILTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
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
                items: [],
                error: action.error
            };
        case eventConstants.EVENTS_GETBYID_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case eventConstants.EVENTS_GETBYID_SUCCESS:
            return {
                ...state,
                loading: false,
                eventDetail: action.eventDetail
            };
        case eventConstants.EVENTS_GETBYID_FAILURE:
            return {
                ...state,
                loading: false,
                eventDetail: {},
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
                loading: true,
                error: ''
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
                eventDetail: {},
                error: action.error
            };
        default:
            return state
    }
}