var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var GenderEnum = {
    0 : "None",
    1 : "Male",
    2 : "Female"
}
var TypeUserEnum = {
    0: "Normal",
    10: "Teacher",
    100: "System"
}

var StatusEnum = {
    0: "New",
    10: "Normal"
}

var UserSchema = new mongoose.Schema(
    {
        id: { type: String, unique: true, require: true },
        username: { type: String, unique: true, required: true, },
        typeuser: { type: Number, require: true, default: 0, }, //type: 0, 10, 100
        password: { type: String, required: true },//check privacy
        firstName: { type: String,  required: true, },//maxLength
        lastName: { type: String,  required: true, }, //maxLength
        email: { type: String, required: false,  default: null, },//Array ???->unique.
        phone: { type: String,  required: false, default: null, },//Array ????->unique
        profileImageID: { type: String, required: false, default: null, }, // ID avatarImage file || null
        coverImageID: {type: String, require: false, default: null,},//ID profileImage file || null
        birthday: { type: Date, required: false, default: null, }, //Only Day//YYYY-MM-DD
        gender: { type: Number,  required: false, default: 0,},// Enum = (0, 10, 20) ::: (NONE, MALE, FEMALE)
        about: { type: String, required: false, default: "", },//maxLength
        quote : { type: String,required: false, default: "", }, //maxLength
        nickname: { type: Array, required: false, },//[nickname1, nickname2,...]
        skills: { type: Array, required: false, default: [], },//[skill{[id], level[beginner|master|...-> [0, 1, ...]], description},]
        worked: { type: Array, required: false, default: [], },//[work{startTime, [endTime], where, description}]
        language: { type: Array, required: false, default: [{code:'en-US', text:'English(US)', isDefault: true}], },//[language: {code:'vi-vn', text='VietNam'}, ....]
        lifeEvent: { type: Array, required: false, default: [], },//[event {startTime, [endTime], description},...]
        classs: { type: Array, required: false, default:[], }, //[classID,...]
        friends: { type: Array, required: false, default: [],},//[friendID,...] 
        status: { type: Number, required: false, default: 0, }, //[NEW, BLOCKED, NORMAL] = [0, 10, 100]
        location: {type: String, required: false, default:""},
        isDeleted: { type: Boolean, require: false, default: false, }
    }
);

UserSchema.pre('save', function(callback)  {
    var user = this;
    if (!user.isModified('password')) return callback();
    bcrypt.genSalt(5,  (err, salt) => {
        if (err) return callback(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return callback(err);
            user.password = hash;
            callback();
        });
    });
});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validatePhoneNumber(phone) {
    var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(Number(phone));
}
function validateUserName(username) {
    if (!username) {
        return false;
    }
    var re = /^([a-zA-Z\-0-9\.\_]{1,20})$/;
    if (re.test(username)) {
        return true;
    }
    if (validateEmail(username)) {
        return true;
    }
    if (validatePhoneNumber(username)) {
        return true;
    }
    return false;
}
function validateGender(gender) {
    return GenderEnum[gender];
}
function validateTypeUser(typeUser) {
    return TypeUserEnum[typeUser];
}
function validateStatus(status) {
    return StatusEnum[status];
}

function isString(obj) {
    return typeof (obj) === "string";
}

function isStringEmpty(obj, minLength = 1, maxLength = 100) {
    return isString(obj) && obj.length >= minLength && obj.length <= maxLength;
}

function validateInputInfo(inputInfo, required = false) {
    if (!inputInfo) {
        return [];
    }
    let message = [];
    if (!(validateUserName(inputInfo.username))) {
        message.push("UserName Invalid");
    }
    if (!isStringEmpty(inputInfo.firstName, 1, 20)) {
        message.push("FirstName Invalid");
    }
    if (!isStringEmpty(inputInfo.lastName, 1, 20)) {
        message.push("LastName Invalid");
    }
    if (!isStringEmpty(inputInfo.password, 1, 20)) {
        message.push("Password Invalid");
    }
    if (!(inputInfo.email && validateEmail(inputInfo.email))) {
        message.push("Email Invalid");
    }
    if (!(inputInfo.phone && validatePhoneNumber(inputInfo.phone))) {
        message.push("Phone Invalid");
    }
    if (!(inputInfo.birthday) && getDate(inputInfo.birthday)) {
        message.push("Birthday Invalid");
    }
    if (!(inputInfo.gender && validateGender(inputInfo.gender))) {
        message.push("Gender Invalid");
    }
    if (!(inputInfo.typeuser && validateTypeUser(inputInfo.typeuser))) {
        message.push("TypeUser Invalid");
    }
    if (!(inputInfo.status && validateStatus(inputInfo.status))) {
        message.push("Status Invalid");
    }
    return message;
}

function getGenderInfo(enum_id) {
    return {enum_id: enum_id, text: GenderInfo[enum_id]};
}
function getTypeUserInfo(enum_id) {
    return {enum_id: enum_id, text: TypeUserEnum[enum_id]};
}
function verifyPassword(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => err ?  cb(err) : cb(null, isMatch));
};

function getBasicInfo() {
    return {
        id:             this.id,
        username:       this.username,
        typeuser:       {enum_id: this.typeuser, text: TypeUserEnum[this.typeuser]}, 
        firstName:      this.firstName,
        lastName:       this.lastName,
        email:          this.email,
        birthday:       this.birthday.toLocaleString(),
        phone:          this.phone,
        gender:         {enum_id: this.gender, text: GenderEnum[this.typeuser]},
        about:          this.about,
        quote:          this.quote,
        location:       this.location,
        nickname:       this.nickname,
        friends:        this.friends,
        classs:         this.classs,
        status:         {enum_id: this.status, text: StatusEnum[this.status]},
        profileImageID: this.profileImageID,
        coverImageID:   this.coverImageID,

    }
}

/*-------------------------------------- */
UserSchema.statics.GenderInfo = getGenderInfo;
UserSchema.statics.TypeUserInfo = getTypeUserInfo;
UserSchema.statics.validateEmail = validateEmail;
UserSchema.statics.validatePhoneNumber = validatePhoneNumber;
UserSchema.statics.validateUserName = validateUserName;
UserSchema.statics.validateGender = validateGender;
UserSchema.statics.validateTypeUser = validateTypeUser;
UserSchema.statics.validateStatus = validateStatus;
UserSchema.statics.validateInputInfo = validateInputInfo;

UserSchema.methods.verifyPassword = verifyPassword;
UserSchema.methods.getBasicInfo = getBasicInfo;

module.exports = mongoose.model('User', UserSchema); 