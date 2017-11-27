let express = require('express');
let router = express.Router();
let fileController = require('../controllers/fileitem');
let userController = require('../controllers/user');
let groupController = require('../controllers/group');

router.route('/files').get(fileController.getFiles);
router.route('/users').get(userController.getUsers);
router.route('/groups').get(groupController.getGroups);

module.exports = router;