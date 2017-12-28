let express = require('express');
let router = express.Router();
let fileController = require('../controllers/fileitem');
let postController = require('../controllers/post');
let userController = require('../controllers/user');
let groupController = require('../controllers/group');
let authController = require('../controllers/auth');
//-------------------------POST_API---------------------//
router.use(authController.isAuthenticated);
router.route('/').post(fileController.arrayFileUpload, groupController.checkGroupRequest, userController.putCurrentUser, groupController.checkAdminInGroupAccount, fileController.postFilesIfHave, postController.addPost, postController.getPost);

router.route('/topic/:groupID').get(groupController.checkGroupRequest, postController.getPostsInTopic);
router.route('/like/:postID')
    .get(postController.checkPostRequest, postController.getLikes)
    .post(postController.checkPostRequest, postController.addLike, postController.getLikes)
    .delete(postController.checkPostRequest, postController.removeLike, postController.getLikes);
router.route('/comment/:postID')
    .get(postController.checkPostRequest, postController.getComments)
    .post(fileController.fileUpload, fileController.postFileIfHave, postController.checkPostRequest, postController.addComment)
    .put(fileController.fileUpload, fileController.postFileIfHave, postController.checkPostRequest, postController.updateComment)
    .delete(postController.checkPostRequest, postController.deleteComment);

router.route('info/:postID').get(postController.checkPostRequest, postController.getPost);
router.route('delete/:postID').delete(postController.checkPostRequest, postController.deletePost, postController.getPost);
router.route('update/:postID').put(fileController.arrayFileUpload, postController.checkPostRequest, fileController.postFilesIfHave, postController.updatePost, postController.getPost);
module.exports = router;