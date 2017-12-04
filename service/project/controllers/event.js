let Users = require('../controllers/user');
let Groups = require('../controllers/group');
let EventItem = require('../models/event');
let Utils = require('../application/utils');

async function getEventByID(id) {
    try {
        let eventID = Number(id);
        if (isNaN(eventID)) return null;
        return await EventItem.findOne({_id: eventID});
    } catch(error) {
        return null;
    }
}
async function importEvent(req, res) {
//TODO: ImportEvent
}
async function findEvent(req) {
    if (req.events.event_requested) {
        return req.events.event_requested;
    }
    let id = null;
    if (req.query.eventID) {
        id = req.query.eventID;
    } else if (req.params.eventID) {
        id = req.params.eventID;
    } else if (req.body.eventID) {
        id = req.body.eventID;
    }
    if (id) {
        return await getEventByID(id);
    }
    return null;
}

async function checkEventRequest(req, res, next) {
    try {
        let event = await findEvent(req);
        if (event && !event.isDeleted) {
            req.events.event_requested = event;
            return next();
        } else {
            req.events.event_requested = null;
            return res.status(400).send({
                status: 400,
                message: 'Event not exited or deleted',
                data: null
            });
        }
    } catch(error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error
        });
    }
}

async function getSystemEvents(req, res) {
    try {
        let events = await EventItem.find({isDeleted: false, context: 100});
        return res.json({
            code: 200,
            message: 'Success',
            data: events.map(event => event.getBasicInfo()),
        });
    } catch(error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error
        });
    }
}
async function getGroupEvents(req, res) {
    try {
        let group = req.groups.group_request;
        let events = await EventItem.find({isDeleted: false, context: 10, contextID: group._id});
        return res.json({
            code: 200,
            message: 'Success',
            data: events.map(event => event.getBasicInfo()),
        });
    } catch(error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error
        });
    }
}
async function getUserEvents(req, res) {
    try {
        let user = req.users.user_request;
        let events = await EventItem.find({isDeleted: false, context: 1, contextID:user._id});
        return res.json({
            code: 200,
            message: 'Success',
            data: events.map(event => event.getBasicInfo()),
        });
    } catch(error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error
        });
    }
}

async function getEvents(req, res) {
    try {
        let userID = req.query.userID;
        let groupID = req.query.groupID;
        let startTime = req.body.startTime ? Utils.parseDate(req.body.startTime) : null;
        let endTime = req.body.endTime ? Utils.parseDate(req.body.endTime) : null;
        let title = req.body.title;


        let findObject = {};
        if (userID) findObject.userID = userID;
        if (groupID) {
            findObject.contextID = 10,
            findObject.groupID = groupID;
        }

        let events = await EventItem.find(findObject);
        return res.json({
            code: 200,
            message: 'Success',
            data: events.map(event => event.getBasicInfo()),
        });
    } catch(error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error
        });
    }
}
function getEvent(req, res) {
    try {
        let event = req.events.event_requested;
        return res.status(200).json({
            code: 200,
            message: 'Success',
            data: event.getBasicInfo(),
        });
    } catch(error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error
        });
    }
}
async function addEvent(req, res, next) {
    try {
        let user = req.users.user_request;
        let title = req.body.title;
        let content = req.body.content;
        let eventImageID = req.fileitems.file_selected_id ? String(req.fileitems.file_selected_id) : null;
        let location = req.body.location ? req.body.location : '';
        let context = req.body.context ? req.body.context : 100;//system_context
        let contextID = req.body.contextID ? req.body.contextID : null;
        let isAllDay = req.body.isAllDay ? req.body.isAllDay === 'true' : false;
        let startTime = req.body.startTime ? Utils.parseDate(req.body.startTime) : null;
        let endTime = req.body.endTime ? Utils.parseDate(req.body.endTime) : null;

        if (!title || !content || !location) {
            return res.status(400).send({
                code: 400,
                message: 'Request Invalid',
                data: null,
                error: 'Data not exited'
            });
        }
        let now = new Date();
        let event = new EventItem({
            _id: now.getTime(),
            title: title,
            content: content,
            eventImageID: eventImageID,
            location: location,
            isAllDay: isAllDay,
            startTime: startTime,
            endTime: endTime,
        });
        event.usercreate = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImageID: user.profileImageID,
            timeUpdate: now,
        };
        if (!event.setContext(context, contextID)){
            return res.status(400).send({
                code: 400,
                message: 'Request Invalid',
                data: null,
                error: 'context, contextID invalid'
            });
        }
        event = await event.save();
        req.events.event_requested = event;
        return next();
    } catch(error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error
        });
    }
}
async function removeEvent(req, res, next) {
    try {
        let event = await findEvent(req);
        req.events.event_requested = event;
        if (!event) {
            return res.status(400).send({
                code: 400,
                message: 'Event Existed',
                data: null
            });
        }
        if (event.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Event deleted.',
                data: null
            });
        } else {
            event.isDeleted = true;
            event = await event.save();
            req.events.event_requested = event;
        }
        return next();
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
async function updateEvent(req, res, next) {
    try {
        let event = req.events.event_requested;
        let title = req.body.title;
        let content = req.body.content;
        let eventImageID = req.fileitems.file_selected_id ? String(req.fileitems.file_selected_id) : null;
        let location = req.body.location ? req.body.location : null;
        let context = req.body.context;
        let contextID = req.body.contextID;
        let isAllDay = req.body.isAllDay;
        let startTime = req.body.startTime ? Utils.parseDate(req.body.startTime) : null;
        let endTime = req.body.endTime ? Utils.parseDate(req.body.endTime) : null;

        if (title) event.title = title;
        if (content) event.content = content;
        if (eventImageID) event.eventImageID = eventImageID;
        if (location) event.location = location;
        if (isAllDay) event.isAllDay = isAllDay === 'true';
        if (startTime) event.startTime = startTime;
        if (endTime) event.endTime = endTime;
        if (context && EventItem.isInvalidContext(context)) {
            event.context = context;
        }
        if (contextID && EventItem.isInvalidContextID(contextID)) {
            event.contextID = contextID;
        }
        event = await event.save();
        req.events.event_requested = event;
        return next();
    } catch(error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error
        });
    }
}

exports.getEvent = getEvent;
exports.getSystemEvents = getSystemEvents;
exports.getEvents = getEvents;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
exports.updateEvent = updateEvent;
exports.checkEventRequest = checkEventRequest;
exports.importEvent = importEvent;
exports.getGroupEvents = getGroupEvents;
exports.getUserEvents = getUserEvents;



