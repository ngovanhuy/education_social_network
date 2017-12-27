let events = require('events');
let Utils = require('../application/utils');
let UserEvents = new events.EventEmitter();

module.exports.UserEvents = UserEvents;
module.exports.addNewUserHandler = function(handler) {
    if (typeof(handler) === 'function') {
        UserEvents.on('new', handler);
    }
}

module.exports.addRemoveUserHandler = function(handler) {
    if (typeof(handler) === 'function') {
        UserEvents.on('remove', handler);
    }
}

module.exports.addUpdateUserHandler = function(handler) {
    if (typeof(handler) === 'function') {
        UserEvents.on('update', handler);
    }
}