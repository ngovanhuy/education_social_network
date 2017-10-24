var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema(
    {
        id: { type: String, unique: true, require: true },
        typeuser: { type: Number, require: true, default: 0, }, 
        username: { type: String, unique: true, required: true, },//will remove.
        password: { type: String, required: true },//check privacy
        firstName: { type: String,  required: false, },//maxLength
        lastName: { type: String,  required: false, }, //maxLength
        email: { type: String, required: false,  default: null, },//Array ???->unique.
        phone: { type: String,  required: false, default: null, },//Array ????->unique
        profileImageID: { type: String, required: false, default: null, }, // ID avatarImage file || null
        coverImageID: {type: String, require: false, default: null,},//ID profileImage file || null
        birthday: { type: Date, required: false, default: null, }, //Only Day
        gender: { type: Number,  required: false, default: 0,},// Enum = (0, 10, 20) ::: (NONE, MALE, FEMALE)
        about: { type: String, required: false, default: "", },//maxLength
        quote : { type: String,required: false, default: "", }, //maxLength
        nickname: { type: Array, required: false, },//[nickname1, nickname2,...]
        skills: { type: Array, required: false, default: [], },//[skill{[id], level[beginner|master|...-> [0, 1, ...]], description},]
        worked: { type: Array, required: false, default: [], },//[work{startTime, [endTime], where, description}]
        language: { type: Array, required: false, default: [{code:'en-US', text:'English(US)', default: true}], },//[language: {code:'vi-vn', text='VietNam', [default:true]}, ....]
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

UserSchema.methods.verifyPassword = (password, cb) => {
    bcrypt.compare(password, this.password, (err, isMatch) => err ?  cb(err) : cb(null, isMatch));
};

UserSchema.methods.getBasicInfo = user => {
    return {
        id:user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email:user.email,
        profileImageID: user.profileImageID,
        coverImageID: user.coverImageID,
        typeuser: user.typeuser,
        birthday: user.birthday,
        phone: user.phone,
        gender:user.gender,
        about: user.about,
        quote: user.quote,
    }
};
module.exports = mongoose.model('User', UserSchema); 