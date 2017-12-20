import {DOMAIN_SERVICE} from "../constants";

export const eventUtils = {
    updateInfoEvents,
    getICSSource,
}

function updateInfoEvents(events) {
    var eventsAfterUpdate = (events && events.length > 0) ?
        events.map((event) => _updateInfoEvent(event))
        : []
    return eventsAfterUpdate;
}

function _updateInfoEvent(event) {
    var eventAfterUpdate = {
        ...event,
        // title: event.title,
        allDay: event.isAllDay,
        start: new Date(event.startTime),
        end: new Date(event.endTime)
    };
    return eventAfterUpdate;
}

function getICSSource(eventId) {
    return DOMAIN_SERVICE + "/events/export/" + eventId;
}