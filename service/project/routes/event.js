let express = require('express');
let UserController = require('../controllers/user');
let GroupController = require('../controllers/group');
let FileController = require('../controllers/fileitem');
let Utils = require('../application/utils');
let PostController = require('../controllers/post');
let EventController = require('../controllers/event');
let router = express.Router();

router.route('/').post(FileController.imageUpload, UserController.checkUserRequest, FileController.postFileIfHave, EventController.addEvent, EventController.getEvent);

router.route('/system').get(EventController.getSystemEvents);
router.route('/user/:userID').get(UserController.checkUserRequest, EventController.getUserEvents);
router.route('/group/:groupID').get(GroupController.checkGroupRequest, EventController.getGroupEvents);
router.route('/filter').get(EventController.getEvents);
router.route('/:eventID')
    .get(EventController.checkEventRequest, EventController.getEvent)
    .put(FileController.imageUpload, EventController.checkEventRequest, FileController.postFileIfHave, EventController.updateEvent, EventController.getEvent)
    .delete(EventController.checkEventRequest, EventController.removeEvent, EventController.getEvent);


module.exports = router;