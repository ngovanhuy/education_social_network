var mongoose = require('mongoose');

var FileSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        default: 'NoName'
    },
    type: {
        type: String,
        required: true,
        default: 'application/octet-stream',
    },
    size: {
        type: Number,
        required: true,
        default: 0,
    },
    createdate: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

module.exports = mongoose.model('File', FileSchema);