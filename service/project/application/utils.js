var bcrypt = require('bcrypt-nodejs');
var chars = "abcdefjhijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ0123456789+=-_";
var numbers = "0123456789";
var random = Math.random;
var maxIndex = chars.length;
var isLog = true;

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
function randomString(maxLength = 64) {
    let strs = [];
    for (let i = 0; i < maxLength; i++) {
        strs.push(chars[nextInt(0, maxIndex)]);
    }
    return strs.join("");
}
function hash(input, callback) {
    bcrypt.genSalt(5, function (err, salt) {
        if (err) return callback(err);
        bcrypt.hash(input, salt, null, function (err, hash) {
            if (err) return callback(err);
            return callback(null, hash);
        });
    });
}

function hashSync(input) {
    return bcrypt.hashSync(input);
}

function parseDate(dateString) {
    if (!dateString) {
        return null;
    }
    var date = new Date(dateString + "Z");
    return isNaN(date.getDate()) ? null : date;
}
function getStringArray(jsonContent) {
    try {
        return [...items] = JSON.parse(jsonContent);
    } catch (error) {
        return null;
    }
}
exports.setLog = _isLog => {
    isLog = _isLog === true;
}
exports.log = content => {
    isLog ? console.log(content) : undefined;
}
exports.nextInt = nextInt;
exports.randomString = randomString;
exports.randomStringNumber = randomStringNumber;
exports.hash = hash;
exports.hashSync = hashSync;
exports.parseDate = parseDate;
exports.getStringArray = getStringArray;