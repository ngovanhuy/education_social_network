let mongoose = require('mongoose');
let Utils = require('../application/utils');
let PostSchema = new mongoose.Schema({
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
                type: {_id: String, name: String, type: String, size: Number},
                required: false,
                default: {},
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
            _id: String,
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
    let post = this;
    post.timeUpdate = Date.now();
    return callback();
});

function getBasicInfo() {
    return {
        id: this._id,
        title: this.title,
        content: this.content,
        timeCreate: Utils.exportDate(this.timeCreate),
        user: this.userCreate,
        group: this.group,
        files: this.files.map(file => ({
            id: file._id,
            name: file.name,
            type: file.type,
            size: file.size,
        })),
        countComments: this.countComments,
        countLikes: this.countLikes,
    }
}
function getNewID() {
    return new Date().getTime();
}

function addLike(user) {
    if (!this.likes) this.likes = [];
    let like = this.likes.find(like => like._id === user._id);
    if (!like) {
        like = {  _id: user._id, isDeleted: false };
        this.likes.push(like);
        this.countLikes++;
    } else if (like.isDeleted) {
        like.isDeleted = false;
        this.countLikes++;
    }
    return like;
}
function addLikes(users) {
    if (!this.likes) this.likes = [];
    if (!users) return null;
    users.forEach(user => {
        let exited = this.likes.find(t => t._id === user) ;
        if (!exited) {
            this.likes.push({_id: user._id, isDeleted : false});
            this.countLikes++;
        } else if (exited.isDeleted) {
            exited.isDeleted = false;
            this.countLikes++;
        }
    });
    return users;
}
function removeLike(user) {
    if (!this.likes) this.likes = [];
    let like = this.likes.find(like => like._id === user._id);
    if (like && !like.isDeleted) {
        like.isDeleted = true;
        this.countLikes--;
    }
    return like;
}
function getLikes() {
    if (!this.likes) this.likes = [];
    return this.likes.filter(like => like.isDeleted === false).map(like => _id);

}

function addTopic(topic_name) {
    if (!this.topics) this.topics = [];
    let topic = this.topics.find(t => t._id === topic_name);
    if (!topic) {
        topic = { _id: topic_name, isDeleted: false };
        this.topics.push(topic);
    } else if (topic.isDeleted) {
        topic.isDeleted = false;
    }
    return topic;
}
function addTopics(topics) {
    if (!this.topics) this.topics = [];
    if (!topics) return null;
    topics.forEach(topic => {
        let exited = this.topics.find(t => t._id === topic) ;
        if (!exited) {
            this.topics.push({_id: topic, isDeleted : false});
        } else if (exited.isDeleted) {
            exited.isDeleted = false;
        }
    });
    return topics;
}
function removeTopic(topic_name) {
    if (!this.topics) this.topics = [];
    let topic = this.topics.find(t => t._id === topic_name);
    if (topic && !topic.isDeleted) {
        topic.isDeleted = true;
    }
    return topic;
}
function getTopics() {
    if (!this.topics) return [];
    return this.topics.filter(topic => topic.isDeleted === false).map(topic => topic._id);
}

function addComment(user, content, file = null) {
    let now = Date.now();
    let comment = {
        _id: now,
        userID: user._id,
        index: this.countComments,
        content: content,
        firstName: user.firstName,
        lastName: user.lastName,
        file : null,
        profileImageID: user.profileImageID,
        timeUpdate: now,
        isDeleted: false,
    };
    if (file) {
        comment.file = {
            _id: file._id,
            id: file.id,
            name: file.name,
            type: file.type,
            size: file.size,
        }
    }
    this.comments.push(comment);
    this.countComments++;
    return comment;
}
function updateComment(id, content, file = null) {
    let comment = this.comments.find(item => item._id === id);
    if (!comment) {
        return null;
    }
    comment.content = content;
    if (file) {
        comment.file = {
            _id: file._id,
            id: file.id,
            name: file.name,
            type: file.type,
            size: file.size,
        }
    }
    comment.timeUpdate = Date.now();
    if (comment.isDeleted) {
        comment.isDeleted = false;
        this.countComments++;
    }
    return comment;
}
function deleteComment(id) {
    let comment = this.comments.find(item => item._id === id);
    if (comment && !comment.isDeleted) {
        comment.isDeleted = true;
        this.countComments--;
    }
    return comment;
}

function getFiles() {
    return this.files.filter(file => file.isDeleted === false);
}
function addFile(new_fileItem) {
    if (!this.files) this.files = [];
    let fileItem = this.files.find(item => item._id === new_fileItem._id);
    if (!fileItem) {
        fileItem = {
            _id: new_fileItem._id,
            type: new_fileItem.type,
            size: new_fileItem.size,
            name: new_item.name,
            isDeleted : false,
        };
        this.files.push(fileItem);
    } else if(file.isDeleted) {
        fileItem.isDeleted = false;
    }
    return fileItem;
}
function addFiles(files) {
    if (!this.files) this.files = [];
    if (!files) return null;
    files.forEach(file => {
        let exited = this.files.find(t => t._id === file._id) ;
        if (!exited) {
            this.files.push({
                _id: file._id,
                type: file.type,
                size: file.size,
                name: file.name,
                isDeleted : false,
            });
        } else if (exited.isDeleted) {
            exited.isDeleted = false;
        }
    });
    return files;
}
function removeFile(file) {
    let fileItem = this.files.find(item => item._id = file._id);
    if (fileItem && !fileItem.isDeleted) {
        fileItem.isDeleted = true;
    }
    return fileItem;
}

function setBlockComment(isBlockComment) {
    if (!this.options) this.options = {};
    this.options.isBlockComment = isBlockComment;
}

function createNewPost(user, group, title, content, topic, files = null) {
    if (!user || !group) return null;
    let now = Date.now();
    let post =  new Post ({
        _id: now,
        title: title,
        content: content,
        userCreate: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImageID: user.profileImageID,
            timeUpdate: now,
        },
        group: {
            _id: group._id,
            name: group.name,
            profileImageID: group.profileImageID,
            timeUpdate: now,
        },
        topics: [],
        comments: [],
        likes: [],
        options:{ isBlockComment: false },
        files: [],
        countComments: 0,
        countLikes: 0,
        isDeleted: false,
        timeCreate: now,
        timeUpdate: now,
    });
    if (topic) {
        addTopic.call(post, topic);
    }
    if (Array.isArray(files)) {
        addfiles.call(post, files);
    } else if(files) {
        addFile.call(post, files)
    }
    return post;
}

PostSchema.methods.getBasicInfo = getBasicInfo;
PostSchema.statics.getNewID = getNewID;

PostSchema.methods.addLike = addLike;
PostSchema.methods.addLikes = addLikes;
PostSchema.methods.removeLike = removeLike;
PostSchema.methods.getLikes = getLikes;

PostSchema.methods.addTopic = addTopic;
PostSchema.methods.removeTopic = removeTopic;
PostSchema.methods.addTopics = addTopics;
PostSchema.methods.getTopics = getTopics;

PostSchema.methods.addComment = addComment;
PostSchema.methods.updateComment = updateComment;
PostSchema.methods.deleteComment = deleteComment;

PostSchema.methods.getFiles = getFiles;
PostSchema.methods.removeFile = removeFile;
PostSchema.methods.addFile = addFile;
PostSchema.methods.addFiles = addFiles;
PostSchema.methods.setBlockComment = setBlockComment;

// PostSchema.statics.createNewPost = createNewPost;
module.exports = mongoose.model('Post', PostSchema);