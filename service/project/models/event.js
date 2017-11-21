//Action with trigger(type, data) for user/group have scheduleID.
var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    _id: { type: Number, default: getNewID},
    index: {type: Number},
    title: { type: String, required: true, default: 'No Title' },
    usercreate: {
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
    trigger: {//not complete.
        type: {
            type:String,//[post, notify, message], combine??
            data: {},//reference data with typetrigger,
            targettype: String,//user,group, system
            targetsource:String,//userid/groupid/string message...
        },
        required: true,
        default: {
            types: null,
            data: null,
            targettype: null,
            targetsource:null
        },
    },
    scheduleID: {
        type: {
            _id: Number,
            //....starttime, endtime, recurrent, repeatecount.
        },
        required: true,
        default: null,
    },
    timeCreate: { type: Date, required: false, default: Date.now, },
    timeUpdate: { type: Date, required: false, default: Date.now, },
    isDeleted: { type: Boolean, required: true, default: false, },
});

ScheduleSchema.pre('save', function (callback) {
    var _this = this;
    _this.timeUpdate = Date.now();
    return callback();
});

function getBasicInfo() {
    return {
        id:  this._id,
    }
}

function getNewID() {
    return new Date().getTime();
}

EventSchema.methods.getBasicInfo = getBasicInfo;
EventSchema.statics.getNewID = getNewID;

module.exports = mongoose.model('Event', EventSchema);