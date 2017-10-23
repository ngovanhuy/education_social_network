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
        if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
});

var getLocalFilePath = file => path.join(UPLOAD_PATH, file.id);
var checkFileExited = async file => new Promise(resolve => fs.exists(getLocalFilePath(file), exists => resolve(exists)))
var checkFilesExisted = async files => new Promise(resolve => {
    var promises = files.map(file => {
        return checkFileExited(file).then(exists => exists ? file : null);
    });
    var datas = [];
    Promise.all(promises).then(files => {
        files.forEach(file => {
            if (file) {
                datas.push(file);
            }
        })
        resolve(datas);
    });
})
//File filter
exports.fileUpload = file_upload.single('file_upload');
exports.imageUpload = image_upload.single('image_upload');
//Upload File/Image
exports.postFile = async (req, res) => {
    var fileUpload = req.file;
    var file = new FileItem();
    file.id = fileUpload.filename;
    file.name = fileUpload.originalname;
    file.type = fileUpload.mimetype;
    file.size = fileUpload.size;
    file.createDate = Date.now();
    file.isDeleted = false;
    try {
        var fileSaved = await file.save();
        return res.json({
            code: 200, message: 'Success', data: {
                id: String(fileSaved._id),
                name: fileSaved.name,
                type: fileSaved.type,
                size: fileSaved.size,
                createDate: fileSaved.createDate.toLocaleString(),
            }
        });
    } catch (error) {
        return res.send({ code: 500, message: 'Upload Failed', data: null, error: err.message });
    }
};
//Delete File
exports.deleteFile = async (req, res) => {
    try {
        var file = await FileItem.findById(req.params.file_id);
        try {
            file.isDeleted = true;
            var fileSaved = await file.save();
            return res.json({
                code: 200, message: 'Success', error: null, data: {
                    id: fileSaved._id,
                    name: fileSaved.name,
                    type: fileSaved.type,
                    size: fileSaved.size,
                    createDate: fileSaved.createDate.toLocaleString(),
                }
            });
        } catch (error) {
            return res.send({ code: 500, message: 'Not delete file', data: null, error: error.message });
        }
    } catch (error) {
        return res.send({ code: 400, message: 'Not exit file.', data: null, error: error.message });
    }
};
//Get Information File.
exports.getInfoFile = async (req, res) => {
    try {
        var file = await FileItem.findById(req.params.file_id);
        if (file.isDeleted) {
            return res.send({ code: 400, message: 'File was deleted.', data: null });
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
    } catch (error) {
        return res.send({ code: 400, message: 'Not exit file.', data: null, error: error.message });
    }
};
//Download File.
exports.getFile = async (req, res) => {
    try {
        var file = await FileItem.findById(req.params.file_id);
        if (!file) {
            return res.status(400).send({ code: 400, message: 'Not exit file.', data: null });
        }
        if (file.isDeleted) {
            return res.status(400).send({ code: 400, message: 'File was deleted.', data: null });
        }
        var readStream = fs.createReadStream(getLocalFilePath(file));
        return readStream.on("error", err => {
            return res.status(500).send({ code: 500, message: 'Not exit file.', data: null });
        }).on("open", () => {
            res.setHeader('Content-Type', file.type);
            res.setHeader("Content-Disposition", "filename=\"" + file.name + "\"");
            return readStream.pipe(res);
        });
    } catch (error) {
        return res.status(400).send({ code: 400, message: 'Not exit file.', data: null });
    }
};
exports.attachFile = async (req, res) => {
    try {
        var file = await FileItem.findById(req.params.file_id);
        if (!file) {
            return res.send({ code: 400, message: 'Not exit file.', data: null });
        }
        if (file.isDeleted) {
            return res.send({ code: 400, message: 'Not exit file.', data: null });
        }
        var readStream = fs.createReadStream(getLocalFilePath(file));
        return readStream.on("error", err => {
            return res.send({ code: 500, message: 'Not exit file.', data: null });
        }).on("open", () => {
            res.setHeader('Content-Type', file.type);
            res.setHeader("Content-Disposition", "attachment; filename=\"" + file.name + "\"");
            return readStream.pipe(res);
        });
    } catch (error) {
        return res.send({ code: 400, message: 'Not exit file.', data: null });
    }
};

exports.getFiles = async (req, res) => {
    try {
        var files = await FileItem.find({ isDeleted: false });
        var datas = [];
        var filesExisted = await checkFilesExisted(files);
        filesExisted.forEach(file =>
            datas.push({
                id: file._id,
                name: file.name,
                type: file.type,
                size: file.size,
                createDate: file.createDate.toLocaleString()
            }));
        return res.send({ code: 200, message: 'Success', length: datas.length, data: datas });
    } catch (error) {
        return res.send({ code: 500, message: 'Server Error', data: null, error: error.message });
    }
}
