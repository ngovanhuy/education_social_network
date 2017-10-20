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
//File filter
exports.fileUpload = file_upload.single('file_upload');
exports.imageUpload = image_upload.single('image_upload');
exports.postFile = function (req, res) {
    var fileUpload = req.file;
    var file = new FileItem();
    file.id = fileUpload.filename;
    file.name = fileUpload.originalname;
    file.type = fileUpload.mimetype;
    file.size = fileUpload.size;
    file.createDate = Date.now();
    file.isDeleted = false;
    file.save().then(value => {
        return res.json({
            code: 200, message: 'Success', data: {
                id: String(file._id),
                name: file.name,
                type: file.type,
                size: file.size,
                createDate: file.createDate.toLocaleString(),
            }
        });
    }).catch(err => {
        return res.send({ code: 500, message: 'Upload Failed', data: null, error: err.message });
    });
};
//Delete File
exports.deleteFile = function (req, res) {
    FileItem.findById(req.params.file_id).then(file => {
        file.isDeleted = true;
        file.save().then(file => {
            return res.json({
                code: 200, message: 'Success', error: null, data: {
                    id: file._id,
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    createDate: file.createDate.toLocaleString(),
                }
            });
        }).catch(err => {
            return res.send({ code: 500, message: 'Not delete file', data: null, error: err.message });
        });
    }).catch(err => {
        return res.send({ code: 400, message: 'Not exit file.', data: null, error: err.message });
    });
};
//Get Information File.
exports.getInfoFile = function (req, res) {
    FileItem.findById(req.params.file_id).then(file => {
        if (file.isDeleted) {
            return res.send({ code: 400, message: 'Not exit file.', data: null });
        }
        return res.json({
            code: 200, message: 'Success', data: {
                id: file._id,
                name: file.name,
                type: file.type,
                size: file.size,
                createDate: file.createDate.toLocaleString(),
            }
        });
    }).catch(err => {
        return res.send({ code: 400, message: 'Not exit file.', data: null, error: err.message });
    });
};
//Download File.
exports.getFile = function (req, res) {
    FileItem.findById(req.params.file_id).then(file => {
        if (!file) {
            return res.send({ code: 400, message: 'Not exit file.', data: null });
        } else if (file.isDeleted) {
            return res.send({ code: 400, message: 'Not exit file.', data: null });
        }
        var readStream = fs.createReadStream(path.join(UPLOAD_PATH, file.id));
        return readStream.on("error", err => {
            return res.send({ code: 500, message: 'Not exit file.', data: null });
        }).on("open", () => {
            res.setHeader('Content-Type', file.type);
            res.setHeader("Content-Disposition", "filename=\"" + file.name + "\"");// res.setHeader("Content-Disposition", "attachment; filename=\"" + file.name +"\"");
            return readStream.pipe(res);
        });
    }).catch(err => {
        return res.send({ code: 400, message: 'Not exit file.', data: null });
    });
};

exports.getFiles = function (req, res) {
    FileItem.find().then(files => {
        var datas = [];
        files.forEach(file => {
            datas.push({ id: file._id, name: file.name, type: file.type, size: file.size, createDate: file.createDate.toLocaleString() });
        });
        return res.send({ code: 200, message: 'Success', data: datas });
    }).catch(err => {
        return res.send({ code: 500, message: 'Server Error', data: null, error: err.message });
    });
}

exports.errorHanding = function (err, req, res, next) {
    if (err) {
        return res.status(500).send({ code: 500, message: 'Server Error', data: null, error: err.message });
    }
    return res.status(400).send({ code: 400, message: 'Client Error', data: null, error: err.message });
}