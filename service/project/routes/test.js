let express = require('express');
let router = express.Router();
let fileController = require('../controllers/fileitem');
let userController = require('../controllers/user');
let groupController = require('../controllers/group');
let Utils = require('../application/utils');

router.route('/files').get(fileController.getFiles);
router.route('/users').get(userController.getUsers)
    .post(async function(req, res) {
        let userIDs =  Utils.getStringArray(req.body.members);
        let users = await userController.getManyUsers(userIDs);
        return res.send(users);
    }) ;
router.route('/groups').get(groupController.getGroups);

router.route('/bodys').post(function (req, res) {
    return res.send(Utils.getStringArray(req.body.members));
});

module.exports = router;