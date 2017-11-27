let bcrypt = require('bcrypt-nodejs');
let chars = "abcdefjhijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ0123456789+=-_";
let numbers = "0123456789";
let random = Math.random;
let maxIndex = chars.length;
let isLog = true;

function validatePhoneNumber(phone, isRequired = false) {
    if (!phone) {
        return !isRequired;
    }
    let re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(phone) || re.test(Number(phone));
}
function validateEmail(email, isRequired = false) {
    if (!email) {
        return !isRequired;
    }
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
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
    let date = new Date(dateString + "Z");
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
};
exports.log = content => {
    isLog ? console.log(content) : undefined;
};

function validateStringLength(obj, minLength = 1, maxLength = 100, isRequired = true) {
    if (typeof (obj) !== "string") {
        return !isRequired;
    }
    return obj.length >= minLength && obj.length <= maxLength;
}
exports.nextInt = nextInt;
exports.randomString = randomString;
exports.randomStringNumber = randomStringNumber;
exports.hash = hash;
exports.hashSync = hashSync;
exports.parseDate = parseDate;
exports.getStringArray = getStringArray;
exports.validateEmail = validateEmail;
exports.validatePhoneNumber = validatePhoneNumber;
exports.validateStringLength = validateStringLength;