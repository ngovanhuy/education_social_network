var mongoose = require('mongoose');

var ScheduleSchema = new mongoose.Schema({
    _id: { type: Number, default: getNewID},
    index: {type: Number},
    title: { type: String, required: true, default: 'No Title' },
    content: { type: String, required: true, default: 'No Content' },//short_content
    timeCreate: { type: Date, required: false, default: Date.now, },
    timeUpdate: { type: Date, required: false, default: Date.now, },
    userID: { 
        type: {
            _id: Number,
            firstName: String,
            lastName: String,
            profileImageID: String,
            timeCreate: Date,
            timeUpdate: Date,
        }, 
        required: true, 
        default: null 
    },
    groupID: { 
        type: {
            _id: Number,
            name: String,
            profileImageID: String,
            timeCreate: { type: Date, default: Date.now },
            timeUpdate: { type: Date, default: Date.now },
        }, 
        required: true, 
        default: null 
    },
    comments: {
        type: [{
            _id: Number,
            content: String,
            firstName: String,
            lastName: String,
            profileImageID: String,
            timeCreate: Date,
            timeUpdate: Date,
            isDeleted: {type: Boolean, default: false}
        }],
        required: true,
        default: [],
    },
    likes: {
        type: [{
            _id: Number,
            firstName: String,
            lastName: String,
            isDeleted: {type: Boolean, default: false}
        }],
        required: true,
        default: [],
    },
    options: {
        type: {
            isShow: Boolean,
            isBlockComment: Boolean,
            // schedule: {
            //     startTimeShow: Date,
            //     endTimeShow: Date,
            // }
        },
        required: true,
        default: {
            isShow: true,
            isBlockComment: false
        }
    },
    isDeleted: { type: Boolean, required: true, default: false, },
});

ScheduleSchema.pre('save', function (callback) {
    var post = this;
    post.timeUpdate = Date.now();
    return callback();
});

function getBasicInfo() {
    return {
        id:             this._id,
        title:          this.title,
        short_content:  this.short_content,
        timeCreate:     this.timeCreate.toLocaleString(),
        userID:         this.userID,
        groupID:        this.groupID,
        likes:          this.likes.length,
        comments:       this.comments.length,
    }
}

function getNewID() {
    return new Date().getTime();
}
function addLike(user) {
    //TODO: addLike to Post
}
function addComment(user, content) {
    //TODO: addComment to post
}
function setShow(isShow) {
    //TODO: setShow
}
function setBlockComment(isBlockComment) {
    //TODO: setBlockComment
}

ScheduleSchema.methods.getBasicInfo = getBasicInfo;
ScheduleSchema.methods.addLike = addLike;
ScheduleSchema.methods.addComment = addComment;
ScheduleSchema.methods.setShow = setShow;
ScheduleSchema.methods.setBlockComment = setBlockComment;

ScheduleSchema.statics.getNewID = getNewID;

module.exports = mongoose.model('Post', ScheduleSchema);