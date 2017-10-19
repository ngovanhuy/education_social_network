var FileItem = require('../models/fileitem');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
const UPLOAD_PATH = 'uploads/';

// var storage = multer.memoryStorage();
var file_upload = multer({
    dest: UPLOAD_PATH,
    // storage: storage,
    // limits: {
    //     fileSize: 1 << 22, // 4M 
    // },
});
var image_upload = multer({
    dest: UPLOAD_PATH,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
});
//Upload File
exports.fileUpload = file_upload.single('file_upload');
exports.postFile = function (req, res, next) {
    var fileUpload = req.file;
    var file = new FileItem();
    file.id = fileUpload.filename;
    file.name = fileUpload.originalname;
    file.type = fileUpload.mimetype;
    file.size = fileUpload.size;
    file.createDate = Date.now();
    file.isDeleted = false;
    file.save(function (err) {
        if (err) {
            return res.send({ code: 500, message: 'Upload Failed', data: null, error: err });
        }
        return res.json({
            code: 200, message: 'Success', data: {
                id: String(file._id),
                name: file.name,
                type: file.type,
                size: file.size,
                createDate: file.createDate
            }
        });
    });
};
//Upload Image
exports.imageUpload = image_upload.single('image_upload');
exports.postImage = function (req, res) {
    var fileUpload = req.file;
    var file = new FileItem();
    file.id = fileUpload.name;
    file.name = fileUpload.originalname;
    file.type = fileUpload.type;
    file.size = fileUpload.size;
    file.createDate = Date.now();
    file.isDeleted = false;
    file.save(function (err) {
        if (err) {
            return res.send({ code: 500, message: 'Upload Failed', data: null, error: err });
        }
        return res.json({
            code: 200, message: 'Success', data: {
                id: file._id,
                name: file.name,
                type: file.type,
                size: file.size,
                createDate: file.createDate
            }
        });
    });
}
//Delete File
exports.deleteFile = function (req, res) {
    FileItem.findById(req.params.file_id, function (err, file) {
        if (err) {
            return res.send({ code: 400, message: 'Not exit file.', data: null, error: err });
        }
        file.isDeleted = true;
        file.save(function (err) {
            if (err) {
                return res.send({ code: 500, message: 'Not delete file', data: null, error: err });
            } else {
                return res.json({
                    code: 200, message: 'Success', error: null, data: {
                        id: file._id,
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        createDate: file.createDate
                    }
                });
            }
        });
    });
};
//Get Information File.
exports.getInfoFile = function (req, res) {
    FileItem.findById(req.params.file_id, function (err, file) {
        if (err) {
            return res.send({ code: 400, message: 'Not exit file.', data: null, error: err });
        }
        if (file.isDeleted) {
            return res.send({ code: 400, message: 'Not exit file.', data: null, error: err });
        }
        return res.json({
            code: 200, message: 'Success', error: null, data: {
                id: file._id,
                name: file.name,
                type: file.type,
                size: file.size,
                createDate: file.createDate
            }
        });
    });
};
//Download File.
exports.getFile = function (req, res) {
    // FileItem.findById({'id' : '' + req.params.file_id}, function (err, file) {
    FileItem.findById(req.params.file_id, function (err, file) {
        if (err) {
            return res.send({ code: 400, message: 'Not exit file.', data: null, error: err });
        }
        if (!file) {
            return res.send({ code: 400, message: 'Not exit file.', data: null, error: err });
        } else if(file.isDeleted) {
            return res.send({ code: 400, message: 'Not exit file.', data: null, error: err });
        }
        res.setHeader('Content-Type', file.type);
        res.setHeader("Content-Disposition", "attachment; filename=\"" + file.name +"\"");
        return fs.createReadStream(path.join(UPLOAD_PATH, file.id)).pipe(res);
    });
};