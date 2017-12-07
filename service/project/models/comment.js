let mongoose = require('mongoose');
let Utils = require('../application/utils');
let CommentSchema = new mongoose.Schema({
    _id: Number,
    content: String,
    user: {
        type: {
            _id: Number,
            firstName: String,
            lastName: String,
            profileImageID: String,
            timeUpdate: Date,
        },
        required: true,
        default: null,
    },
    postID: {
        type: Number,
        required: true,
        default: null,
    },
    file: {
        type: {_id: String, name: String, type: String, size: Number},
        default:null,
    },
<<<<<<< HEAD
    timeCreate: {type: Date, required: true, default: Date.now()},
    timeUpdate: {type: Date, required: true, default: Date.now()},
=======
    timeCreate: {type: Date, required: true, default: new Date()},
    timeUpdate: {type: Date, required: true, default: new Date()},
>>>>>>> develop
    isDeleted: {type: Boolean, required: true, default: false}
});
CommentSchema.pre('save', function (callback) {
    let _this = this;
    _this.timeUpdate = new Date();
    return callback();
});

function getBasicInfo() {
    return {
        id: this._id,
        content: this.content,
        user: this.user,
        postID: this.postID,
        timeCreate: Utils.exportDate(this.timeCreate),
        timeUpdate: Utils.exportDate(this.timeUpdate),
    }
}
function addFile(fileItem) {
    if (!fileItem) return null;
    this.file = {
        // _id: fileItem._id,
        id: fileItem.id,
        name: fileItem.name,
        type: fileItem.type,
        size: fileItem.size
    };
    return this.file;
}
function removeFile() {
    this.file = null;
}
function getNewID() {
    return new Date().getTime();
}

function createNewComment(user, post, content, file) {
    if (!user || !post || !content) {
        return null;
    }
    let now = new Date();
    let comment = {
        _id: now.getTime(),
        content: content,
        user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImageID: user.profileImageID,
            timeUpdate: now,
        },
        postID: post._id,
        file: null,
        timeCreate: now,
        timeUpdate: now,
        isDeleted: false
    };
    if (!file) addFile.call(comment, file);
    return comment;
}

function addToPost(post) {
    if (!post) return null;
    this.postID = post._id;
    return post;
}

CommentSchema.methods.getBasicInfo = getBasicInfo;
CommentSchema.methods.getNewID = getNewID;
CommentSchema.methods.addFile = addFile;
CommentSchema.methods.removeFile = removeFile;
CommentSchema.methods.addToPost = addToPost;

CommentSchema.statics.createNewComment = createNewComment;
module.exports = mongoose.model('Comment', CommentSchema);