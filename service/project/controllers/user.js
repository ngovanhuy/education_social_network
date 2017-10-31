var User = require('../models/user');

function isString(obj) {
    return typeof (obj) === "string";
}

function isStringEmpty(obj, minLength = 1, maxLength = 100) {
    return isString(obj) && obj.length >= minLength && obj.length <= maxLength;
}

function getArray(jsonContent) {
    try {
        return [...items] = JSON.parse(jsonContent);
    } catch (error) {
        return [];
    }
}

function getLanguage(languageString) {
    try {
        let [...languages] = JSON.parse(languageString);
        let data = [];
        for (let index = 0; index < languages.length; index++) {
            var { code = 'en-US', text = 'English(US)'} = languages[index];
            data.push({
                code: code,
                text: text,
            });
        }
        return data;
    } catch(error) {
        return [];
    }
}

function getDate(dateString) {
    if (!dateString) {
        return null;
    }
    var date = new Date(dateString+ "Z");
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
async function postUser(req, res) {
    try {
        if (!validateUserName(req.body.username)) {
            return res.status(400).send({
                code: 400,
                message: 'UserName invalid',
                data: null
            });
        }
        if (!isStringEmpty(req.body.firstName, 1, 20)) {
            return res.status(400).send({
                code: 400,
                message: 'FirstName invalid',
                data: null
            });
        }
        if (!isStringEmpty(req.body.lastName, 1, 20)) {
            return res.status(400).send({
                code: 400,
                message: 'LastName invalid',
                data: null
            });
        }
        if (!isStringEmpty(req.body.password, 1, 20)) {
            return res.status(400).send({
                code: 400,
                message: 'Password invalid',
                data: null
            });
        }
        let userFind = await User.findOne({
            username: req.body.username,
            // email: req.body.email,
            // phone: req.body.phone,
        });
        if (userFind) {
            return res.status(400).send({
                code: 400,
                message: 'User Existed',
                data: null
            });
        }
        let user = new User({
            id: new Date().getTime(),
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            isDeleted: false,
        });
        if (req.body.birthday) {
            user.birthday =  getDate(req.body.birthday);
        }
        if (req.body.email) {
            if (validateEmail(req.body.email)) {
                user.email = req.body.email;
            } else {
                return res.status(400).send({
                    code: 400,
                    message: 'Email invalid',
                    data: null
                });
            }
        }
        if (req.body.phone) {
            if (validatePhoneNumber) {
                user.phone = req.body.phone;
            } else {
                return res.status(400).send({
                    code: 400,
                    message: 'Phone invalid',
                    data: null
                });
            }
        }
        if (req.body.gender) {
            user.gender = req.body.gender;
        }
        if (req.body.about) {
            user.about = req.body.about;
        }
        if(req.body.quote) {
            user.quote = req.body.quote;
        }
        if (req.body.nickname) {
            user.nickname = getArray(req.body.nickname);
        }
        if (req.body.language) {
            user.language =  getLanguage(req.body.language);
        }
        if (req.body.location) {
            user.location = req.body.location;
        }
        if (req.body.typeuser) {
            user.typeuser = req.body.typeuser;
        }
        let userSave = await user.save();
        return res.send({
            code: 200,
            message: 'Success',
            data: userSave.getBasicInfo()
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
        let userFind = await User.findOne({
            username: req.body.username,
            // email: req.body.email,
            // phone: req.body.phone,
        });
        if (!userFind) {
            return res.status(400).send({
                code: 400,
                message: 'User Not Existed',
                data: null
            });
        }
        if (req.body.firstName) {
            if (isStringEmpty(req.body.firstName, 1, 20)) {
                userFind.firstName = req.body.firstName;
            } else {
                return res.status(400).send({
                    code: 400,
                    message: 'FirstName invalid',
                    data: null
                });
            }
        }
        if (req.body.lastName) {
            if (isStringEmpty(req.body.lastName, 1, 20)) {
                userFind.lastName = req.body.lastName;
            } else {
                return res.status(400).send({
                    code: 400,
                    message: 'LastName invalid',
                    data: null
                });
            }
        }
        if (req.body.email) {
            if (validateEmail(req.body.email)) {
                userFind.email = req.body.email;
            } else {
                return res.status(400).send({
                    code: 400,
                    message: 'Email invalid',
                    data: null
                });
            }
        }
        if (req.body.phone) {
            if (validatePhoneNumber) {
                userFind.phone = req.body.phone;
            } else {
                return res.status(400).send({
                    code: 400,
                    message: 'Phone invalid',
                    data: null
                });
            }
        }
        if (req.body.password) {
            userFind.password = req.body.password;
        }
        if (req.body.firstName) {
            userFind.firstName =  req.body.firstName;
        }
        if (req.body.lastName) {
            userFind.lastName = req.body.lastName;
        }
        if (req.body.birthday) {
            userFind.birthday =  getDate(req.body.birthday);
        }
        if (req.body.gender) {
            userFind.gender = req.body.gender;
        }
        if (req.body.about) {
            userFind.about = req.body.about;
        }
        if(req.body.quote) {
            userFind.quote = req.body.quote;
        }
        if (req.body.nickname) {
            userFind.nickname = getArray(req.body.nickname);
        }
        if (req.body.language) {
            userFind.language =  getLanguage(req.body.language);
        }
        if (req.body.location) {
            userFind.location = req.body.location;
        }
        if (req.body.typeuser) {
            userFind.typeuser = req.body.typeuser;
        }
        userFind.isDeleted =  false;
        let userSave = await userFind.save();
        return res.send({
            code: 200,
            message: 'Success',
            data: userSave.getBasicInfo()
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
async function updateUserByID(req, res) {
    try {
        let userFind = await User.findOne({
            id: req.params.user_id
        });
        if (!userFind) {
            return res.status(400).send({
                code: 400,
                message: 'User Not Existed',
                data: null
            });
        }
        if (req.body.password) {
            userFind.password = req.body.password;
        }
        if (req.body.firstname) {
            userFind.firstname =  req.body.firstname;
        }
        if (req.body.lastname) {
            userFind.lastname = req.body.lastname;
        }
        if (req.body.birthday) {
            userFind.birthday =  getDate(req.body.birthday);
        }
        if (req.body.email) {
            if (validateEmail(req.body.email)) {
                userFind.email = req.body.email;
            } else {
                return res.status(400).send({
                    code: 400,
                    message: 'Email invalid',
                    data: null
                });
            }
        }
        if (req.body.phone) {
            if (validatePhoneNumber) {
                userFind.phone = req.body.phone;
            } else {
                return res.status(400).send({
                    code: 400,
                    message: 'Phone invalid',
                    data: null
                });
            }
        }
        if (req.body.gender) {
            userFind.gender = req.body.gender;
        }
        if (req.body.about) {
            userFind.about = req.body.about;
        }
        if(req.body.quote) {
            userFind.quote = req.body.quote;
        }
        if (req.body.nickname) {
            userFind.nickname = getArray(req.body.nickname);
        }
        if (req.body.language) {
            userFind.language =  getLanguage(req.body.language);
        }
        if (req.body.location) {
            userFind.location = req.location;
        }
        userFind.isDeleted =  false;
        let userSave = await userFind.save();
        return res.send({
            code: 200,
            message: 'Success',
            data: userSave.getBasicInfo()
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
async function deleteUserByID(req, res) {
    try {
        let userFind = await User.findOne({
            id: req.params.user_id
        });
        if (!userFind) {
            return res.status(400).send({
                code: 400,
                message: 'User Not Existed',
                data: null
            });
        }
        userFind.isDeleted =  true;
        let userSave = await userFind.save();
        return res.send({
            code: 200,
            message: 'Success',
            data: userSave.getBasicInfo()
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
        let user = await User.findOne({
            id: req.params.user_id
        });
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit user',
                data: null
            });
        }
        return res.send({
            code: 200,
            message: '',
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
async function getUsers (req, res) {
    try {
        let users = await User.find();
        return res.json(users.map(user => user.getBasicInfo(user)));
        // res.json(users);
    } catch (error) {
        res.status(500).send(error);
    }
};
async function getFriends(req, res) {
    try {
        let user = await User.findOne({
            id: req.params.user_id
        });
        if (!user) {
            return res.status(400).send({
                code: 400,
                message: 'Not exit user',
                data: null
            });
        }
        return res.send({
            code: 200,
            message: '',
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
        let user = await User.findOne({
            id: req.params.user_id
        });
        if (!user) {
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

/*----------------EXPORT------------------ */
exports.postUser = postUser;
exports.updateUser = updateUser;
exports.updateUserByID = updateUserByID;
exports.getUser = getUser;
exports.deleteUserByID = deleteUserByID;
exports.getUsers = getUsers;
exports.getFriends = getFriends;
exports.getClasss = getClasss;
