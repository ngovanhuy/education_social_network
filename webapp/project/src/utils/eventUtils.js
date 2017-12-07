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
        // title: event.title,
        allDay: event.isAllDay,
        start: new Date(event.startTime),
        end: new Date(event.startTime)
    };
    return eventAfterUpdate;
}