let events = require('events');
let announcementEvents = new events.EventEmitter();
let config = require('config');
let sendGridToken = config.get("sendgrid.token");

module.exports = {
    manager: require('./manager'),
    utils: require('./utils'),
    events: {
        announcement: announcementEvents,
    },
};