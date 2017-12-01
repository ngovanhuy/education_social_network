let express = require('express');
let router = express.Router();
let fileController = require('../controllers/fileitem');
let postController = require('../controllers/post');
let userController = require('../controllers/user');
//-------------------------FILE API---------------------//

router.route('/:postID').get(postController.getPost);

module.exports = router;