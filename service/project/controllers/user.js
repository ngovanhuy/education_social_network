var User = require('../models/user');

exports.postUsers = async (req, res) => {
    var user = new User({
        id: req.body.username,
        username: req.body.username,
        password: req.body.password,
        firstname:req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        gender: req.body.gender,
        typeuser: req.body.typeuser,
    });
    try {
        await user.save();
        res.send({code: 200, message: 'Success', data: user.getBasicInfo()});
    } catch(error) {
        res.send(error);
    }
};

exports.getUsers = async (req, res) => {
    try {
        var users = await User.find();
        res.json(users);
    } catch(error) 
    {
        res.send(error);
    }
};