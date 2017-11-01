var FileItem = require('../models/fileitem');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var UPLOAD_PATH = 'uploads/';

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

function getLocalFilePath(file) {
    return path.join(UPLOAD_PATH, file.id)
};
async function checkFileExited(file) {
    return new Promise(resolve => fs.exists(getLocalFilePath(file), exists => resolve(exists)))
}
async function checkFilesExisted(files) {
    return new Promise(resolve => {
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
}
async function postFile(req, res) {
    var fileUpload = req.file;
    var file = new FileItem({
        id: req.file.filename,
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
        createDate: Date.now(),
        isDeleted: false,
    });
    try {
        var fileSaved = await file.save();
        return res.json({
            code: 200,
            message: 'Success',
            data: fileSaved.getBasicInfo(fileSaved)
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Upload Failed',
            data: null,
            error: error.message
        });
    }
};
async function deleteFile(req, res) {
    try {
        var file = await FileItem.findById(req.params.file_id);
        try {
            file.isDeleted = true;
            var fileSaved = await file.save();
            return res.json({
                code: 200,
                message: 'Success',
                data: fileSaved.getBasicInfo(fileSaved)
            });
        } catch (error) {
            return res.status(500).send({
                code: 500,
                message: 'Not delete file',
                data: null,
                error: error.message
            });
        }
    } catch (error) {
        return res.status(400).send({
            code: 400,
            message: 'Not exit file.',
            data: null,
            error: error.message
        });
    }
};
async function getInfoFile(req, res) {
    try {
        var file = await FileItem.findById(req.params.file_id);
        if (file.isDeleted) {
            return res.status(400).json({
                code: 400,
                message: 'File was deleted.',
                data: null
            });
        }
        return res.json({
            code: 200,
            message: 'Success',
            data: file.getBasicInfo(file)
        });
    } catch (error) {
        return res.status(400).json({
            code: 400,
            message: 'Not exit file.',
            data: null,
            error: error.message
        });
    }
};
async function getFile(req, res) {
    try {
        var file = await FileItem.findById(req.params.file_id);
        if (!file) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit file.',
                data: null
            });
        }
        if (file.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'File was deleted.',
                data: null
            });
        }
        var readStream = fs.createReadStream(getLocalFilePath(file));
        return readStream.on("error", err => {
            return res.status(500).send({
                code: 500,
                message: 'Not exit file.',
                data: null
            });
        }).on("open", () => {
            res.setHeader('Content-Type', file.type);
            res.setHeader('Content-Length', file.size);
            res.setHeader("Content-Disposition", "filename=\"" + file.name + "\"");
            return readStream.pipe(res);
        }).on("close", () => {
            res.end();
        });
    } catch (error) {
        return res.status(400).send({
            code: 400,
            message: 'Not exit file.',
            data: null
        });
    }
};
async function attachFile(req, res) {
    try {
        var file = await FileItem.findById(req.params.file_id);
        if (!file) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit file.',
                data: null
            });
        }
        if (file.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit file.',
                data: null
            });
        }
        var readStream = fs.createReadStream(getLocalFilePath(file));
        return readStream.on("error", err => {
            return res.status(500).send({
                code: 500,
                message: 'Not exit file.',
                data: null
            });
        }).on("open", () => {
            res.setHeader('Content-Type', file.type);
            res.setHeader('Content-Length', file.size);
            res.setHeader("Content-Disposition", "attachment; filename=\"" + file.name + "\"");
            return readStream.pipe(res);
        });
    } catch (error) {
        return res.status(400).send({
            code: 400,
            message: 'Not exit file.',
            data: null
        });
    }
};

async function getFiles(req, res) {
    try {
        var files = await FileItem.find({
            isDeleted: false
        });
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
        return res.send({
            code: 200,
            message: 'Success',
            length: datas.length,
            data: datas
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}

/*----------------------------------------------- */
exports.fileUpload = file_upload.single('fileUpload');
exports.imageUpload = image_upload.single('imageUpload');
exports.avatarUpload = image_upload.single('avatarImage');
exports.profileUpload = image_upload.single('profileImage');
exports.getFiles = getFiles;
exports.attachFile = attachFile;
exports.getFile = getFile;
exports.getInfoFile = getInfoFile;
exports.deleteFile = deleteFile;
exports.postFile = postFile;