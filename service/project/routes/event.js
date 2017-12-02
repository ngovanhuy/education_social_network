let express = require('express');
let UserController = require('../controllers/user');
let GroupController = require('../controllers/group');
let Utils = require('../application/utils');
let PostController = require('../controllers/post');
let EventController = require('../controllers/event');
let router = express.Router();

router.route('/').post(UserController.checkUserRequest, EventController.addEvent);

router.route('/:eventID')
    .get(EventController.checkEventRequest, EventController.getEvent)
    .put(EventController.checkEventRequest, EventController.updateEvent, EventController.getEvent)
    .delete(EventController.checkEventRequest, EventController.removeEvent, EventController.getEvent);

router.route('/system').get(EventController.getSystemEvents);
router.route('/filter').get(EventController.getEvents);
module.exports = router;