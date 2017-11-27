let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');
let Utils = require('../application/utils');
let GenderEnum = {
    0: "None",
    1: "Male",
    2: "Female"
};
let TypeUserEnum = {
    0: "Normal",
    10: "Teacher",
    100: "System"
};
let StatusEnum = {
    0: "New",
    10: "Normal"
};
let UserSchema = new mongoose.Schema(
    {
        _id: { type: Number, default: getNewID },// id: { type: Number, unique: true, require: true, index: true, default: Date.now },
        username: { type: String, unique: true, required: true, },
        password: { type: String, required: true },
        firstName: { type: String, required: true, },
        lastName: { type: String, required: true, },
        typeuser: { type: Number, require: false, default: 0, min: 0, max: 1000 },
        email: { type: String, required: false, default: null },//, unique: true},
        phone: { type: String, required: false, default: null },// unique: true},
        profileImageID: { type: String, required: false, default: null, },
        coverImageID: { type: String, require: false, default: null, },
        birthday: { type: Date, required: false, default: null, },
        gender: { type: Number, required: false, default: 0, min: 0, max: 2 },
        about: { type: String, required: false, default: "", },
        quote: { type: String, required: false, default: "", },
        nickname: { type: [String], required: false, },
        skills: {
            type: [{
                _id: { type: Number, default: getNewID },
                name: String,
                description: String,
                isRemoved: {type: Boolean, default: false}
            }],
            required: false,
            default: [],
        },
        worked: {
            type: [{
                _id: { type: Number, default: getNewID },
                startTime: Date,
                endTime: { type: Date, default: null },
                where: String,
                description: String,
                isRemoved: {type: Boolean, default: false}
            }],
            required: false,
            default: [],
        },
        language: {
            type: [{
                _id: { type: Number, default: getNewID },
                code: String,
                text: String,
                isDefault: {type: Boolean, default: false},
                isRemoved: {type: Boolean, default: false}
            }],
            required: false,
            default: [{ code: 'en-US', text: 'English(US)', isDefault: true }]
        },
        lifeEvent: {
            type: [{
                _id: { type: Number, default: getNewID },
                startTime: Date,
                endTime: { type: Date, default: null },
                description: String,
                isRemoved: {type: Boolean, default: false}
            }],
            required: false,
            default: [],
        },
        classs: {
            type: [{
                _id: Number,
                name: String,
                profileImageID: String,
                isRemoved: { type: Boolean, default: false, },
                timeCreate: { type: Date, default: Date.now() },
                timeUpdate: { type: Date, default: Date.now() },
            }],
            required: false,
            default: [],
        },
        friends: {
            type: [{
                _id: Number,
                firstName: String,
                lastName: String,
                profileImageID: String,
                isRemoved: { type: Boolean, default: false, },
                timeCreate: { type: Date, default: Date.now() },
                timeUpdate: { type: Date, default: Date.now() },
            }],
            required: false,
            default: [],
        },
        status: { type: Number, required: false, default: 0, min: 0, max: 1000 },
        location: { type: String, required: false, default: "" },
        isDeleted: { type: Boolean, require: false, default: false, },
        requests: {
            type: [{
                _id: Number,
                firstName: String,
                lastName: String,
                profileImageID: String,
                isRemoved: { type: Boolean, default: false, },
                timeCreate: { type: Date, default: Date.now },
                timeUpdate: { type: Date, default: Date.now },
            }],
            require: true,
            default: [],
        },
        requesteds: {
            type: [{
                _id: Number,
                firstName: String,
                lastName: String,
                profileImageID: String,
                isRemoved: { type: Boolean, default: false, },
                timeCreate: { type: Date, default: Date.now },
                timeUpdate: { type: Date, default: Date.now },
            }],
            require: true,
            default: [],
        },
        classrequests: {
            type: [{
                _id: Number,
                name: String,
                profileImageID: String,
                isRemoved: { type: Boolean, default: false, },
                timeCreate: { type: Date, default: Date.now },
                timeUpdate: { type: Date, default: Date.now },
            }],
            require: true,
            default: [],
        },
        timeCreate: {
            type: Date,
            default: Date.now,
        },
        timeUpdate: {
            type: Date,
            default: Date.now,
        },
    }
);
UserSchema.pre('save', function (callback) {
    let user = this;
    user.timeUpdate = Date.now();
    if (!user.isModified('password')) return callback();
    bcrypt.genSalt(5, (err, salt) => {
        if (err) return callback(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return callback(err);
            user.password = hash;
            callback();
        });
    });
});

function comparePassword(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
}

function addUserInArray(new_user, arrays) {
    if (!new_user) {
        return null;
    }
    let user = null;
    let timeUpdate = Date.now();
    for (let index = 0; index < arrays.length; index++) {
        user = arrays[index];
        if (user._id === new_user._id) {
            user.timeUpdate = timeUpdate;
            user.firstName = new_user.firstName;
            user.lastName = new_user.lastName;
            user.profileImageID = new_user.profileImageID;
            if (user.isRemoved) {
                user.isRemoved = false;
                user.timeCreate = timeUpdate;
            }
            return user;
        }
    }
    user = {
        _id: new_user._id,
        firstName: new_user.firstName,
        lastName: new_user.lastName,
        profileImageID: new_user.profileImageID,
        isRemoved: false,
        timeCreate: timeUpdate,
        timeUpdate: timeUpdate,
    };
    arrays.push(user);
    return user;
}
function removeUserFromArray(remove_user, arrays) {
    if (!remove_user) {
        return null;
    }
    let user = null;
    for (let index = 0; index < arrays.length; index++) {
        user = arrays[index];
        if (user._id === remove_user._id) {
            user.isRemoved = true;
            return user;
        }
    }
    return null;
}
function addGroupInArray(new_group, arrays) {
    if (!new_group) {
        return null;
    }
    let group = null;
    let timeUpdate = Date.now();
    for (let index = 0; index < arrays.length; index++) {
        group = arrays[index];
        if (group._id === new_group._id) {
            group.timeUpdate = timeUpdate;
            group.name = new_group.name;
            group.profileImageID = new_group.profileImageID;
            if (group.isRemoved) {
                group.isRemoved = false;
                group.timeCreate = timeUpdate;
            }
            return group;
        }
    }
    group = {
        _id: new_group._id,
        name: new_group.name,
        profileImageID: new_group.profileImageID,
        isRemoved: false,
        timeCreate: timeUpdate,
        timeUpdate: timeUpdate,
    };
    arrays.push(group);
    return group;
}
function removeGroupFromArray(remove_group, arrays) {
    if (!remove_group) {
        return null;
    }
    let group = null;
    for (let index = 0; index < arrays.length; index++) {
        group = arrays[index];
        if (group._id === remove_group._id) {
            group.isRemoved = true;
            return group;
        }
    }
    return null;
}

function addFriend(user, isUpdateReference = true) {
    if (!user) {
        return null;
    }
    let new_user = addUserInArray(user, this.friends);
    if (new_user) {
        if (isUpdateReference) {
            return user.addFriend.call(user, this, false);
        }
        return user;
        //var currentUser = this;
        //return addUserInArray(currentUser, user.friends) ? user : null;
    }
    return null;
}
function removeFriend(user, isUpdateReference = true) {
    if (!user) {
        return null;
    }
    let remove_user = removeUserFromArray(user, this.friends);
    if (remove_user) {
        if (isUpdateReference) {
            user.removeFriend.call(user, this, false);
        }
        return user;
        //var currentUser = this;
        //return removeUserFromArray(currentUser, user.friends) ? user : null;
    }
    return null;
}
function addRequest(user) {
    let new_user = addUserInArray(user, this.requests);
    if (new_user) {
        user.addRequested.call(user, this);
        return user;
    }
    return null;
}
function removeRequest(user) {
    let remove_user = removeUserFromArray(user, this.requests);
    if (remove_user) {
        user.removeRequested.call(user, this);
        return user;
    }
    return null;
}
function addRequested(user) {
    return addUserInArray(user, this.requesteds) ? user : null;
}
function removeRequested(user) {
    return removeUserFromArray(user, this.requesteds) ? user : null;
}
function confirmRequested(user) {
    if (addFriend(user, true)) {
        removeRequested(user);
        return user;
    }
    return null;
}
function addClassRequest(new_group) {
    let group = addGroupInArray(new_group, this.classrequests);
    if (group) {
        if (new_group.addRequested.call(new_group, this)) {
            return group;
        }
        return null;
    }
    return group;
}
function removeClassRequest(remove_group) {
    let group = removeGroupFromArray(remove_group, this.classrequests);
    if (group) {
        remove_group.removeRequested.call(remove_group, this);
    }
    return remove_group;
}
function addToClass(group) {
    return addGroupInArray(group, this.classs) ? group : null;
}
function removeFromClass(group) {
    return removeGroupFromArray(group, this.classs) ? group : null;
}
function getGroups() {
    let groups = [];
    this.groups.forEach(group =>  {
        if (!group.isRemoved) {
            groups.push({
                id: group.id,
                name: group.name,
                profileImageID: group.profileImageID,
            });
        }
    });
    return groups;
}
function getClassRequests() {
    let requests = [];
    this.classrequests.forEach(request => {
        if (!request.isRemoved) {
            requests.push({
                _id: request.id,
                name: request.name,
                profileImageID: null,
            });
        }
    });
    return requests;
}

function validateUserName(username, isRequired = true) {
    if (!username) {
        return !isRequired;
    }
    let re = /^([a-zA-Z\-0-9\.\_]{1,20})$/;
    if (re.test(username)) {
        return true;
    }
    if (Utils.validateEmail(username)) {
        return true;
    }
    return Utils.validatePhoneNumber(username);
}
function validateGender(gender, isRequired = false) {
    if (!gender) {
        return !isRequired;
    }
    return GenderEnum[gender];
}
function validateTypeUser(typeUser, isRequired = false) {
    if (!typeUser) {
        return !isRequired;
    }
    return TypeUserEnum[typeUser];
}
function validateStatus(status, isRequired = false) {
    if (!status) {
        return !isRequired;
    }
    return StatusEnum[status];
}
function validateInputInfo(inputInfo, checkRequired = false) {
    if (!inputInfo) {
        return [];
    }
    let message = [];
    //---------- REQUIRED --------------
    if (!(validateUserName(inputInfo.username, checkRequired))) {
        message.push("UserName Invalid Format");
    }
    if (!Utils.validateStringLength(inputInfo.firstName, 2, 20, checkRequired)) {
        message.push("FirstName Invalid Format");
    }
    if (!Utils.validateStringLength(inputInfo.lastName, 2, 20, checkRequired)) {
        message.push("LastName Invalid Format");
    }
    if (!Utils.validateStringLength(inputInfo.password, 5, 20, checkRequired)) {
        message.push("Password Invalid Format");
    }
    //------------ NOT REQUIRED ----------------
    if (!Utils.validateStringLength(inputInfo.about, 0, 200, false)) {
        message.push("About Invalid Format");
    }
    if (!Utils.validateStringLength(inputInfo.quote, 0, 100, false)) {
        message.push("Quote Invalid Format");
    }
    if (inputInfo.nickname) {
        if (!Utils.getStringArray(inputInfo.nickname)) {
            message.push("NickName Invalid Format");
        }
    }
    if (inputInfo.language) {
        if (!getArrayLanguage(inputInfo.language)) {
            message.push("Language Invalid Format");
        }
    }
    if (!Utils.validateEmail(inputInfo.email, false)) {
        message.push("Email Invalid Format");
    }
    if (!Utils.validatePhoneNumber(inputInfo.phone, false)) {
        message.push("Phone Invalid Format");
    }
    if (!validateGender(inputInfo.gender, false)) {
        message.push("Gender Invalid Format");
    }
    if (!validateTypeUser(inputInfo.typeuser, false)) {
        message.push("TypeUser Invalid Format");
    }
    if (!validateStatus(inputInfo.status, false)) {
        message.push("Status Invalid Format");
    }
    if (inputInfo.birthday) {
        if (!getBirthDate(inputInfo.birthday)) {
            message.push("Birthday Invalid Format");
        }
    }
    return message;
}

function getGenderInfo(enum_id) {
    return { enum_id: enum_id, text: GenderInfo[enum_id] };
}
function getTypeUserInfo(enum_id) {
    return { enum_id: enum_id, text: TypeUserEnum[enum_id] };
}
function getArrayLanguage(languageString) {
    try {
        let [...languages] = JSON.parse(languageString);
        let data = [];
        for (let index = 0; index < languages.length; index++) {
            let { code = 'en-US', text = 'English(US)', isDefault = false,} = languages[index];
            data.push({
                _id: index,
                code: code,
                text: text,
                isDefault: isDefault ? isDefault: false,
            });
        }
        return data;
    } catch (error) {
        return null;
    }
}
function getBirthDate(dateString) {
    return Utils.parseDate(dateString);
}
function getNewID() {
    return new Date().getTime();
}
function verifyPassword(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => err ? cb(err) : cb(null, isMatch));
}
function getInfo(params) {
    if (!params) {
        return getBasicInfo.call(this);
    }
    let o = {};
    let ignoreField = ['password', 'isDeleted'];
    for (let param in params) {
        if (ignoreField.indexOf(param) > -1) {
            continue;
        }
        let field = this[param];
        if (field) {
            o[param] = field;
        }
    }
    return o;
}
function getBasicInfo() {
    return {
        id: this.id,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        typeuser: { enum_id: this.typeuser, text: TypeUserEnum[this.typeuser] },
        email: this.email,
        birthday: this.birthday ? this.birthday.toLocaleString() : null,
        phone: this.phone,
        gender: { enum_id: this.gender, text: GenderEnum[this.gender] },
        about: this.about,
        quote: this.quote,
        location: this.location,
        profileImageID: this.profileImageID,
        coverImageID: this.coverImageID,
    }
}
function isNormalUser() {
    return TypeUserEnum[this.typeuser] === 'Normal';
}

function isTeacher() {
    return TypeUserEnum[this.typeuser] === 'Teacher';
}

function isSystem() {
    return TypeUserEnum[this.typeuser] === 'System';
}
/*-------------------------------------- */
UserSchema.statics.GenderInfo = getGenderInfo;
UserSchema.statics.TypeUserInfo = getTypeUserInfo;
UserSchema.statics.validateUserName = validateUserName;
UserSchema.statics.validateGender = validateGender;
UserSchema.statics.validateTypeUser = validateTypeUser;
UserSchema.statics.validateStatus = validateStatus;
UserSchema.statics.validateInputInfo = validateInputInfo;
UserSchema.statics.getArrayLanguage = getArrayLanguage;
UserSchema.statics.getBirthDate = getBirthDate;
UserSchema.statics.getNewID = getNewID;

UserSchema.methods.verifyPassword = verifyPassword;
UserSchema.methods.getBasicInfo = getBasicInfo;
UserSchema.methods.comparePassword = comparePassword;
UserSchema.methods.getInfo = getInfo;
UserSchema.methods.isNormalUser = isNormalUser;
UserSchema.methods.isTeacher = isTeacher;
UserSchema.methods.isSystem = isSystem;

UserSchema.methods.addFriend = addFriend;
UserSchema.methods.removeFriend = removeFriend;
UserSchema.methods.addRequest = addRequest;
UserSchema.methods.removeRequest = removeRequest;
UserSchema.methods.addRequested = addRequested;
UserSchema.methods.removeRequested = removeRequested;
UserSchema.methods.confirmRequested = confirmRequested;

UserSchema.methods.addClassRequest = addClassRequest;
UserSchema.methods.removeClassRequest = removeClassRequest;

UserSchema.methods.addToClass = addToClass;
UserSchema.methods.removeFromClass = removeFromClass;
UserSchema.methods.getGroups = getGroups;
UserSchema.methods.getClassRequests = getClassRequests;

module.exports = mongoose.model('User', UserSchema); 