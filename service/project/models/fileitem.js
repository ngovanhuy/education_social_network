let mongoose = require('mongoose');
let Utils = require('../application/utils');
let FileItemSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true, },
    name: { type: String, required: true, default: 'NoName' },
    type: { type: String, required: true, default: 'application/octet-stream', },
    size: { type: Number, required: true, default: 0, },
    createDate: { type: Date, required: false, default: new Date(), },
    isDeleted: { type: Boolean, required: true, default: false, },
    user: {
        type: {
            id: Number,
            firstName: String,
            lastName: String,
        },
        required: false,
        default: null,
    },
    group: {
        type: {
            id: Number,
            name: String,
        },
        required: false,
        default: null
    },
});

FileItemSchema.methods.getBasicInfo = function() {
    return {
        id:         this._id,
        name:       this.name,
        type:       this.type,
        size:       this.size,
        user:       this.user,
        group:      this.group,
        createDate: Utils.exportDate(this.createDate),
    }
};
module.exports = mongoose.model('FileItem', FileItemSchema);