var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        require: true
    },
    typeuser: {
        type: Number,//[user, teacher, admin] = [0, 10, 100]
        require: true,
        default: 0,
    },
    username: {       //will remove.
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String, //check privacy
        required: true
    },
    firstName: {
        type: String, //maxLength
        required: false,//true
    },
    lastName: {
        type: String, //maxLength
        required: false,//true
    },
    email: {
        type: String, //Array ???->unique.
        // unique: true,
        required: false, 
        default: null,
    },
    phone: {
        type: String, //Array ????->unique
        //unique: true,
        required: false,
        default: null,
    },
    profileImageID: { // ID avatarImage file || null
        type: String,
        required: false,
        default: null,
    }, 
    coverImageID: { //ID profileImage file || null
        type: String,
        require: false,
        default: null,
    },
    birthday: {
        type: Date, // Only Day.
        required: false,
        default: null,
    },
    gender: {
        type: Number, // Enum = (0, 10, 20) ::: (NONE, MALE, FEMALE)
        required: false,
        default: 0,
    },
    about: {
        type: String, //maxLength
        required: false,
        default: "",
    },
    quote : {
        type: String,//maxLength
        required: false,
        default: "",
    },
    nickname: {
        type: Array,//[nickname1, nickname2,...]
        required: false,
    },
    skills: {
        type: Array,//[skill{[id], level[beginner|master|...-> [0, 1, ...]], description},]
        required: true,
        default: [],
    },
    worked: {
        type: Array, //[work{startTime, [endTime], where, description}]
        required: true,
        default: [],
    },
    language: {
        type: Array, //[language: {code:'vi-vn', text='VietNam', [default:true]}, ....]
        required: true,
        default: [{code:'en-US', text='English(US)', default: true}],
    },
    lifeEvent: {
        type: Array,//[event {startTime, [endTime], description},...]
        required: true,
        default: [],
    },
    classs: {
        type: Array,//[classID,...]
        required: true,
        default:[],
    },
    friends: {
        type: Array,//[friendID,...]
        required: true,
        default: [],
    },
    status: {
        type: Number,//[NEW, BLOCKED, NORMAL] = [0, 10, 100]
        required: true,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        require: true,
        default: false,
    }
});

// Execute before each user.save() call
UserSchema.pre('save', callback => {
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

UserSchema.methods.getBasicInfo = () => {
    return {
        id : this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        profileImageID: this.profileImageID,
        coverImageID: this.coverImageID,
        typeuser: this.typeuser,
        birthday: this.birthday,
        phone: this.phone,
        gender: this,gender,
        about: this.about,
        quote: this.quote,
    }
};
module.exports = mongoose.model('User', UserSchema);