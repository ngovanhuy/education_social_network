var mongoose = require('mongoose');

var FileItemSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true, },
    name: { type: String, required: true, default: 'NoName' },
    type: { type: String, required: true, default: 'application/octet-stream', },
    size: { type: Number, required: true, default: 0, },
    createDate: { type: Date, required: false, default: Date.now(), },
    isDeleted: { type: Boolean, required: true, default: false, },
});

FileItemSchema.methods.getBasicInfo = function(file) {
    return {
        id: file._id,
        name: file.name,
        type: file.type,
        size: file.size,
        createDate: file.createDate.toLocaleString(),
    }
}
module.exports = mongoose.model('FileItem', FileItemSchema);