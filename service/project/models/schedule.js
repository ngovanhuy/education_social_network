//schedule with time: start, end, count, repeate, on/off, recurrent..., using with event.
var mongoose = require('mongoose');

var ScheduleSchema = new mongoose.Schema({
    _id: { type: Number, default: getNewID()},
    title: { type: String, required: true, default: 'Once' },
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
    options: {//not complete.
        type: {
            type:String,//[once, repeate, next...], combine??
            //...
        },
        required: true,
        default: null,
    },
    eventID: {
        type: {
            _id: Number,
            //....info.
        },
        required: true,
        default: null,
    },
    timeCreate: { type: Date, required: false, default: Date.now(),} },
    timeUpdate: { type: Date, required: false, default: Date.now(),} },
    isDeleted: { type: Boolean, required: true, default: false, },
});

ScheduleSchema.pre('save', function (callback) {
    var _this = this;
    _this.timeUpdate = new Date();
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

ScheduleSchema.methods.getBasicInfo = getBasicInfo;
ScheduleSchema.statics.getNewID = getNewID;

module.exports = mongoose.model('Schedule', ScheduleSchema);