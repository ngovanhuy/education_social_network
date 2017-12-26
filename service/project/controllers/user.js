let User = require('../models/user');
let Groups = require('../models/group');
let GroupController = require('../controllers/group');
let Files = require('../models/fileitem');
let Utils = require('../application/utils');
let Posts = require('../models/post');

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
    if (!(User.validateUserName(username, true))) { return null;}
    return await User.findOne({ username: username,});
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
async function findUser(req, isFindWithPhoneAndEmail = true) {
    if (req.users.user_request) {
        return req.users.user_request;
    }
    if (req.params.userID) {
        return await getUserByID(req.params.userID);
    }
    if (req.params.username) {
        return await getUserByUserName(req.params.username);
    }
    if (req.body.userID) {
        return await getUserByID(req.body.userID);
    }
    if (req.body.id) {
        return await getUserByID(req.body.id);
    }
    if (req.body.username) {
        return await getUserByUserName(req.body.username);
    }
    if (!isFindWithPhoneAndEmail) {
        return null;
    }
    let userFind = null;
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

async function postUsers(req, res, next) {
    try {

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
    if(req.body.fbAccount){
        user.fbAccount = req.body.fbAccount;
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
async function putUser(req, res, next) {
    try {
        let user = req.users.user_request;
        let message = User.validateInputInfo(req.body, false);
        if (message && message.length === 0) {
            message = await updateUserInfo(req, user, false);
        }
        if (!message || message.length > 0) {
            return res.status(400).send({
                code: 400,
                message: message,
                data: null,
                error: "Request Invalid",
            });
        }
        user = await user.save();
        req.users.user_request = user;
        //TODO: update reference to this user.
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
        //TODO remove all request, member of this user.
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
function getUser(req, res) {
    try {
        let user = req.users.user_request;
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
function getProfileImageID(req, res, next) {
    let user = req.users.user_request;
    req.fileitems.file_selected_id = user ? user.profileImageID : null;
    return next();
}
async function putProfileImage(req, res, next) {
    try {
        let user = req.users.user_request;
        let file = req.fileitems.file_saved;
        user.profileImageID = req.fileitems.file_saved._id;
        user = await user.save();
        req.users.user_request = user;
        return next();
        // return res.json({
        //     code: 200,
        //     message: 'Success',
        //     data: file.getBasicInfo(),
        // });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: 'Server Error',
            data: null,
            error: error.message
        });
    }
}
function getCoverImageID(req, res, next) {
    let user = req.users.user_request;
    req.fileitems.file_selected_id = user ? user.coverImageID : null;
    return next();
}
async function putCoverImage(req, res, next) {
    try {
        let user = req.users.user_request;
        let file = req.fileitems.file_saved;
        user.coverImageID = req.fileitems.file_saved._id;
        user = await user.save();
        req.users.user_request = user;
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
function getUserInfo(req, res) {
    try {
        let user = req.users.user_request;
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
function getFriends(req, res) {
    try {
        let user = req.users.user_request;
        return res.send({
            code: 200,
            message: 'Success',
            data: user.getFriends()
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
        let user = req.users.user_request;
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
        req.users.user_request = user;
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
        let user = req.users.user_request;
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
        req.users.user_request = user;
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
        let user = req.users.user_request;
        let groups = await Groups.find({_id: {$in: user.getClasssID()}});
        let datas = groups.map(group => ({
            id: group._id,
            profileImageID: group.profileImageID,
            name: group.name,
        }));
        return res.send({
            code: 200,
            message: '',
            length: datas.length,
            data: datas,//user.getClasss()
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
async function removeFromClass(req, res) {
    try {
        let user = req.users.user_request;
        let group = req.groups.group_request;
        if (user.removeFromClass(group)) {
            group = await group.save();
            user = await user.save();
            req.users.user_request = user;
            req.groups.group_request = group;
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
function getClassRequests(req, res) {
    try {
        let user = req.users.user_request;
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
        let user = req.users.user_request;
        let group = req.groups.group_request;
        if (user.addClassRequest(group, true)) {
            group = await group.save();
            user = await user.save();
            req.users.user_request = user;
            req.groups.group_request = group;
        } else {
            throw new Error('Add class request error');
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
        let user = req.users.user_request;
        let group = req.groups.group_request;
        if (user.removeClassRequest(group, true)) {
            group = await group.save();
            user = await user.save();
            req.users.user_request = user;
            req.groups.group_request = group;
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
function getRequests(req, res) {
    try {
        let user = req.users.user_request;
        return res.send({
            code: 200,
            message: '',
            data: user.getRequests(),
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
async function addRequest(req, res) {
    try {
        let user = req.users.user_request;
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
        req.users.user_request = user;
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
        let user = req.users.user_request;
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
        req.users.user_request = user;
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
function getRequesteds(req, res) {
    try {
        let user = req.users.user_request;
        return res.send({
            code: 200,
            message: '',
            data: user.getRequesteds(),
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
        let user = req.users.user_request;
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
        req.users.user_request = user;
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
        let user = req.users.user_request;
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
            req.users.user_request = user;
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

async function checkUserRequest(req, res, next) {
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
}
async function checkUserRequestIfHave(req, res, next) {
    let user = await findUser(req);
    if (user && !user.isDeleted) {
        req.users.user_request = user;
    } else {
        req.users.user_request = null;
    }
    return next();
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
    let user = await getUserByUserName(username);
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
            data: users.map(user => user.getBasicInfo()),
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}
async function getFiles(req, res, next) {
    try {
        let user = req.users.user_request;
        let files = await Files.find({
            isDeleted: false,
            'user.id': user._id,
        });
        req.fileitems.files_saved = files;
        return next();
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

async function getPosts(req, res) {
    try {
        let user = req.users.user_request;
        // let groups = await Groups.find({posts:{$elemMatch:{isDeleted: false, "options.members":{$elemMatch:{$eq: user._id}}}}});
        let groups = await Groups.find({_id: {$in: user.getClasssID()}});
        let postIDs = groups.reduce((postIDs, group) => {
            return postIDs.concat(group.getPostIDForUsers(user))
        },[]);
        // let posts = await Posts.find({_id: {$in : postIDs}});
        let topicName = req.query.topicname;
        let posts;
        if (topicName) {
            posts = await Posts.find({isDeleted: false, _id: {$in: postIDs}, topics: {$elemMatch: {_id: topicName}}});
        } else {
            posts = await Posts.find({isDeleted: false, _id: {$in: postIDs}});
        }
        let datas = posts.map(post => post.getBasicInfo(user));
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

async function getManyUsers(userIDs) {
    try {
        if (!userIDs) { return null; }
        let userNumberIDs = Utils.getNumbers(userIDs);
        return await User.find({_id: {$in: userNumberIDs}});
    } catch(error) {
        return null;
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
exports.removeFromClass = removeFromClass;
exports.getRequesteds = getRequesteds;
exports.removeRequested = removeRequested;
exports.confirmRequested = confirmRequested;
exports.getRequests = getRequests;
exports.addRequest = addRequest;
exports.removeRequest = removeRequest;

exports.checkUserName = checkUserName;
exports.checkUserRequest = checkUserRequest;
exports.checkUserRequestIfHave = checkUserRequestIfHave;
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
exports.getPosts = getPosts;
exports.getManyUsers = getManyUsers;
exports.postUsers = postUsers;