var User = require('../models/user');

exports.postUsers = async (req, res) => {
    var username = req.body.username;
    var user = User.findOne({id: username});
    if (!user) {
        user = new User({
            id: req.body.username,
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            isDeleted: false,
        });
    } else {
        console.log(user.getBasicInfo(user));
        return res.send({code: 400, message: 'User Existed', data: null});
    }
    try {
        await user.save();
        return res.send({code: 200, message: 'Success', data: user.getBasicInfo()});
    } catch(error) {
        return res.send({code: 500, message: 'Server Error', data: null, error: error.message});
    }
};
exports.getUser = async (req, res) => {
    try {
        var user = await User.findOne({id : req.params.user_id});
        if (!user) {
            return res.send({code: 400, message: 'Not exit user', data: null});
        }
        return res.send({code: 200, message: '', data: user.getBasicInfo(user)})
    } catch(error) {
        return res.send({code: 500, message: 'Server Error', data: null, error: error.message});
    }
}
exports.getUsers = async (req, res) => {
    try {
        var users = await User.find();
        res.json(users);
    } catch(error) 
    {
        res.send(error);
    }
};