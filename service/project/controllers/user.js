var User = require('../models/user');

async function findUser(req) { //id, username, email, phone
    let userFind = null;
    if (req.params.user_id) {
        userFind = await User.findOne({
            $or: [{
                    id: req.params.user_id
                },
                {
                    username: req.params.user_id
                },
            ],
        });
        if (userFind) {
            return userFind;
        }
    }
    if (req.body.id) {
        userFind = await User.findOne({
            id: req.body.id,
        });
        if (userFind) {
            return userFind;
        }
    }
    if (req.body.username) {
        userFind = await User.findOne({
            username: req.body.username,
        });
        if (userFind) {
            return userFind;
        }
    }
    if (req.body.phone) {
        userFind = await User.findOne({
            phone: req.body.phone,
        });
        if (userFind) {
            return userFind;
        }
    }
    if (req.body.email) {
        userFind = await User.findOne({
            email: req.body.email,
        });
        if (userFind) {
            return userFind;
        }
    }
    return res.status(400).send({
        code: 400,
        message: "Not exit user",
        data: null
    });
    return user;
}

function updateUserInfo(req, user, isCheckValidInput = true) {
    if (isCheckValidInput) {
        let message = User.validateInputInfo(req.body, true);
        if (!message || message.length > 0) {
            return message;
        }
    }
    if (req.body.birthday) {
        user.birthday = User.getBirthDate(req.body.birthday);
    }
    if (req.body.email) {
        user.email = req.body.email;
    }
    if (req.body.phone) {
        user.phone = req.body.phone;
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
        user.nickname = User.getStringArray(req.body.nickname);
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
    return [];
}
async function postUser(req, res) {
    try {
        let message = User.validateInputInfo(req.body, true);
        if (!message || message.length > 0) {
            return res.status(400).send({
                code: 400,
                message: message,
                data: null,
                error: 'Request Invalid'
            });
        }
        let userFind = await User.findOne({
            username: req.body.username,
            // isDeleted: false,
        });
        if (userFind) {
            return res.status(400).send({
                code: 400,
                message: 'username is used.',
                data: null
            });
        }
        let user = new User({
            id: User.getNewID,
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            isDeleted: false,
        });
        message = updateUserInfo(req, user, false);
        if (!message || message.length > 0) {
            return res.status(400).send({
                code: 400,
                message: message,
                data: null,
                error: 'Request Invalid',
            });
        }
        user = await user.save();
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
};
async function updateUser(req, res) {
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
        let user = await findUser(req);
        if (!user || user.isDeleted)
            return res.status(400).send({
                code: 400,
                message: 'User Not Existed',
                data: null
            });
        message = updateUserInfo(req, userFind, false);
        if (!message || message.length > 0) {
            return res.status(400).send({
                code: 400,
                message: message,
                data: null,
                error: 'Request Invalid',
            });
        }
        user = await user.save();
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
async function deleteUser(req, res) {
    try {
        let user = await findUser(req);
        if (!user || user.isDeleted) {
            return res.status(400).send({
                code: 400,
                message: 'User Not Existed',
                data: null
            });
        }
        user.isDeleted = true;
        user = await user.save();
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
    };
}
async function getUser(req, res) {
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
            data: user.getBasicInfo()
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
            data: user.friends,
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
            data: user.classs,
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

async function checkUserName(req, res) {
    try {
        let user = null;
        if (req.params.user_name) {
            user = await User.findOne({
                username: req.params.user_name,
            });
            if (user) {
                return res.status(user.isDeleted ? 400 : 200).end();
            }
        }
        if (req.body.username) {
            user = await User.findOne({
                username: req.body.username,
            });
            if (user) {
                return res.status(user.isDeleted ? 400 : 200).end();
            }
        }
        return res.status(400).end();
    } catch (error) {
        return res.status(500).end();
    }
}
async function checkEmail(req, res) {
    try {
        let user = null;
        if (req.body.email) {
            user = await User.findOne({
                email: req.body.email,
            });
            if (user) {
                return res.status(user.isDeleted ? 400 : 200).end();
            }
        }
        return res.status(400).end();
    } catch (error) {
        return res.status(500).end();
    }
}
async function checkPhoneNumber(req, res) {
    try {
        let user = null;
        if (req.body.phone) {
            user = await User.findOne({
                phone: req.body.phone,
            });
            if (user) {
                return res.status(user.isDeleted ? 400 : 200).end();
            }
        }
        return res.status(400).end();
    } catch (error) {
        return res.status(500).end();
    }
}
async function getUsers(req, res) {
    try {
        let users = await User.find();
        return res.json({
            code: 200,
            message: "",
            data: users.map(user => user.getBasicInfo(user))
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
/*----------------EXPORT------------------ */
exports.postUser = postUser;
exports.updateUser = updateUser;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.getFriends = getFriends;
exports.getClasss = getClasss;
exports.checkUserName = checkUserName;
exports.checkEmail = checkEmail;
exports.checkPhoneNumber = checkPhoneNumber;

exports.getUsers = getUsers;