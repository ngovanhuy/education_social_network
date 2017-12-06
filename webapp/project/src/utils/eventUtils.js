export const eventUtils = {
    updateInfoEvents
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
        allDay: event.isAllDay,
        start: event.startTime,
        end: event.startTime,
    };
    return eventAfterUpdate;
}