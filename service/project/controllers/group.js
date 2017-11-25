var Group = require('../models/group');
var Users = require('../controllers/user');
var Files = require('../models/fileitem');
var Post = require('../models/post');
var Utils = require('../application/utils');

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
async function addMember(req, res) {
    try {
        let group = req.groups.group_request;
        if (!group) throw new Error();
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
async function removeMember(req, res) {//, next) {
    try {
        let group = req.groups.group_request;
        if (!group) throw new Error();
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
        let group = req.groups.group_request;
        if (!group) throw new Error();
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
        let group = req.groups.group_request;
        if (!group) throw new Error();
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
        let group = req.groups.group_request;
        if (!group) throw new Error();
        let user = await Users.findUser(req, false);
        //req.users.user_request = user;
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'UserID Invalid',
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
        let group = req.groups.group_request;
        if (!group) throw new Error();
        let user = await Users.findUser(req, false); //req.users.user_request = user;
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'UserID Invalid',
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
        let user = await Users.findUser(req);
        if (!user || !user.isTeacher) {
            return res.status(400).send({
                code: 400,
                data: null,
                error: 'Only teacher can create group.'
            });
        }
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
        group.addAdmin(user);
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
        let group = req.groups.group_request;
        if (!group) throw new Error();
        let user = await Users.findUser(req);
        if (!user || !group.isAdmin(user)) {
            return res.status(400).send({
                code: 400,
                message: '',
                data: null,
                error: 'User not permit '
            });
        }
        let message = Group.validateInputInfo(req.body, false);
        if (message && message.length == 0) {
            message = await updateGroupInfo(req, group, false);
            if (message && message.length == 0) {
                group = await group.save();
                return next();
            }
        }
        return res.status(400).send({
            code: 400,
            message: message,
            data: null,
            error: 'Request Invalid',
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
async function deleteGroup(req, res, next) {
    try {
        let group = req.groups.group_request;
        if (!group) throw new Error();
        let user = await Users.findUser(req);
        if (!user || !group.isAdmin(user)) {
            return res.status(400).send({
                code: 400,
                message: '',
                data: null,
                error: 'User not permit '
            });
        }
        group.isDeleted = true;
        group = await group.save();
        return next();
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    };
}
async function getGroup(req, res, next) {
    try {
        let group = req.groups.group_request;
        if (!group) throw new Error();
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
        let group = req.groups.group_request;
        if (!group) throw new Error();
        if (!req.files.file_saved) {
            throw new Error("Upload file Error");
        }
        let currentFile = req.files.file_saved;
        group.profileImageID = String(currentFile._id);
        group = await group.save();
        return res.json({
            code: 200,
            message: 'Success',
            data: currentFile.getBasicInfo(),
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
        let group = req.groups.group_request;
        if (!group) throw new Error();
        if (!req.files.file_saved) {
            throw new Error("Upload file Error");
        }
        let currentFile = req.files.file_saved;
        group.coverImageID = String(currentFile._id);
        group = await group.save();
        return res.json({
            code: 200,
            message: 'Success',
            data: currentFile.getBasicInfo(),
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
        let group = req.groups.group_request;
        if (!group) throw new Error();
        return res.send({
            code: 200,
            message: '',
            data: group.getMembersInfo()
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
async function getFiles(req, res) {
    try {
        let group = req.groups.group_request;
        if (!group) throw new Error();
        let datas = (await Files.find({
            isDeleted: false,
            'group._id': group._id,
        }, { _id: 1, name: 1, type: 1, size: 1, createDate: 1 })).map(file => file.getBasicInfo());
        return res.send({
            code: 200,
            message: 'Success',
            length: datas.length,
            data: datas
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: 'Server Error',
            data: null
        });
    }
}
async function searchGroupByName(req, res) {
    try {
        let key = req.query.groupname;
        if (!key) {
            return res.status(400).json({ code: 400, message: '', data: [] });
        }
        let groups = await Group.find({ name: { $regex: key } });
        return res.status(200).json({
            code: 200,
            message: '',
            data: groups.map(group => group.getBasicInfo())
        });
    } catch (error) {
        return res.status(500).json({ code: 500, message: '', data: [] });
    }
}
async function postFile(req, res) {
    try {
        let group = req.groups.group_request;
        if (!group) throw new Error();
        let currentFile = req.files.file_saved;
        if (!currentFile) { throw new Error("Upload file Error"); }
        group = await group.save();
        return res.json({
            code: 200,
            message: 'Success',
            data: currentFile.getBasicInfo(),
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
async function addPost(req, res, next) {
    try {
        let group = req.groups.group_request;
        if (!group) throw new Error();
        let userID = req.params.userID ? req.params.userID : req.body.userID ? req.body.userID : null;
        let user = group.getMemberById(userID);
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: message,
                data: null,
                error: 'User not member'
            });
        }
        let currentFile = req.files.file_saved;
        let title = req.body.title;
        let content = req.body.content;
        let topic = req.body.topic;
        if (!title || !content || !topic) {
            return res.status(500).send({
                code: 400,
                message: 'Request Invalid',
                data: null,
                error: error.message
            });
        }
        let isShow = req.body.isShow ? req.body.isShow == 'true' ? true : false : false;
        let isSchedule = req.body.isSchedule ? req.body.isSchedule == 'true' ? true : false : false;
        let scopeType = req.body.scopeType ? req.body.scopeType : 10;
        let startTime = req.body.startTime ? Utils.parseDate(req.body.startTime) : null;
        let endTime = req.body.endTime ? Utils.parseDate(req.body.endTime) : null;
        let members = req.body.members ? Utils.getStringArray(req.body.members) : [];

        let options = {
            isShow: isShow,
            isSchedule: isSchedule,
            scopeType: scopeType,
            scheduleOptions: {
                startTime: startTime,
                endTime: endTime,
            },
            members: members,
        }
        let now = Date.now();
        let post = new Post({
            _id: now,
            title: title,
            content: content,
            userCreate: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                profileImageID: user.profileImageID,
                timeUpdate: now,
            },
            group: {
                _id: group._id,
                name: group.name,
                profileImageID: group.profileImageID,
                timeUpdate: now,
            },
        });
        post.addTopic(topic);
        if (currentFile) {
            post.addFile(currentFile);
        }
        group.addPost(post, topic, options);
        group = await group.save();
        post = await post.save();
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
async function getPosts(req, res) {
    try {
        let group = req.groups.group_request;
        if (!group) throw new Error();
        let userID = req.params.userID ? req.params.userID : req.body.userID ? req.body.userID : null;
        let user = group.getMemberById(userID);
        // if (!user) {
        //     return res.status(400).send({
        //         code: 400,
        //         message: message,
        //         data: null,
        //         error: 'User not member'
        //     });
        // }
        let posts = group.posts;
        let top = req.query.top ? isNaN(req.query.top) ? -1 : Number(req.query.top) : -1;
        let postIDs = group.getPostIDs(user);
        let datas = [];
        if (postIDs.length > 0) {
            posts = await Post.find({ _id: { $in: postIDs } });
            datas = posts.map(post => post.getBasicInfo());
        } 
        return res.status(200).json({
            code: 200,
            message: '',
            data: datas,
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
exports.getFiles = getFiles;
exports.searchGroupByName = searchGroupByName;
exports.postFile = postFile;
exports.addPost = addPost;
exports.getPosts = getPosts;