let express = require('express');
let router = express.Router();
let fileController = require('../controllers/fileitem');
//-------------------------FILE API---------------------//
router.route('/upload').post(fileController.fileUpload, fileController.postFile, fileController.getInfoFile);
router.route('/image').post(fileController.imageUpload, fileController.postFile, fileController.getInfoFile);
router.route('/uploads').post(fileController.arrayFileUpload, fileController.postFiles, fileController.getInfoFiles);
router.route('/uploadall').post(fileController.anyFileUpload, fileController.postFiles, fileController.getInfoFiles);
router.route('/images').post(fileController.arrayImageUpload, fileController.postFiles, fileController.getInfoFiles);

router.route('/get/:fileID').get(fileController.getFile);
router.route('/attach/:fileID').get(fileController.attachFile);
router.route('/delete/:fileID').delete(fileController.deleteFile);//TODO: check permission delete file.
router.route('/info/:fileID').get(fileController.getInfoFile);

module.exports = router;