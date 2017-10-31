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

function getGenderInfo(enum_id) {
    return {enum_id: enum_id, text: GenderInfo[enum_id]};
}
function getTypeUserInfo(enum_id) {
    return {enum_id: enum_id, text: TypeUserEnum[enum_id]};
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

UserSchema.methods.verifyPassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => err ?  cb(err) : cb(null, isMatch));
};

UserSchema.methods.getBasicInfo = function() {
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
/*--------------------------------*/
function getArray(stringContent) {
    if (!stringContent) {
        return [];
    }
    if (typeof(stringContent) === "string") {
        return [...rest] = JSON.parse(stringContent);
    }
    return [...str] = stringContent;
}

function getLanguage(languageString) {
    var { code = 'en-US', text = 'English(US)', isDefault = true } = JSON.parse(languageString);
    return {
        code: code,
        text: text,
        isDefault: isDefault
    };
}

function getDate(dateString) {
    if (!dateString) {
        return null;
    }
    var date = new Date(dateString);
    return isNaN(date.getDate()) ? null : date;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validatePhoneNumber(phone) {
    var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(phone);
}
function validateUserName(username) {
    if (!username) {
        return false;
    }
    var re = /^([a-zA-Z\-0-9\.\_]{1,20})$/;
    return re.test(username);
}
function validateUserInfo(inputObject) {
    if (!inputObject) {
        return null;
    }
    if (!validateUserName(inputObject.username) ||
        isStringEmpty(inputObject.lastname, 1, 20) ||
        isStringEmpty(inputObject.firstname, 1, 20) ||
            isStringEmpty(inputObject.password, 1, 20)) {
        return null;
    }
    let user = new User({
        username : inputObject.username,
        firstname : inputObject.firstname,
        lastname : inputObject.lastname,
        password : inputObject.password,
    });
    if (inputObject.birthday) {
        let date = getDate(inputObject.birthday);
        if (!date) {
            return null;
        }
        user.birthday = date;
    }
    if (input.gender) {
        let gender = inputObject.gender;
        if (gender == 0 || gender == 1 || gender == 2) {
            user.gender = gender;
        } else {
            return null;
        }
    }
    if (inputObject.email) {
        if (!validateEmail(inputObject.email)) {
            return null;
        }
        user.email = inputObject.email;
    }
    if (inputObject.phone) {
        if (!validatePhoneNumber(inputObject.phone)) {
            return null;
        }
        user.phone = phone;
    }
    if (inputObject.quote) {
        user.quote = inputObject.quote;
    }
    if (inputObject.about) {
        user.about = inputObject.about;
    }
    if (inputObject.nickname) {
        user.nickname = getArray(inputObject.nickname);
    }
    if (inputObject.language) {
        user.language = getLanguage(inputObject.language);
    }
    if (inputObject.location) {
        user.location = req.location;
    }
    user.isDeleted = false;
}
/*-------------------------------------- */
UserSchema.statics.GenderInfo = getGenderInfo;
UserSchema.static.TypeUserInfo = getTypeUserInfo;
module.exports = mongoose.model('User', UserSchema); 