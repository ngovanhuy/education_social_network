let events = require('events');
let Utils = require('../application/utils');
let GroupEvents = new events.EventEmitter();

module.exports.GroupEvents = GroupEvents;
module.exports.addNewGroupHandler = function(handler) {
    if (typeof(handler) === 'function') {
        GroupEvents.on('new', handler);
    }
}

module.exports.addRemoveGroupHandler = function(handler) {
    if (typeof(handler) === 'function') {
        GroupEvents.on('remove', handler);
    }
}

module.exports.addUpdateGroupHandler = function(handler) {
    if (typeof(handler) === 'function') {
        GroupEvents.on('update', handler);
    }
}