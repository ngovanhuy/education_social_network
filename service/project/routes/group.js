let express = require('express');
let router = express.Router();
let groupController = require('../controllers/group');
let userController = require('../controllers/user');
let fileController = require('../controllers/fileitem');

/*-------------------GROUP_API-----------------------*/
// router.route('/').post(groupController.postGroup, groupController.getGroup);
router.route('/all').get(groupController.getGroups);
router.route('/create/:userID').post(userController.checkUserRequest, groupController.postGroup, groupController.getGroup);
router.route('/info/:groupID').get(groupController.checkGroupRequest, groupController.getGroup);
router.route('/profileImage/:groupID')
    .get(groupController.checkGroupRequest, groupController.getProfileImageID, fileController.getFile)
    .put(groupController.checkGroupRequest, fileController.profileUpload, fileController.postFile, groupController.putProfileImage)
    .post(groupController.checkGroupRequest, fileController.profileUpload, fileController.postFile, groupController.putProfileImage, );
router.route('/members/:groupID').get(groupController.checkGroupRequest, groupController.getMembers);
router.route('/members/:groupID/:userID')
    .get(groupController.checkGroupRequest, userController.getUser)
    .post(groupController.checkGroupRequest, groupController.addMember)
    .put(groupController.checkGroupRequest, groupController.updateMember)
    .delete(groupController.checkGroupRequest, groupController.removeMember);

router.route('/requested/:groupID').get(groupController.checkGroupRequest, groupController.getRequesteds);
router.route('/requested/:groupID/:userID')
    .post(groupController.checkGroupRequest, groupController.confirmRequested)
    .delete(groupController.checkGroupRequest, groupController.removeRequested);
router.route('/action/:groupID/:userID')
    .put(groupController.checkGroupRequest, groupController.putGroup, groupController.getGroup)
    .delete(groupController.checkGroupRequest, groupController.deleteGroup, groupController.getGroup);
router.route('/files/:groupID')
    .get(groupController.checkGroupRequest, groupController.getFiles)
    // .post(groupController.checkGroupRequest, fileController.fileUpload, fileController.postFile, fileController.getInfoFile )
    .post(groupController.checkGroupRequest, fileController.arrayFileUpload, fileController.postFiles, fileController.getInfoFiles);
router.route('/search').get(groupController.searchGroupByName);
router.route('/post/:groupID').get(groupController.checkGroupRequest, groupController.getPosts);
router.route('/post/:groupID/:userID')
    .get(groupController.checkGroupRequest, groupController.getPosts)
    .post(groupController.checkGroupRequest, fileController.fileUpload, fileController.postFileIfHave, groupController.addPost, groupController.getGroup);

module.exports = router;