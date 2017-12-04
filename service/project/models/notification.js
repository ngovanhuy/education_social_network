//Notify from user|group|system -> user
var mongoose = require('mongoose');

var NotificationSchema = new mongoose.Schema({
    _id: { type: Number, default: getNewID},
    // sourceuser: { 
    //     type: {
    //         _id: Number,
    //         firstName: String,
    //         lastName: String,
    //         profileImageID: String,
    //         timeCreate: Date,
    //         timeUpdate: Date,
    //     }, 
    //     required: true, 
    //     default: null 
    // },
    // targetgroup: { 
    //     type: {
    //         _id: Number,
    //         name: String,
    //         profileImageID: String,
    //         timeCreate: { type: Date, default: Date.now },
    //         timeUpdate: { type: Date, default: Date.now },
    //     }, 
    //     required: true, 
    //     default: null 
    // },
    content: String,
    isDeleted: { type: Boolean, required: true, default: false, },
    timeCreate: { type: Date, required: false, default: Date.now, },
    timeUpdate: { type: Date, required: false, default: Date.now, },
});

NotificationSchema.pre('save', function (callback) {
    var _this = this;
    _this.timeUpdate = new Date();
    return callback();
});

function getBasicInfo() {
    return {
        id:                 this._id,
        timeCreate:         this.timeCreate.toLocaleString(),
        // sourceuser:         this.sourceuser,
        // targetgroup:        this.targetgroup,
        content:    this.content,
    }
}

function getNewID() {
    return new Date().getTime();
}

NotificationSchema.methods.getBasicInfo = getBasicInfo;
NotificationSchema.statics.getNewID = getNewID;

module.exports = mongoose.model('Notification', NotificationSchema);