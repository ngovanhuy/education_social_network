var Group = require('../models/group');
var Users = require('../controllers/user');
async function getGroupByID(id) {
    if (!id) {
        return null;
    }
    let _id = Number(id);
    if (_id) {
        return await Group.findOne({
            _id: id,
            //isDeleted: false,
        });
    } else {
        return null;
    }
}
async function findGroup(req) {
    if (req.groups.group_request) {
        return req.groups.group_request;
    }
    let groupFind = null;
    if (req.params.groupID) {
        groupFind = await getGroupByID(req.params.groupID);
        if (groupFind) {
            return groupFind;
        }
    }
    if (req.body.groupID) {
        groupFind = await getGroupByID(req.body.groupID);
        if (groupFind) {
            return groupFind;
        }
    }
    return null;
}
async function addMember(req, res){//, next) {
    try {
        let group = await findGroup(req);//, false);
        req.groups.group_request = group;
        if (!group || group.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Group Not Existed',
                data: null,
            });
        }
        let userID = req.params.userID ? req.params.userID : req.body.userID;
        let user = await Users.getUserByID(userID); 
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'UserID Invalid',
                data: null,
            });
        }
        let typeMember = req.body.typeMember ? req.body.typeMember : 1;
        if (group.addMember(user, typeMember)) {
            if (user.addToClass(group)) {
                group = await group.save();
                user = await user.save();
            } else {
                throw new Error();
            }
        } else {
            throw new Error();
        }
        return res.status(200).send({
            code: 200,
            message: 'Success',
            data: {
                user_id: user._id,
                group_id: group._id,
            },
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
async function removeMember(req, res){//, next) {
    try {
        let group = await findGroup(req);//, false);
        req.groups.group_request = group;
        if (!group || group.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Group Not Existed',
                data: null,
            });
        }
        let userID = req.params.userID ? req.params.userID : req.body.userID;
        let user = await Users.getUserByID(userID);
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'UserID Invalid',
                data: null,
            });
        }
        if (group.removeMember(user)) {
            if (user.removeFromClass(group)) {
                group = await group.save();
                user = await user.save();
            } else {
                throw new Error();
            }
        }
        return res.status(200).send({
            code: 200,
            message: 'Success',
            data: {
                user_id: user._id,
                group_id: group._id,
            },
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
async function updateMember(req, res) {
    try {
        let group = await findGroup(req);//, false);
        req.groups.group_request = group;
        if (!group || group.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Group Not Existed',
                data: null,
            });
        }
        let userID = req.params.userID ? req.params.userID : req.body.userID;
        let user = await Users.getUserByID(userID);
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'UserID Invalid',
                data: null,
            });
        }
        let typeMember = req.body.typeMember ? req.body.typeMember : 1;
        if (group.updateMember(user, typeMember)) {
            if (user.addToClass(group)) {
                group = await group.save();
                user = await user.save();
            } else {
                throw new Error();//
            }
        }
        return res.status(200).send({
            code: 200,
            message: 'Success',
            data: {
                user_id: user._id,
                group_id: group._id
            },
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}

async function getRequesteds(req, res) {
    try {
        //TODO: Check current user.
        //...
        let group = await findGroup(req);
        if (!group || group.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit user',
                data: null
            });
        }
        let requesteds = [];
        group.requesteds.forEach(requested => {
            if (!requested.isRemoved) {
                requesteds.push({
                    _id: requested._id,
                    firstName: requested.firstName,
                    lastName: requested.lastName,
                    profileImageID: requested.profileImageID,
                    coverImageID: requested.coverImageID,
                    timeCreate: requested.timeCreate.toLocaleString(),
                    timeUpdate: requested.timeUpdate.toLocaleString(),
                });
            }
        });
        return res.send({
            code: 200,
            message: 'Success',
            data: requesteds
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
async function removeRequested(req, res) {
    try {
        let user = await Users.findUser(req, false);
        //req.users.user_request = user;
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'UserID Invalid',
                data: null,
            });
        }
        let group = await findGroup(req);//, false);
        req.groups.group_request = group;
        if (!group || group.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Group Not Existed',
                data: null,
            });
        }
        if (user.removeClassRequest(group)) {
            if (group.removeRequested(user)) {
                group = await group.save();
                user = await user.save();        
            }    
        }
        return res.status(200).send({
            code: 200,
            message: 'Success',
            data: {
                user_id: user._id,
                group_id: group._id,
            },
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
async function confirmRequested(req, res) {
    try {
        let user = await Users.findUser(req, false);
        //req.users.user_request = user;
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'UserID Invalid',
                data: null,
            });
        }
        let group = await findGroup(req);//, false);
        req.groups.group_request = group;
        if (!group || group.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Group Not Existed',
                data: null,
            });
        }
        if (group.confirmRequested(user)) {
            group = await group.save();
            user = await user.save();
        } else {
            //throw new Error();
        }
        return res.status(200).send({
            code: 200,
            message: 'Success',
            data: {
                user_id: user._id,
                group_id: group._id,
            },
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}

async function updateGroupInfo(req, group, isCheckValidInput = true) {
    let message = [];
    if (isCheckValidInput) {
        message = Group.validateInputInfo(req.body, true);
        if (!message || message.length > 0) {
            return message;
        }
    }
    if (req.body.name) {
        group.name = req.body.name;
    }
    if (req.body.dateCreated) {
        group.birthday = Group.getCreateDate(req.body.dateCreated);
    }
    if (req.body.about) {
        group.about = req.body.about;
    }
    if (req.body.tags) {
        group.tags = Group.getStringArray(req.body.tags);
    }
    if (req.body.language) {
        group.language = Group.getArrayLanguage(req.body.language);
    }
    if (req.body.location) {
        group.location = req.body.location;
    }
    if (req.body.typegroup) {
        group.typegroup = req.body.typegroup;
    }
    return message;
}
async function postGroup(req, res, next) {
    try {
        // TODO: check currentuser.
        req.groups.group_request = null;
        let message = Group.validateInputInfo(req.body, true);
        if (!message || message.length > 0) {
            return res.status(400).send({
                code: 400,
                message: message,
                data: null,
                error: 'Request Invalid'
            });
        }
        let group = new Group({
            name: req.body.name,
            isDeleted: false,
            dateCreated: Date.now(),
        });

        message = await updateGroupInfo(req, group, false);
        if (!message || message.length > 0) {
            return res.status(400).send({
                code: 400,
                message: message,
                data: null,
                error: 'Request Invalid',
            });
        }
        group = await group.save();
        req.groups.group_request = group;
        return next();
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
};
async function putGroup(req, res, next) {
    try {
        let message = Group.validateInputInfo(req.body, false);
        if (!message || message.length > 0) {
            return res.status(400).send({
                code: 400,
                message: message,
                data: null,
                error: "Request Invalid",
            });
        }
        let group = await findGroup(req);//, false);
        req.groups.group_request = group;
        if (!group || group.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Group Not Existed',
                data: null,
            });
        }
        message = await updateGroupInfo(req, group, false);
        if (!message || message.length > 0) {
            return res.status(400).send({
                code: 400,
                message: message,
                data: null,
                error: 'Request Invalid',
            });
        }
        group = await group.save();
        req.groups.group_request = group;
        return next();
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
async function deleteGroup(req, res, next) {
    try {
        //TODO check user.
        //..
        let group = await findGroup(req);
        req.groups.group_request = group;
        if (!group) {
            return res.status(400).send({
                code: 400,
                message: 'Group Not Existed',
                data: null
            });
        }
        if (group.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Group deleted.',
                data: null
            });
        } else {
            group.isDeleted = true;
            group = await group.save();
            req.groups.group_request = group;
        }
        return next();
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error[DeleteUser]',
            data: null,
            error: error.message
        });
    };
}
async function getGroup(req, res, next) {
    try {
        let group = await findGroup(req);
        req.groups.group_request = group;
        if (!group) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit group',
                data: null
            });
        }
        if (group.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Group Deleted',
                data: {
                    id: group.id,
                    name: group.name
                }
            });
        }
        return res.send({
            code: 200,
            message: 'Success',
            data: group.getBasicInfo()
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
async function getProfileImageID(req, res, next) {
    req.files.file_selected_id = req.groups.group_request ? req.groups.group_request.profileImageID : null;
    return next();
}
async function putProfileImage(req, res) {
    try {
        if (!req.files.file_saved) {
            throw new Error("Upload file Error");
        }
        let group = await findGroup(req);
        if (!group || group.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit group',
                data: null
            });
        }
        group.profileImageID = String(req.files.file_saved._id);
        group = await group.save();
        return res.json({
            code: 200,
            message: 'Success',
            data: req.files.file_saved.getBasicInfo(),
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
async function getCoverImageID(req, res, next) {
    req.files.file_selected_id = req.groups.group_request ? req.groups.group_request.coverImageID : null;
    return next();
}
async function putCoverImage(req, res) {
    try {
        if (!req.files.file_saved) {
            throw new Error("Upload file Error");
        }
        let group = await findGroup(req);
        if (!group || group.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit user',
                data: null
            });
        }
        group.coverImageID = String(req.files.file_saved._id);
        group = await group.save();
        return res.json({
            code: 200,
            message: 'Success',
            data: req.files.file_saved.getBasicInfo(),
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
async function getMembers(req, res) {
    try {
        //TODO: Check current user.
        //...
        let group = await findGroup(req);
        if (!group || group.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit user',
                data: null
            });
        }
        let members = [];
        group.members.forEach(member => {
            if (!member.isRemoved) {
                members.push({
                    _id: member._id,
                    firstName: member.firstName,
                    lastName: member.lastName,
                    profileImageID: member.profileImageID,
                    coverImageID: member.coverImageID,
                    dateJoin: member.dateJoin.toLocaleString(),
                    timeUpdate: member.timeUpdate.toLocaleString(),
                    typemember: Group.getTypeMemberInfo(member.typemember),
                });
            }
        });
        return res.send({
            code: 200,
            message: 'Success',
            data: {
                count: members.length,
                members: members,  
            }
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}

async function checkGroupRequest(req, res, next) {
    let group = await findGroup(req);
    if (group && !group.isDeleted) {
        req.groups.group_request = group;
        return next();
    } else {
        req.groups.group_request = null;
        return res.status(400).send({
            status: 400,
            message: 'Group not exited or deleted',
            data: null
        });
    }
}
async function getGroups(req, res) {
    try {
        let groups = await Group.find({
            isDeleted: false,
        });
        return res.json({
            code: 200,
            message: 'Success',
            count: groups.length,
            data: groups.map(group => ({
                id: group.id,
                name: group.name,
                coverImageID: group.coverImageID,
                profileImageID: group.profileImageID,
            }))
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};

/*----------------EXPORT------------------ */
exports.postGroup = postGroup;
exports.putGroup = putGroup;
exports.getGroup = getGroup;
exports.deleteGroup = deleteGroup;
exports.getMembers = getMembers;
exports.checkGroupRequest = checkGroupRequest;
exports.putProfileImage = putProfileImage;
exports.putCoverImage = putCoverImage;
exports.getProfileImageID = getProfileImageID;
exports.getCoverImageID = getCoverImageID;
exports.addMember = addMember;
exports.removeMember = removeMember;
exports.updateMember = updateMember;
exports.getRequesteds = getRequesteds;
exports.removeRequested = removeRequested;
exports.confirmRequested = confirmRequested;
exports.getGroups = getGroups;
exports.findGroup = findGroup;
exports.getGroupByID = getGroupByID;