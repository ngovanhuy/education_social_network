//Like from user -> post
var mongoose = require('mongoose');

var LikeSchema = new mongoose.Schema({
    _id: { type: Number, default: getNewID()},
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
    targetpost: { 
        type: {
            _id: Number,
            timeCreate: { type: Date, default: Date.now()},
            timeUpdate: { type: Date, default: Date.now()},
        }, 
        required: true, 
        default: null 
    },
    isDeleted: { type: Boolean, required: true, default: false, },
    timeCreate: { type: Date, required: false, default: Date.now() },
    timeUpdate: { type: Date, required: false, default: Date.now() },
});

LikeSchema.pre('save', function (callback) {
    var _this = this;
    _this.timeUpdate = new Date();
    return callback();
});

function getBasicInfo() {
    return {
        id:                 this._id,
        timeCreate:         this.timeCreate.toLocaleString(),
        sourceuser:         this.sourceuser,
        targetpost:        this.targetpost,
    }
}

function getNewID() {
    return new Date().getTime();
}

LikeSchema.methods.getBasicInfo = getBasicInfo;
LikeSchema.statics.getNewID = getNewID;

module.exports = mongoose.model('Follow', LikeSchema);