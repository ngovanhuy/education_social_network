var Application = require('./application/application');
var mongoose = require('mongoose');
var userController = require('./controllers/user');
var clientController = require('./controllers/client');
var groupController = require('./controllers/group');
var fileItemController = require('./controllers/fileitem');

var User = require('./models/user');
var Group = require('./models/group');
var FileItem = require('./models/fileitem');
var PostSchema = require('./models/post');
// Application.manager.connectToDB();

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
function validateGroupName(name, isRequired = true) {
    if (!name) {
        return !isRequired;
    }
    var re = /^([a-zA-Z\-0-9\.\_\ ]{1,40})$/;
    if (re.test(name)) {
        return true;
    }
    return false;
}

let dateString = "2017-11-25T09:18:48"
var date = new Date(dateString + "Z");
console.log(date.toLocaleDateString());