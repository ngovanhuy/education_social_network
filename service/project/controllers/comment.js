var Users = require('../controllers/user');
var Groups = require('../controllers/group');
var Comment = require('../models/comment');
var Posts = require('../controllers/post');

async function findCommentByID(id) {
    let comment = await Comment.findById(id);
    return comment;
}

exports.findCommentByID = findCommentByID;