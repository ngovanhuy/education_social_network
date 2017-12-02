//Action with trigger(type, data) for user/group have scheduleID.
let mongoose = require('mongoose');
let Utils = require('../application/utils');
let ContextEnum = {
    1: 'User',
    10: 'Group',
    100: 'System',
};
let EventSchema = new mongoose.Schema({
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
            // timeCreate: Date,
            timeUpdate: Date,
        }, 
        required: true, 
        default: null 
    },
    eventImageID: {type: String, required: true, default: null},
    location: {type: String, required: false, default: ''},
    contextID: {type: Number, default: null},//groupID || userID || null (system)
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
    timeCreate: { type: Date, required: false, default: Date.now(), },
    timeUpdate: { type: Date, required: false, default: Date.now(), },
    isDeleted: { type: Boolean, required: true, default: false, },
});

EventSchema.pre('save', function (callback) {
    let _this = this;
    _this.timeUpdate = Date.now();
    return callback();
});

function getBasicInfo() {
    return {
        id:  this._id,
        title: this.title,
        content: this.content,
        usercreate: this.usercreate,
        context: this.context,
        contextID: this.contextID,
        isGroupContext: ContextEnum[this.context] === 'Group',
        isAllDay: this.isAllDay,
        startTime: Utils.exportDate(this.startTime),
        endTime: Utils.exportDate(this.endTime),
        timeCreate: Utils.exportDate(this.timeCreate),
    }
}
function isGroupContext() {
    return ContextEnum[this.context] === 'Group';
}
function isUserContext() {
    return ContextEnum[this.context] === 'User';
}
function isSystemContext() {
    return ContextEnum[this.context] === 'System';
}

function setSystemContext() {
    this.context = 100;
    return this;
}
function setGroupContext(contextID) {
    this.context = 10;
    this.contextID = contextID;
    return this;
}
function setContext(context, contextID) {
    let contextType = ContextEnum[context];
    if (!contextType) {
        return null;
    }
    this.context = context;
    if (contextID) {
        let numberContextID = Number(contextID);
        if (isNaN(numberContextID)) {
            return null;
        }
        this.contextID = contextID;
        return this;
    }
    this.contextID = null;
    return this;
}
function getNewID() {
    return Date.now();
}

EventSchema.methods.getBasicInfo = getBasicInfo;
EventSchema.methods.isGroupContext = isGroupContext;
EventSchema.methods.isUserContext = isUserContext;
EventSchema.methods.isSystemContext = isSystemContext;
EventSchema.methods.setContext = setContext;

EventSchema.statics.getNewID = getNewID;
module.exports = mongoose.model('Event', EventSchema);