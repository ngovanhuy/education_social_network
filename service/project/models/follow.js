//Folow from user -> group
var mongoose = require('mongoose');

var FollowSchema = new mongoose.Schema({
    _id: { type: Number, default: getNewID},
    sourceuser: { 
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
    targetgroup: { 
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
    isDeleted: { type: Boolean, required: true, default: false, },
    timeCreate: { type: Date, required: false, default: Date.now, },
    timeUpdate: { type: Date, required: false, default: Date.now, },
});

FollowSchema.pre('save', function (callback) {
    var _this = this;
    _this.timeUpdate = new Date();
    return callback();
});

function getBasicInfo() {
    return {
        id:                 this._id,
        timeCreate:         this.timeCreate.toLocaleString(),
        sourceuser:         this.sourceuser,
        targetgroup:        this.targetgroup,
    }
}

function getNewID() {
    return new Date().getTime();
}

FollowSchema.methods.getBasicInfo = getBasicInfo;
FollowSchema.statics.getNewID = getNewID;

module.exports = mongoose.model('Follow', FollowSchema);