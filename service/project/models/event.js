//Action with trigger(type, data) for user/group have scheduleID.
var mongoose = require('mongoose');
var ContextEnum = {
    1: 'User',
    10: 'Group',
}
var EventSchema = new mongoose.Schema({
    _id: { type: Number, default: getNewID},
    // index: {type: Number},
    title: { type: String, required: true, default: 'No Title' },
    content: { type: String, required: true, default: 'No Content' },
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
    contextID: {type: Number, default: null},
    context: {type: Number, default: 1},
    isAllDay: {type: Boolean, default: false},
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
    // trigger: {//not complete.
    //     type: {
    //         type:String,//[post, notify, message], combine??
    //         data: {},//reference data with typetrigger,
    //         targettype: String,//user,group, system
    //         targetsource:String,//userid/groupid/string message...
    //     },
    //     required: true,
    //     default: {
    //         types: null,
    //         data: null,
    //         targettype: null,
    //         targetsource:null
    //     },
    // },
    // scheduleID: {
    //     type: {
    //         _id: Number,
    //         //....starttime, endtime, recurrent, repeatecount.
    //     },
    //     required: true,
    //     default: null,
    // },
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
        title: this.title,
        content: this.content,
        usercreate: this.usercreate,
        context: this.content,
        isGroupContext: this.ContextEnum[this.context] == 'Group',
        isAllDay: this.isAllDay,
        startTime: this.startTime ? this.startTime.toLocaleString() : null,
        endTime: this.endTime ? this.endTime.toLocaleString() : null,
        timeCreate: this.timeCreate.toLocaleString()
    }
}
function isGroupContext() {
    return this.ContextEnum[this.context] == 'Group';
}
function isUserContext() {
    return this.ContextEnum[this.context] == 'User';
}
function getNewID() {
    return new Date().getTime();
}

EventSchema.methods.getBasicInfo = getBasicInfo;
EventSchema.statics.getNewID = getNewID;
EventSchema.isGroupContext = isGroupContext;
EventSchema.isUserContext = isUserContext;
module.exports = mongoose.model('Event', EventSchema);