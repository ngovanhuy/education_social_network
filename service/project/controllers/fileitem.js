let FileItem = require('../models/fileitem');
let multer = require('multer');
let fs = require('fs');
let path = require('path');
let UPLOAD_PATH = 'uploads/';
// let MAX_FILE_SIZE = 1 << 26;// 64M
// let MAX_IMAGE_SIZE = 1 << 23; //8M
let file_upload = multer({// let storage = multer.memoryStorage();
    dest: UPLOAD_PATH,
    // storage: storage,
    // limits: {
    //     fileSize: 1 << 22, // 4M 
    // },
});
let image_upload = multer({
    dest: UPLOAD_PATH,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
});

function getLocalFilePath(file) {
    return file ? path.join(UPLOAD_PATH, file.id) : null;
}
async function checkFileExited(file) {
    return new Promise(resolve => fs.exists(getLocalFilePath(file), exists => resolve(exists)));
}
async function checkFilesExisted(files) {
    return new Promise(resolve => {
        let promises = files.map(file => {
            // return checkFileExited(file, error => reject(error)).then(exists => exists ? file : null);
            return checkFileExited(file, error => error).then(exists => exists ? file : null);
        });
        let datas = [];
        Promise.all(promises).then(files => {
            files.forEach(file => {
                if (file) {
                    datas.push(file);
                }
            });
            resolve(datas);
        });
    });
}
async function getAllFiles() {
    return (await FileItem.find({isDeleted: false })).map(file => {
        return file.getBasicInfo();
    });
}
async function findFile(req) {
    if (!req) { return null; }
    if (req.fileitems.file_saved) {
        return req.fileitems.file_saved;
    }
    if (req.fileitems.file_selected_id) {
        return await FileItem.findById(req.fileitems.file_selected_id);
    }
    if (req.params.fileID) {
        return await FileItem.findById(req.params.fileID);
    }
    if (req.body.fileID) {
        return await FileItem.findById(req.body.fileID);
    }
    return null;
}
async function postFiles(req, res, next) {
    try {
        req.fileitems.file_saved = null;
        req.fileitems.file_selected_id = null;
        if (!req.files) {
            throw new Error("Input files null");
        }
        let current_user = null;
        let current_group = null;
        if (req.users.user_request) {
            let user = req.users.user_request;
            current_user = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        }
        if (req.groups.group_request) {
            let group = req.groups.group_request;
            current_group = {
                id: group._id,
                name: group.name,
            }
        }
        let files = [];
        let now = new Date();
        req.files.forEach(file => {
            let fileSave = new FileItem({
                id: file.filename,
                name: file.originalname,
                type: file.mimetype,
                size: file.size,
                createDate: now,
                isDeleted: false,
                user: current_user,
                group: current_group,
            });
            files.push(fileSave);
        });
        Promise.all(files.map(file => file.save())).then(filesaveds => {
            req.fileitems.files_saved = filesaveds;
            next();
        }).catch(error => next(error));
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Upload Failed',
            data: null,
            error: error.message
        });
    }
}
async function postFilesIfHave(req, res, next) {
    try {
        req.fileitems.file_saved = null;
        req.fileitems.file_selected_id = null;
        req.fileitems.files_saved = null;
        if (!req.files) {
            return next();
        }
        let current_user = null;
        let current_group = null;
        if (req.users.user_request) {
            let user = req.users.user_request;
            current_user = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        }
        if (req.groups.group_request) {
            let group = req.groups.group_request;
            current_group = {
                id: group._id,
                name: group.name,
            }
        }
        let files = [];
        let now = new Date();
        req.files.forEach(file => {
            let fileSave = new FileItem({
                id: file.filename,
                name: file.originalname,
                type: file.mimetype,
                size: file.size,
                createDate: now,
                isDeleted: false,
                user: current_user,
                group: current_group,
            });
            files.push(fileSave);
        });
        Promise.all(files.map(file => file.save())).then(filesaveds => {
            req.fileitems.files_saved = filesaveds;
            next();
        }).catch(error => next(error));
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Upload Failed',
            data: null,
            error: error.message
        });
    }
}
async function postFile(req, res, next) {
    try {
        req.fileitems.file_saved = null;
        req.fileitems.file_selected_id = null;
        if (!req.file) {
            throw new Error("Input file null");
        }
        let file = new FileItem({
            id: req.file.filename,
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size,
            createDate: new Date(),
            isDeleted: false,
        });
        if (req.users.user_request) {
            user = req.users.user_request;
            file.user = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        } else {
            file.user = null;
        }
        if (req.groups.group_request) {
            let group = req.groups.group_request;
            file.group = {
                id: group._id,
                name: group.name,
            }
        } else {
            file.group = null;
        }
        file = await file.save();
        req.fileitems.file_saved = file;
        req.fileitems.file_selected_id = file ? file._id : null;
        return next();
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Upload Failed',
            data: null,
            error: error.message
        });
    }
}
async function postFileIfHave(req, res, next) {
    try {
        req.fileitems.file_saved = null;
        req.fileitems.file_selected_id = null;
        if (!req.file) {
            return next();
        }
        let file = new FileItem({
            id: req.file.filename,
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size,
            createDate: new Date(),
            isDeleted: false,
        });
        if (req.users.user_request) {
            user = req.users.user_request;
            file.user = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        } else {
            file.user = null;
        }
        if (req.groups.group_request) {
            let group = req.groups.group_request;
            file.group = {
                id: group._id,
                name: group.name,
            }
        } else {
            file.group = null;
        }
        file = await file.save();
        req.fileitems.file_saved = file;
        req.fileitems.file_selected_id = file ? file._id : null;
        return next();
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Upload Failed',
            data: null,
            error: error.message
        });
    }
}
async function deleteFile(req, res) {
    try {
        let file = await findFile(req);
        req.fileitems.file_saved= file;
        req.fileitems.file_selected_id = file ? file._id : null;
        if (!file || file.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit file',
                data: null,
                error: 'Not exit file',
            });
        }
        file.isDeleted = true;
        file = await file.save();
        req.fileitems.file_saved= file;
        req.fileitems.file_selected_id = file ? file._id : null;
        return res.send({
            code: 200,
            message: 'Success',
            data: file.getBasicInfo(),
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Not delete file',
            data: null,
            error: error.message
        });
    }
}
async function getInfoFile(req, res) {
    try {
        let  file = await findFile(req);
        req.fileitems.file_saved= file;
        req.fileitems.file_selected_id = file ? file._id : null;
        if (!file) {
            return res.status(400).json({
                code: 400,
                message: 'File not exited or deleted.',
                data: null
            });
        } 
        if (file.isDeleted) {
            return res.status(400).json({
                code: 400,
                message: 'File deleted.',
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
}
async function getInfoFiles(req, res) {
    try {
        let files = req.fileitems.files_saved;
        if (!files) {
            return res.status(400).json({
                code: 400,
                message: 'Files not exited or deleted.',
                data: null
            });
        }
        return res.json({
            code: 200,
            message: 'Success',
            data: files.filter(file => file.isDeleted === false).map(file => file.getBasicInfo()),
        });
    } catch (error) {
        return res.status(400).json({
            code: 400,
            message: 'Not exit file.',
            data: null,
            error: error.message
        });
    }
}

async function getOrAttachFile(req, res, isAttach) {
    try {
        let file = await findFile(req);
        req.fileitems.file_saved= file;
        req.fileitems.file_selected_id = file ? file._id : null;
        if (!file || file.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit file.',
                data: null
            });
        }
        let readStream = fs.createReadStream(getLocalFilePath(file));
        readStream.on("open", () => {
            res.setHeader('Content-Type', file.type);
            res.setHeader('Content-Length', file.size);
            if (isAttach) {
                res.setHeader("Content-Disposition", "attachment; filename=\"" + file.name + "\"");
            } else {
                res.setHeader("Content-Disposition", "filename=\"" + file.name + "\"");
            }
            readStream.pipe(res);
        }).on("close", () => {
            res.end();
        }).on("error", err => {
            return res.status(500).send({
                code: 500,
                message: 'Not exit file.',
                data: null
            });
        });
    } catch (error) {
        return res.status(400).send({
            code: 400,
            message: 'Not exit file.',
            data: null
        });
    }
}
async function getFile(req, res) {
    return await getOrAttachFile(req, res, false);
}
async function attachFile(req, res) {
    return await getOrAttachFile(req, res, true);
}
async function getFiles(req, res, next) {
    try {
        let datas = await getAllFiles();
        if (datas) {
            res.send({
                code: 200,
                message: 'Success',
                length: datas.length,
                data: datas
            });
        }
        return next();
    } catch (error) {
        return next(error);
    }
}
async function cleanUploadFolder() {
    let files = await FileItem.find({isDeleted : true});
    let filesExisted = await checkFilesExisted(files);
    let errorHandler = err => {};
    filesExisted.forEach(file => {
        fs.unlink(getLocalFilePath(file), errorHandler);
    });
    return filesExisted;
}

/*----------------------------------------------- */
let singleFileUpload = file_upload.single('fileUpload');
let singleImageUpload = image_upload.single('imageUpload');
let arrayFileUpload = file_upload.array('fileUpload', 10);
let arrayImageUpload = image_upload.array('imageUpload', 10);
let mixFileImageUpload = file_upload.fields([
    {name: 'coverImage', maxCount: 1},
    {name: 'profileImage', maxCount: 1},
    {name: 'fileUpload', maxCount: 5},
    {name: 'imageUpload', maxCount: 5},
]);

let coverImageUpload = file_upload.single('coverImage');
let profileImageUpload = file_upload.single('profileImage');

let anyFileUpload = file_upload.any();

exports.anyFileUpload = anyFileUpload;
exports.fileUpload = singleFileUpload;
exports.imageUpload = singleImageUpload;
exports.coverUpload = coverImageUpload;
exports.profileUpload = profileImageUpload;
exports.arrayFileUpload = arrayFileUpload;
exports.arrayImageUpload = arrayImageUpload;
exports.mixFileImageUpload = mixFileImageUpload;

exports.getFiles = getFiles;
exports.attachFile = attachFile;
exports.getFile = getFile;
exports.getInfoFile = getInfoFile;
exports.getInfoFiles = getInfoFiles;
exports.deleteFile = deleteFile;
exports.postFile = postFile;
exports.postFiles = postFiles;
exports.cleanUploadFolder = cleanUploadFolder;
exports.postFileIfHave = postFileIfHave;
exports.postFilesIfHave = postFilesIfHave;