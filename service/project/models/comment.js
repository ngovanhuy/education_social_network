var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    _id: Number,
    content: String,//short_content.
    userID: {
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
    timeCreate: {type: Date, required: true, default: Date.now},
    timeUpdate: {type: Date, required: true, default: Date.now},
    isDeleted: {type: Boolean, required: true, default: false}
});
CommentSchema.pre('save', function (callback) {
    var _this = this;
    _this.timeUpdate = Date.now();
    return callback();
});

function getBasicInfo() {
    return {
        id: this._id,
        content: this.content,//short_content recomment
        userID: this.userID,
        groupID: this.groupID,
        timeCreate: this.timeCreate.toLocaleString(),
        timeUpdate: this.timeUpdate.toLocaleString(),
    }
}

function getNewID() {
    return new Date().getTime();
}

function addCommentToPost(post) {
    //TODO addCommentToPost
}

function removeCommentFromPost(post) {
    //TODO: RemoveCommentFromPost
}

CommentSchema.methods.getBasicInfo = getBasicInfo;
CommentSchema.statics.getNewID = getNewID;

module.exports = mongoose.model('Comment', CommentSchema);