let User = require('../models/user');
let GroupController = require('../controllers/group');
let Files = require('../models/fileitem');
let Utils = require('../application/utils');

async function getUserByID(id) {
    if (!id) {
        return null;
    }
    let _id = Number(id);
    if (_id) {
        return await User.findOne({
           _id: id,
        });
    } else {
        return null;
    }
}
async function getUserByUserName(username) {
    if (!(User.validateUserName(username, true))) {
        return null;
    }
    return await User.findOne({
        username: username,
    });
}
async function getUserByPhone(phone) {
    if (!(Utils.validatePhoneNumber(phone, true))) {
        return null;
    }
    return await User.findOne({
        phone: phone,
    });
}
async function getUserbyEmail(email) {
    if (!(Utils.validateEmail(email, true))) {
        return null;
    }
    return await User.findOne({
        email: email,
    });
}
async function getUserByIDOrUserName(info) {
    if (!info) {
        return null;
    }  
    let _id = Number(info);
    if (_id) {
        return await User.findOne({
            $or: [{
                    _id: _id
                },
                {
                    username: info
                },
            ],
        });
    } else {
        return getUserByUserName(info);
    }
}
async function getUserByUniqueInfo(info, arrays = null) {
    if (!info) {
        return null;
    }
    let user = null;
    if (!arrays) {
        user = await getUserByPhone(info);
        if (!user) {
            user = await getUserbyEmail(info);
        }
        return user;
    }
    for (let index = 0; index < arrays.length; index) {
        switch (arrays[index]) {
            case 'id|username':
                user = await getUserByIDOrUserName(info);
                break;
            case 'id':
                user = await getUserByID(info);
                break;
            case 'username':
                user = await getUserByUserName(info);
                break;
            case 'phone':
                user = await getUserByPhone(info);
                break;
            case 'email':
                user = await getUserbyEmail(info);
                break;
        }
        if (user) {
            return user;
        }
    }
    return user;
}
async function getUserByInfo(arrays, ...infos) {
    if (!infos || infos.length <= 0) {
        return null;
    }
    let user = null;
    for (let index = 0; index < infos.length; index++) {
        if (!infos[index]) {
            continue;
        }
        user = await getUserByUniqueInfo(infos[index]);
        if (user) {
            return user;
        }
    }
    return user;
}
async function findUser(req, isFindWithPhoneAndEmail = true) { //signed_in->request_userID->request_username->body_param[id>username>phone>email]
    let userFind = null;
    if (req.users.user_request) {
        return req.users.user_request;
    }
    if (req.params.userID) {
        userFind = await getUserByIDOrUserName(req.params.userID);
        if (userFind) {
            return userFind;
        }
    }
    if (req.params.username) {
        userFind = await getUserByUserName(req.params.username);
        if (userFind) {
            return userFind;
        }
    }
    if (req.body.userID) {
        userFind = await getUserByID(req.body.userID);
        if (userFind) {
            return userFind;
        }
    }
    if (req.body.id) {
        userFind = await getUserByID(req.body.id);
        if (userFind) {
            return userFind;
        }
    }
    if (req.body.username) {
        userFind = await getUserByUserName(req.body.username);
        if (userFind) {
            return userFind;
        }
    }
    if (!isFindWithPhoneAndEmail) {
        return null;
    }
    if (req.body.phone) {
        userFind = await getUserByPhone(req.body.phone);
        if (userFind) {
            return userFind;
        }
    }
    if (req.body.email) {
        userFind = await getUserbyEmail(req.body.email);
        if (userFind) {
            return userFind;
        }
    }
    return null;
}

async function updateUserInfo(req, user, isCheckValidInput = true) {
    let message = [];
    if (isCheckValidInput) {
        message = User.validateInputInfo(req.body, true);
        if (!message || message.length > 0) {
            return message;
        }
    }
    if (req.body.email) {
        if (req.body.email !== user.email) {
            let checkUser = await getUserbyEmail(req.body.email);
            if (checkUser) {
                message.push('Email used.');
                return message;
            }
            user.email = req.body.email;
        }
    }
    if (req.body.phone) {
        if (req.body.phone !== user.phone) {
            if (await getUserByPhone(req.body.phone)) {
                message.push('Phone used.');
                return message;
            }
            user.phone = req.body.phone;
        }
    }
    if (req.body.lastName) {
        user.lastName = req.body.lastName;
    }
    if (req.body.firstName) {
        user.firstName = req.body.firstName;
    }
    if (req.body.birthday) {
        user.birthday = User.getBirthDate(req.body.birthday);
    }
    if (req.body.gender) {
        user.gender = req.body.gender;
    }
    if (req.body.about) {
        user.about = req.body.about;
    }
    if (req.body.quote) {
        user.quote = req.body.quote;
    }
    if (req.body.nickname) {
        user.nickname = Utils.getStringArray(req.body.nickname);
    }
    if (req.body.language) {
        user.language = User.getArrayLanguage(req.body.language);
    }
    if (req.body.location) {
        user.location = req.body.location;
    }
    if (req.body.typeuser) {
        user.typeuser = req.body.typeuser;
    }
    return message;
}
async function postUser(req, res, next) {
    try {
        req.users.user_request = null;
        let message = User.validateInputInfo(req.body, true);
        if (!message || message.length > 0) {
            return res.status(400).send({
                code: 400,
                message: message,
                data: null,
                error: 'Request Invalid'
            });
        }
        let userFind = await findUser(req);
        if (userFind) {
            return res.status(400).send({
                code: 400,
                message: 'Username/Email/Phone exited',
                data: null
            });
        }
        let user = new User({
            // id: User.getNewID(),
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            isDeleted: false,
        });
        message = await updateUserInfo(req, user, false);
        if (!message || message.length > 0) {
            return res.status(400).send({
                code: 400,
                message: message,
                data: null,
                error: 'Request Invalid',
            });
        }
        user = await user.save();
        req.users.user_request = user;
        next();
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
async function putUser(req, res, next) {
    try {
        let message = User.validateInputInfo(req.body, false);
        if (!message || message.length > 0) {
            return res.status(400).send({
                code: 400,
                message: message,
                data: null,
                error: "Request Invalid",
            });
        }
        let user = await findUser(req, false);
        req.users.user_request = user;
        if (!user || user.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'User Not Existed',
                data: null,
            });
        }
        message = await updateUserInfo(req, user, false);
        if (!message || message.length > 0) {
            return res.status(400).send({
                code: 400,
                message: message,
                data: null,
                error: 'Request Invalid',
            });
        }
        user = await user.save();
        req.users.user_request = user;
        next();
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
async function deleteUser(req, res, next) {
    try {
        let user = await findUser(req);
        req.users.user_request = user;
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'User Not Existed',
                data: null
            });
        }
        if (user.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'User deleted.',
                data: null
            });
        } else {
            user.isDeleted = true;
            user = await user.save();
            req.users.user_request = user;
        }
        return next();
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error[DeleteUser]',
            data: null,
            error: error.message
        });
    }
}
async function getUser(req, res, next) {
    try {
        let user = await findUser(req);
        req.users.user_request = user;
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit user',
                data: null
            });
        }
        if (user.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'User Deleted',
                data: {
                    id: user.id,
                    username: user.username
                }
            });
        }
        return res.send({
            code: 200,
            message: 'Success',
            data: user.getBasicInfo()
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
    req.files.file_selected_id = req.users.user_request ? req.users.user_request.profileImageID : null;
    return next();
}
async function putProfileImage(req, res) {
    try {
        if (!req.files.file_saved) {
            throw new Error("Upload file Error");
        }
        let user = await findUser(req);
        if (!user || user.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit user',
                data: null
            });
        }
        user.profileImageID = String(req.files.file_saved._id);
        user = await user.save();
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
    req.files.file_selected_id = req.users.user_request ? req.users.user_request.coverImageID : null;
    next();
}
async function putCoverImage(req, res) {
    try {
        if (!req.files.file_saved) {
            throw new Error("Upload file Error");
        }
        let user = await findUser(req);
        if (!user || user.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit user',
                data: null
            });
        }
        user.coverImageID = String(req.files.file_saved._id);
        user = await user.save();
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
async function getUserInfo(req, res, next) {
    try {
        let user = await findUser(req);
        req.users.user_request = user;
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit user',
                data: null
            });
        }
        if (user.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'User Deleted',
                data: {
                    id: user.id,
                    username: user.username
                }
            });
        }
        return res.send({
            code: 200,
            message: 'Success',
            data: user.getInfo(req.query),
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

async function getFriends(req, res) {
    try {
        let user = await findUser(req);
        if (!user || user.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit user',
                data: null
            });
        }
        return res.send({
            code: 200,
            message: 'Success',
            data: user.friends
        })
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
async function addFriend(req, res) {//, next) {
    try {
        let user = await findUser(req);//, false);
        req.users.user_request = user;
        if (!user || user.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'User Not Existed',
                data: null,
            });
        }
        let friendUserID = req.params.friendUserID ? req.params.friendUserID : req.body.friendUserID;
        let friendUser = await getUserByID(friendUserID);
        if (!friendUser) {
            return res.status(400).send({
                code: 400,
                message: 'friendUserID Invalid',
                data: null,
            });
        }
        if (user.addFriend(friendUser, true)) {
            user = await user.save();
            friendUser = await friendUser.save();
        } else {
            throw new Error();
        }
        return res.status(200).send({
            code: 200,
            message: 'Success',
            data: {
                user_id: user._id,
                friend_id: friendUser._id,
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
async function removeFriend(req, res) {
    try {
        let user = await findUser(req, false);
        req.users.user_request = user;
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'UserID Invalid',
                data: null,
            });
        }
        let friendUserID = req.params.friendUserID ? req.params.friendUserID : req.body.friendUserID;
        let friendUser = await getUserByID(friendUserID);
        if (!friendUser) {
            return res.status(400).send({
                code: 400,
                message: 'friendUserID Invalid',
                data: null,
            });
        }
        if (user.removeFriend(friendUser, true)) {
            friendUser = await friendUser.save();
            user = await user.save();
        }
        return res.status(200).send({
            code: 200,
            message: 'Success',
            data: {
                user_id: user._id,
                friend_id: friendUser._id,
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
async function getClasss(req, res) {
    try {
        let user = await findUser(req);
        if (!user || user.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit user',
                data: null
            });
        }
        return res.send({
            code: 200,
            message: '',
            data: user.getGroups()
        })
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
async function addToClass(req, res) {
    try {
        let user = await Users.findUser(req, false);
        req.users.user_request = user;
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'UserID Invalid',
                data: null,
            });
        }
        let group = await GroupController.findGroup(req);//, false);
        //req.groups.group_request = group;
        if (!group || group.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Group Not Existed',
                data: null,
            });
        }
        if (user.addToClass(group)) {
            if (group.addMember(user)) {
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
async function removeFromClass(req, res) {
    try {
        let user = await Users.findUser(req, false);
        req.users.user_request = user;
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'UserID Invalid',
                data: null,
            });
        }
        let group = await GroupController.findGroup(req);//, false);
        //req.groups.group_request = group;
        if (!group || group.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Group Not Existed',
                data: null,
            });
        }
        if (user.removeFromClass(group)) {
            if (group.removeMember(user)) {
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
async function getClassRequests(req, res) {
    try {
        let user = await findUser(req);
        if (!user || user.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit user',
                data: null
            });
        }
        return res.send({
            code: 200,
            message: '',
            data: user.getClassRequests(),
        })
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
async function addClassRequest(req, res) {
    try {
        let user = await findUser(req, false);
        req.users.user_request = user;
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'UserID Invalid',
                data: null,
            });
        }
        let group = await GroupController.findGroup(req);//, false);
        req.groups.group_request = group;
        if (!group || group.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Group Not Existed',
                data: null,
            });
        }
        if (user.addClassRequest(group)) {
            group = await group.save();
            user = await user.save();
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
async function removeClassRequest(req, res) {
    try {
        let user = await findUser(req, false);
        req.users.user_request = user;
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'UserID Invalid',
                data: null,
            });
        }
        let group = await GroupController.findGroup(req);//, false);
        //req.groups.group_request = group;
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

async function getRequests(req, res) {
    try {
        let user = await findUser(req);
        if (!user || user.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit user',
                data: null
            });
        }
        return res.send({
            code: 200,
            message: '',
            data: user.requests,
        })
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
async function addRequest(req, res) {//, next) {
    try {
        let user = await findUser(req);//, false);
        req.users.user_request = user;
        if (!user || user.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'User Not Existed',
                data: null,
            });
        }
        let friendUserID = req.params.friendUserID ? req.params.friendUserID : req.body.friendUserID;
        let friendUser = await getUserByID(friendUserID);
        if (!friendUser) {
            return res.status(400).send({
                code: 400,
                message: 'friendUserID Invalid',
                data: null,
            });
        }
        if (user.addRequest(friendUser, true)) {
            user = await user.save();
            friendUser = await friendUser.save();
        } else {
            throw new Error();
        }
        return res.status(200).send({
            code: 200,
            message: 'Success',
            data: {
                user_id: user._id,
                friend_id: friendUser._id,
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
async function removeRequest(req, res) {
    try {
        let user = await findUser(req, false);
        req.users.user_request = user;
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'UserID Invalid',
                data: null,
            });
        }
        let friendUserID = req.params.friendUserID ? req.params.friendUserID : req.body.friendUserID;
        let friendUser = await getUserByID(friendUserID);
        if (!friendUser) {
            return res.status(400).send({
                code: 400,
                message: 'friendUserID Invalid',
                data: null,
            });
        }
        if (user.removeRequest(friendUser, true)) {
            friendUser = await friendUser.save();
            user = await user.save();
        }
        return res.status(200).send({
            code: 200,
            message: 'Success',
            data: {
                user_id: user._id,
                friend_id: friendUser._id,
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
        let user = await findUser(req);
        if (!user || user.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit user',
                data: null
            });
        }
        return res.send({
            code: 200,
            message: '',
            data: user.requesteds,
        })
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
        let user = await findUser(req, false);
        req.users.user_request = user;
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'UserID Invalid',
                data: null,
            });
        }
        let friendUserID = req.params.friendUserID ? req.params.friendUserID : req.body.friendUserID;
        let friendUser = await getUserByID(friendUserID);
        if (!friendUser) {
            return res.status(400).send({
                code: 400,
                message: 'friendUserID Invalid',
                data: null,
            });
        }
        if (user.removeRequested(friendUser, true)) {
            friendUser = await friendUser.save();
            user = await user.save();
        }
        return res.status(200).send({
            code: 200,
            message: 'Success',
            data: {
                user_id: user._id,
                friend_id: friendUser._id,
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
        let user = await findUser(req, false);
        req.users.user_request = user;
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'UserID Invalid',
                data: null,
            });
        }
        let friendUserID = req.params.friendUserID ? req.params.friendUserID : req.body.friendUserID;
        let friendUser = await getUserByID(friendUserID);
        if (!friendUser) {
            return res.status(400).send({
                code: 400,
                message: 'friendUserID Invalid',
                data: null,
            });
        }
        if (user.confirmRequested(friendUser)) {
            friendUser = await friendUser.save();
            user = await user.save();
        }
        return res.status(200).send({
            code: 200,
            message: 'Success',
            data: {
                user_id: user._id,
                friend_id: friendUser._id,
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
async function checkUserNameRequest(req, res, next) {
    let user = await findUser(req);
    if (user && !user.isDeleted) {
        req.users.user_request = user;
        return next();
    } else {
        req.users.user_request = null;
        return res.status(400).send({
            status: 400,
            message: 'User not exited or deleted',
            data: null
        });
    }
    // throw new Error('Not exited has username or id.');
}
async function checkUserName(req, res) {
    try {
        let username = req.query.username ? req.query.username : 
                            req.params.username ? req.params.username : (req.body.username ? req.body.username : null);
        let user = await getUserByUserName(username);
        if (user) {
            return res.status(200).json(user.getBasicInfo());    
        }
        return res.status(400).end();
    } catch (error) {
        return res.status(500).end();
    }
}
async function checkEmail(req, res) {
    try {
        let email = req.query.email ? req.query.email : req.params.email;
        let user = await getUserbyEmail(email);
        if (user) {
            return res.status(200).json(user.getBasicInfo());    
        }
        return res.status(400).end();
    } catch (error) {
        return res.status(500).end();
    }
}
async function checkPhoneNumber(req, res) {
    try {
        let phone = req.query.phone ? req.query.phone : req.params.phone;
        let user = await getUserByPhone(phone);
        if (user) {
            return res.status(200).json(user.getBasicInfo());    
        }
        return res.status(400).end();
    } catch (error) {
        return res.status(500).end();
    }
}

async function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
        res.status(400).end();
    }
    let user = await User.findOne({username: username});
    if (!user) {
        return res.status(400).send({
            code: 400,
            message: "User not found",
            data: null
        });
    }
    user.comparePassword(password, function(err, isMatch) {
        if (err) {
            return res.status(500).send({
                code: 500,
                message: "Server error",
                data: null
            });
        }
        if (!isMatch) {
            return res.status(400).send({
                code: 400,
                message: "Password invalid",
                data: null
            });
        }
        return res.status(200).send({
            code: 200,
            message: 'Success',
            data: user.getBasicInfo()
        });
    });
}

async function getUsers(req, res) {
    try {
        let users = await User.find({
            isDeleted: false,
        });
        return res.json({
            code: 200,
            message: 'Success',
            count: users.length,
            // data: users.map(user => user.getBasicInfo(user))
            data: users.map(user => ({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                coverImageID: user.coverImageID,
                profileImageID: user.profileImageID,
            }))
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function getFiles(req, res) {
    try {
        let userID = Number(req.params.userID);
        if (!userID) {
            return res.status(400).json({
                code: 400,
                message: 'userID invalid',
                data: null
            });
        }
        let datas = (await Files.find({
            isDeleted: false,
            'user._id': userID,
        })).map(file => file.getBasicInfo());
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

async function searchUserByName(req, res) {
    try {
        let key = req.query.username;
        if (!key) {
            return res.status(400).json({code: 400, message:'', data:[]});    
        }
        let users = await User.find({username: {$regex: key}});
        return res.status(200).json({
            code: 200, 
            message: '', 
            data: users.map(user => user.getBasicInfo())
        });
    } catch(error) {
        return res.status(500).json({code: 500, message:'', data:[]});
    }
}
/*----------------EXPORT------------------ */
exports.postUser = postUser;
exports.putUser = putUser;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.getFriends = getFriends;
exports.addFriend = addFriend;
exports.removeFriend = removeFriend;
exports.getClasss = getClasss;
exports.addToClass = addToClass;
exports.removeFromClass = removeFromClass;
exports.getRequesteds = getRequesteds;
exports.removeRequested = removeRequested;
exports.confirmRequested = confirmRequested;
exports.getRequests = getRequests;
exports.addRequest = addRequest;
exports.removeRequest = removeRequest;

exports.checkUserName = checkUserName;
exports.checkUserNameRequest = checkUserNameRequest;
exports.checkEmail = checkEmail;
exports.checkPhoneNumber = checkPhoneNumber;
exports.putProfileImage = putProfileImage;
exports.putCoverImage = putCoverImage;
exports.getProfileImageID = getProfileImageID;
exports.getCoverImageID = getCoverImageID;

exports.getClassRequests = getClassRequests;
exports.addClassRequest = addClassRequest;
exports.removeClassRequest = removeClassRequest;

exports.getUserByUserName = getUserByUserName;
exports.getUserByID = getUserByID;
exports.findUser = findUser;
exports.getUserInfo = getUserInfo;
exports.getUsers = getUsers;
exports.login = login;
exports.getFiles = getFiles;
exports.searchUserByName = searchUserByName;