var mongoose = require('mongoose');
var TypeMemberEnum = {
    0: "Guest",
    1: "Normal",
    10: "Admin",
    100: "Owner",
    1000: "System",
}
var TypeGroupEnum = {
    0: "Basic",
    1: "Primary",
    10: "Secondary",
    100: "University",
}
var StatusEnum = {
    0: "New",
    10: "Normal"
}
var GroupSchema = new mongoose.Schema(
    {
        // id: { type: Number, unique: true, require: true, index: true, default: Date.now },
        _id: { type: Number, default: getNewID },
        name: { type: String, required: true },
        typegroup: { type: Number, require: false, default: 0, min: 0, max: 1000 },
        profileImageID: { type: String, required: false, default: null, },
        coverImageID: { type: String, require: false, default: null, },
        about: { type: String, required: false, default: "", },
        language: {
            type: [{
                _id: { type: Number, default: getNewID },
                code: String,
                text: String,
                isDefault: Boolean,
                isRemoved: { type: Boolean, default: false }
            }],
            required: false,
            default: [{ code: 'en-US', text: 'English(US)', isDefault: true }],
        },
        members: {
            type: [{
                _id: Number,
                firstName: String,
                lastName: String,
                profileImageID: String,
                coverImageID: String,
                typemember: { type: Number, min: 0, max: 1000, default: 1 },
                isRemoved: { type: Boolean, default: false, },
                dateJoin: Date,
                timeUpdate: Date,
            }],
            required: false,
            default: [],
        },
        status: { type: Number, required: false, default: 0, min: 0, max: 1000 },
        location: { type: String, required: false, default: "" },
        tags: { type: [String], required: false, },
        isDeleted: { type: Boolean, require: false, default: false, },
        requesteds: {
            type: [{
                _id: Number,
                firstName: String,
                lastName: String,
                profileImageID: String,
                coverImageID: String,
                isRemoved: { type: Boolean, default: false, },
                timeCreate: { type: Date, default: Date.now },
                timeUpdate: { type: Date, default: Date.now },
            }],
            require: true,
            default: [],
        },
        timeCreate: { type: Date, default: Date.now, },
        timeUpdate: { type: Date, default: Date.now, },
    }
);

GroupSchema.pre('save', function (callback) {
    var group = this;
    group.timeUpdate = Date.now();
    return callback();
});

function validateGroupName(name, isRequired = true) {
    if (!name) {
        return !isRequired;
    }
    var re = /^([a-zA-Z\-0-9\.\_]{1,40})$/;
    if (re.test(name)) {
        return true;
    }
    return false;
}
function validateTypeGroup(typeGroup, isRequired = false) {
    if (!typeGroup) {
        return !isRequired;
    }
    return TypeGroupEnum[typeGroup];
}
function validateTypeMember(typeMember, isRequired = false) {
    if (!typeMember) {
        return !isRequired;
    }
    return TypeMemberEnum[typeUser];
}
function validateStatus(status, isRequired = false) {
    if (!status) {
        return !isRequired;
    }
    return StatusEnum[status];
}
function validateStringLength(obj, minLength = 1, maxLength = 100, isRequired = true) {
    if (typeof (obj) !== "string") {
        return !isRequired;
    }
    return obj.length >= minLength && obj.length <= maxLength;
}
function validateInputInfo(inputInfo, checkRequired = false) {
    if (!inputInfo) {
        return [];
    }
    let message = [];
    //---------- REQUIRED --------------
    if (!(validateGroupName(inputInfo.name, checkRequired))) {
        message.push("Name Invalid Format");
    }
    //------------ NOT REQUIRED ----------------
    if (!validateStringLength(inputInfo.about, 0, 200, false)) {
        message.push("About Invalid Format");
    }
    if (inputInfo.tags) {
        if (!getStringArray(inputInfo.tags)) {
            message.push("Tags Invalid Format");
        }
    }
    if (inputInfo.language) {
        if (!getArrayLanguage(inputInfo.language)) {
            message.push("Language Invalid Format");
        }
    }
    if (!validateTypeGroup(inputInfo.typegroup, false)) {
        message.push("TypeGroup Invalid Format");
    }
    if (!validateStatus(inputInfo.status, false)) {
        message.push("Status Invalid Format");
    }
    return message;
}
function getTypeGroupInfo(enum_id) {
    return { enum_id: enum_id, text: TypeGroupEnum[enum_id] };
}
function getTypeMemberInfo(enum_id) {
    return { enum_id: enum_id, text: TypeMemberEnum[enum_id] };
}
function getStringArray(jsonContent) {
    try {
        return [...items] = JSON.parse(jsonContent);
    } catch (error) {
        return null;
    }
}
function getArrayLanguage(languageString) {
    try {
        let [...languages] = JSON.parse(languageString);
        let data = [];
        for (let index = 0; index < languages.length; index++) {
            var { code = 'en-US', text = 'English(US)' } = languages[index];
            data.push({
                code: code,
                text: text,
            });
        }
        return data;
    } catch (error) {
        return null;
    }
}
function getBasicInfo() {
    return {
        id: this.id,
        name: this.name,
        typegroup: { enum_id: this.typeuser, text: TypeGroupEnum[this.typegroup] },
        // dateCreated:        this.dateCreated.toLocaleString(),
        about: this.about,
        location: this.location,
        tags: this.tags,
        // members:         this.members,
        profileImageID: this.profileImageID,
        coverImageID: this.coverImageID,

    }
}

function getNewID() {
    return new Date().getTime();
}
function addUserInArray(new_user, arrays) {
    if (!new_user) {
        return null;
    }
    let user = null;
    let timeUpdate = Date.now();
    for (let index = 0; index < arrays.length; index++) {
        user = arrays[index];
        if (user._id == new_user._id) {
            user.timeUpdate = timeUpdate;
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
        coverImageID: new_user.coverImageID,
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
        if (user._id == remove_user._id) {
            user.isRemoved = true;
            return user;
        }
    }
    return null;
}
function addRequested(user) {//TODO: check member exited.
    return addUserInArray(user, this.requesteds) ? user : null;
}
function removeRequested(user) {
    return removeUserFromArray(user, this.requesteds) ? user : null;
}
function confirmRequested(user) {
    if (addMember(user)) {
        removeRequested(user);
        return user;    
    }
    return null;
}
function addMember(user, typemember = 1) {//TODO: check owner.
    if (!user || !typemember) {
        return null;
    }
    if (!TypeMemberEnum[typemember]) {
        return null;
    }
    let member = null;
    let timeUpdate = Date.now();
    for (let index = 0; index < this.members.length; index++) {
        member = this.members[index];
        if (member._id == user._id) {
            member.typemember = typemember;
            member.timeUpdate = timeUpdate;
            if (member.isRemoved) {
                member.isRemoved = false;
                member.dateJoin = timeUpdate;
            }
            return user;
        }
    }
    member = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageID: user.profileImageID,
        coverImageID: user.coverImageID,
        typemember: typemember,
        isRemoved: false,
        dateJoin: timeUpdate,
        timeUpdate: timeUpdate,
    };
    this.members.push(member);
    return user;
}
function updateMember(user, typemember) {//TODO: check 1 owner.
    if (!user || !typemember) {
        return null;
    }
    if (!TypeMemberEnum[typemember]) {
        return null;
    }
    let member = null;
    let timeUpdate = Date.now();
    for (let index = 0; index < this.members.length; index++) {
        member = this.members[index];
        if (member._id == user._id) {
            member.typemember = typemember;
            member.timeUpdate = timeUpdate;
            if (member.isRemoved) {
                member.isRemoved = false;
                member.dateJoin = timeUpdate;
            }
            return user;
        }
    }
    return null;
}
function removeMember(user) {//TODO: remove owner.
    if (!user) {
        return null;
    }
    let member = null;
    for (let index = 0; index < this.members.length; index++) {
        member = this.members[index];
        if (member._id == user._id) {
            member.isRemoved = true; 
            return user; // this.members.splice(removeindex, 1);
        }
    }
    return null;
}
/*-------------------------------------- */
GroupSchema.statics.getTypeMemberInfo = getTypeMemberInfo;
GroupSchema.statics.TypeGroupInfo = getTypeGroupInfo;
GroupSchema.statics.validateGroupName = validateGroupName;
GroupSchema.statics.validateTypeMember = validateTypeMember;
GroupSchema.statics.validateTypeGroup = validateTypeGroup;
GroupSchema.statics.validateStatus = validateStatus;
GroupSchema.statics.validateInputInfo = validateInputInfo;
GroupSchema.statics.getStringArray = getStringArray;
GroupSchema.statics.getArrayLanguage = getArrayLanguage;
GroupSchema.methods.getBasicInfo = getBasicInfo;
GroupSchema.statics.getNewID = getNewID;

GroupSchema.methods.addMember = addMember;
GroupSchema.methods.removeMember = removeMember;
GroupSchema.methods.updateMember = updateMember;

GroupSchema.methods.addRequested = addRequested;
GroupSchema.methods.removeRequested = removeRequested;
GroupSchema.methods.confirmRequested = confirmRequested;

module.exports = mongoose.model('Group', GroupSchema); 