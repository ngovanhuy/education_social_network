let events = require('events');
let Utils = require('../application/utils');
let PostEvents = new events.EventEmitter();

module.exports.PostEvents = PostEvents;
module.exports.addNewPostHandler = function(handler) {
    if (typeof(handler) === 'function') {
        PostEvents.on('new', handler);
    }
}

module.exports.addRemovePostHandler = function(handler) {
    if (typeof(handler) === 'function') {
        PostEvents.on('remove', handler);
    }
}

module.exports.addUpdatePostHandler = function(handler) {
    if (typeof(handler) === 'function') {
        PostEvents.on('update', handler);
    }
}