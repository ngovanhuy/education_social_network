let express = require('express');
let router = express.Router();

let userController = require('../controllers/user');
let fileController = require('../controllers/fileitem');
let groupController = require('../controllers/group');
let authController = require('../controllers/auth');

/*-------------------API-------------------------*/
router.use(authController.isAuthenticated);
router.route('/')
    .post(userController.checkSystemAccount, userController.postUser, userController.getUser)
    .get(userController.putCurrentUser, userController.getUser)
    .put(userController.putCurrentUser, userController.putUser, userController.getUser);
router.route('/manager/:userID')
    .get(userController.checkUserRequest, userController.getUser)
    // .put(userController.checkUserRequest, userController.checkSystemOrCurrentAccount, userController.putUser, userController.getUser)
    .put(userController.checkSystemAccount, userController.checkUserRequest, userController.putUser, userController.getUser)
    .delete(userController.checkSystemAccount, userController.checkUserRequest, userController.deleteUser, userController.getUser);
router.route('/profileImage/:userID')
    .get(userController.checkUserRequest, userController.getProfileImageID, fileController.checkFileRequest, fileController.getFile);
router.route('/profileImage')
    .get(userController.putCurrentUser, userController.getProfileImageID, fileController.checkFileRequest, fileController.getFile)
    .put(userController.putCurrentUser, fileController.profileUpload, userController.getProfileImageID, fileController.checkFileRequestIfHave, fileController.postOrUpdateFile, userController.putProfileImage, fileController.getInfoFile)
    .post(userController.putCurrentUser, fileController.profileUpload, userController.getProfileImageID, fileController.checkFileRequestIfHave, fileController.postOrUpdateFile, userController.putProfileImage, fileController.getInfoFile);
router.route('/coverImage/:userID').get(userController.checkUserRequest, userController.getCoverImageID, fileController.checkFileRequest, fileController.getFile);
router.route('/coverImage')
    .get(userController.putCurrentUser, userController.getCoverImageID, fileController.checkFileRequest, fileController.getFile)
    .put(userController.putCurrentUser, fileController.coverUpload, userController.getCoverImageID, fileController.checkFileRequestIfHave, fileController.postOrUpdateFile, userController.putCoverImage, fileController.getInfoFile)
    .post(userController.putCurrentUser, fileController.coverUpload, userController.getCoverImageID, fileController.checkFileRequestIfHave, fileController.postOrUpdateFile, userController.putCoverImage, fileController.getInfoFile);
router.route('/info/:userID').get(userController.checkUserRequest, userController.getUserInfo);
router.route('/info').get(userController.putCurrentUser, userController.getUserInfo);
router.route('/files')
    .get(userController.putCurrentUser, userController.getFiles, fileController.getInfoFiles)
    .post(userController.putCurrentUser, fileController.arrayFileUpload, fileController.postFiles, fileController.getInfoFiles);
router.route('/files/:userID')
    .get(userController.checkUserRequest, userController.getFiles, fileController.getInfoFiles);
router.route('/classs/:userID').get(userController.checkUserRequest, userController.getClasss);
router.route('/classs').get(userController.putCurrentUser, userController.getClasss);

router.route('/friends').get(userController.putCurrentUser, userController.getFriends);
router.route('/friends/:userID').delete(userController.checkUserRequest, userController.removeFriend);
router.route('/request').get(userController.putCurrentUser, userController.getRequests);
router.route('/request/:userID')
    .post(userController.checkUserRequest, userController.addRequest)
    .delete(userController.checkUserRequest, userController.removeRequest);
router.route('/requested').get(userController.checkUserRequest, userController.getRequesteds);
router.route('/requested/:userID').get(userController.checkUserRequest, userController.getRequesteds);
router.route('/requested/:userID')
    .post(userController.checkUserRequest,userController.confirmRequested)
    .delete(userController.checkUserRequest, userController.removeRequested);

router.route('/posts/:userID').get(userController.checkUserRequest, userController.getPosts);
router.route('/classs/:userID/:groupID').delete(userController.checkUserRequest, groupController.checkGroupRequest , userController.removeFromClass);
router.route('/classrequest/:userID').get(userController.checkUserRequest, userController.getClassRequests);
router.route('/classrequest/:userID/:groupID')
    .post(userController.checkUserRequest, groupController.checkGroupRequest ,userController.addClassRequest)
    .delete(userController.checkUserRequest, groupController.checkGroupRequest, userController.removeClassRequest);

router.route('/import').post(userController.checkSystemAccount, userController.postUsers, userController.getUsers);
router.route('/search').get(userController.searchUserByName);

router.route('/all').get(userController.getUsers);

//--------------------------------
module.exports = router;