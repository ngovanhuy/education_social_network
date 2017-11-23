var Application = require('./application/application');
var mongoose = require('mongoose');
var userController = require('./controllers/user');
var clientController = require('./controllers/client');
var groupController = require('./controllers/group');
var fileItemController = require('./controllers/fileitem');

var User = require('./models/user');
var Group = require('./models/group');
var FileItem = require('./models/fileitem');
var PostSchema = require('./models/posts');
Application.manager.connectToDB();

var chars = "abcdefjhijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ0123456789";
var numbers = "0123456789";
var random = Math.random;
var maxIndex = chars.length;
function nextInt(max = 100, min = 0) {
    return min + Math.ceil((max - min) * random());
}
function randomStringNumber(maxLength) {
    let strs = [];
    for (let i = 0; i < maxLength; i++) {
        strs.push(numbers[nextInt(0, numbers.length)]);
    }
    return strs.join("");
}
function randomString(maxLength) {
    let strs = [];
    for (let i = 0; i < maxLength; i++) {
        strs.push(chars[nextInt(0, maxIndex)]);
    }
    return strs.join("");
}
