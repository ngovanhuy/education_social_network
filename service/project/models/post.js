var mongoose = require('mongoose');
var utils = require('../application/utils');
var FileItem = require('../models/fileitem');
var PostSchema = new mongoose.Schema({
    _id: { type: Number, default: getNewID },
    title: { type: String, required: true, default: 'No Title' },
    content: { type: String, required: true, default: 'No Content' },//short_content
    userCreate: {
        type: {
            _id: Number,
            firstName: String,
            lastName: String,
            profileImageID: String,
            timeUpdate: { type: Date, default: Date.now(), required: true },
        },
        required: true,
        default: null
    },
    group: {
        type: {
            _id: Number,
            name: String,
            profileImageID: String,
            timeUpdate: { type: Date, default: Date.now(), required: true },
        },
        required: true,
        default: null
    },
    topics: {
        type: [{
            _id: String,
            isDeleted: {type: Boolean, default: false}
        }],
        required: false,
        default: [],
    },
    comments: {
        type: [{
            _id: Number,
            userID: Number,
            content: String,
            firstName: String,
            lastName: String,
            profileImageID: String,
            file: {
                type: {_id: String, name: String, type: String, size: Number, isDeleted: Boolean},
                default:[],
            },
            timeUpdate: { type: Date, default: Date.now, required: true },
            isDeleted: { type: Boolean, default: false }
        }],
        required: false,
        default: [],
    },
    likes: {
        type: [{
            _id: Number,
            isDeleted: { type: Boolean, default: false }
        }],
        required: false,
        default: [],
    },
    options: {
        type: {
            isBlockComment: Boolean,
        },
        required: true,
        default: {
            isBlockComment: false
        }
    },
    files: {
        type: [{
            _id: Number,
            name: { type: String, required: true, default: 'NoName' },
            type: { type: String, required: true, default: 'application/octet-stream', },
            size: { type: Number, required: true, default: 0, },
            isDeleted: { type: Boolean, required: true, default: false, },
        }],
        required: false,
        default: [],
    },
    countComments: { type: Number, required: true, default: 0 },
    countLikes: { type: Number, required: true, default: 0 },
    isDeleted: { type: Boolean, required: true, default: false, },
    timeCreate: { type: Date, required: false, default: Date.now(), },
    timeUpdate: { type: Date, required: false, default: Date.now(), },
    //permantlink
});

PostSchema.pre('save', function (callback) {
    var post = this;
    post.timeUpdate = Date.now();
    return callback();
});

function getBasicInfo() {
    return {
        id: this._id,
        title: this.title,
        // short_content: getShortContent(this.content),
        content: this.content,
        timeCreate: this.timeCreate.toLocaleString(),
        user: this.userCreate,
        group: this.group,
        // likes:          this.likes.length,
        // comments:       this.comments.length,
    }
}
function getShortContent(content) {
    if (!content) return "";
    if (content.length > 30) return content.substring(0, 30) + '...';
    return content;
}
function getNewID() {
    return new Date().getTime();
}
function addLike(user) {
    let like = this.likes.find(like => like._id == user._id);
    if (!like) {
        like = {
            _id: user._id,
            isDeleted: false
        };
        this.likes.push(like);
        this.countLikes++;
    } else if (like.isDeleted) {
        like.isDeleted = false;
        this.countLikes++;
    }
    return like;
}
function removeLike(user) {
    let like = this.likes.find(like => like._id == user._id);
    if (like && !like.isDeleted) {
        like.isDeleted = true;
        this.countLikes--;
    }
    return like;
}
function addComment(user, content, file = null) {
    let now = Date.now;
    let comment = {
        _id: now,
        userID: user._id,
        index: this.countComments,
        content: content,
        firstName: user.firstName,
        lastName: user.lastName,
        file: file ? file.getBasicInfo() : null,
        profileImageID: user.profileImageID,
        timeUpdate: now,
        isDeleted: false,
    };
    this.comments.push(comment);
    this.countComments++;
    return comment;
}
function updateComment(id, content, file = null) {
    let comment = this.comments.find(item => item._id == id);
    if (comment) {
        comment.content = content;
        comment.file = file ? file.getBasicInfo() : null,
        comment.timeUpdate = Date.now;
        if (comment.isDeleted) {
            comment.isDeleted = false;
            this.countComments++;
        }
    };
    return comment;
}
function deleteComment(id) {
    let comment = this.comments.find(item => item._id == id);
    if (comment && !comment.isDeleted) {
        comment.isDeleted = true;
        this.countComments--;
    };
    return comment;
}
function addTopic(topic_name) {
    let topic = this.topics.find(t => t._id == topic_name);
    if (!topic) {
        topic = {_id: topic_name, isDeleted: false};
    } else if (topic.isDeleted) {
        topic.isDeleted = false;
    }
    return topic;
}
function getFiles() {
    return this.files.filter(file => file.isDeleted === false);
}
function removeTopic(topic_name) {
    let topic = this.topics.find(t => t._id == topic_name);
    if (topic && !topic.isDeleted) {
        topic.isDeleted = true;
    }
    return topic;
}
function addFile(new_fileItem) {
    let fileItem = this.files.find(item => item._id = new_fileItem._id);
    if (!fileItem) {
        fileItem = {
            _id: new_fileItem._id,
            type: new_fileItem.type,
            size: new_fileItem.size,
            isDeleted : false,
        };
        this.files.push(fileItem);
    } else if(file.isDeleted) {
        file.isDeleted = false;
    }
    return fileItem;
}
function removeFile(remove_file) {
    let fileItem = this.files.find(item => item._id = new_fileItem._id);
    if (fileItem && !fileItem.isDeleted) {
        fileItem.isDeleted = true;
    }
    return fileItem;
}
function setBlockComment(isBlockComment) {
    this.options.isBlockComment = isBlockComment;
}

PostSchema.methods.getBasicInfo = getBasicInfo;
PostSchema.methods.addLike = addLike;
PostSchema.methods.removeLike = removeLike;
PostSchema.methods.addComment = addComment;
PostSchema.methods.setBlockComment = setBlockComment;
PostSchema.methods.addTopic = addTopic;
PostSchema.methods.removeTopic = removeTopic;
PostSchema.methods.getFiles = getFiles;
PostSchema.statics.getNewID = getNewID;

module.exports = mongoose.model('Post', PostSchema);