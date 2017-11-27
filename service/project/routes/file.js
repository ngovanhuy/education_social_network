let express = require('express');
let router = express.Router();
let fileController = require('../controllers/fileitem');

//-------------------------FILE API---------------------//
router.route('/upload').post(fileController.fileUpload, fileController.postFile, fileController.getInfoFile);
router.route('/image').post(fileController.imageUpload, fileController.postFile, fileController.getInfoFile);

router.route('/get/:fileID').get(fileController.getFile);
router.route('/attach/:fileID').get(fileController.attachFile);
router.route('/delete/:fileID').delete(fileController.deleteFile);
router.route('/info/:fileID').get(fileController.getInfoFile);

module.exports = router;