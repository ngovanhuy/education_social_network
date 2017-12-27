let events = require('events');
let Utils = require('../application/utils');
let AnnouncementEvents = new events.EventEmitter();

module.exports.AnnouncementEvents = AnnouncementEvents;
module.exports.addNewAnnouncementHandler = function(handler) {
    if (typeof(handler) === 'function') {
        AnnouncementEvents.on('new', handler);
    }
}

module.exports.addRemoveAnnouncementHandler = function(handler) {
    if (typeof(handler) === 'function') {
        AnnouncementEvents.on('remove', handler);
    }
}

module.exports.addUpdateAnnouncementHandler = function(handler) {
    if (typeof(handler) === 'function') {
        AnnouncementEvents.on('update', handler);
    }
}