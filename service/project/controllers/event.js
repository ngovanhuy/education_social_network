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
        let events = await EventItem.find({context: 100});
        return res.json({
            code: 200,
            message
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

    } catch(error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error
        });
    }
}
async function getEvent(req, res) {
    try {

    } catch(error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error
        });
    }
}
async function addEvent(req, res) {
    try {

    } catch(error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error
        });
    }
}

async function removeEvent(req, res) {
    try {

    } catch(error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error
        });
    }
}

async function updateEvent(req, res) {
    try {

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



