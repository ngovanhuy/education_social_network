var Application = require('./application/application');
var oauth2Controller = require('./controllers/oauth2');
var session = require('express-session');
var ejs = require('ejs');
var express = require('express');
var passport = require('passport');
var authController = require('./controllers/auth');
var bodyParser = require('body-parser');
var userController = require('./controllers/user');
var clientController = require('./controllers/client');
var fileItemController = require('./controllers/fileitem');

var app = express();
var apiRouter = express.Router();
var fileRouter = express.Router();
var userRouter = express.Router();
var testRouter = express.Router();

var errorHanding = function (err, req, res, next) {

        if (err) {
                return res.status(500).send({
                        code: 500,
                        message: 'Server Error',
                        data: null,
                        error: err.message
                })
        }
        return res.status(400).send({
                code: 400,
                message: 'Client Error',
                data: null,
                error: err.message
        });
}
Application.manager.connectToDB();
app.set('view engine', 'ejs');
app.use(function (req, res, next) {
        console.log("Request:" + req.path);
        next();
});
app.use(bodyParser.urlencoded({
        extended: true
}));
app.use(bodyParser.json());
app.use(session({
        secret: 'Super Secret Session Key',
        saveUninitialized: true,
        resave: true
}));
app.use(passport.initialize());
/*---------------------------------------------*/
apiRouter.route('/').get(function (req, res) {
        return res.json({
                message: 'API Service Running!'
        });
});
apiRouter.route('/users')
        .post(userController.postUser)
        .get(authController.isAuthenticated, userController.getUsers);
apiRouter.route('/clients')
        .post(authController.isAuthenticated, clientController.postClients)
        .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
apiRouter.route('/oauth2/authorize')
        .get(authController.isAuthenticated, oauth2Controller.authorization)
        .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
apiRouter.route('/oauth2/token').post(authController.isClientAuthenticated, oauth2Controller.token);
/*-------------------USER_API-------------------------*/
userRouter.route('/') 
        .get(userController.getUser, errorHanding)
        .put(userController.updateUser, errorHanding)
        .delete(userController.deleteUser, errorHanding);
userRouter.route('/:user_id')
        .get(userController.getUser, errorHanding)
        .put(userController.updateUser, errorHanding)
        .delete(userController.deleteUser, errorHanding);
userRouter.route('/profileImage/:user_id')
        .get(fileItemController.profileUpload, fileItemController.postFile, errorHanding)
        .put(fileItemController.profileUpload, fileItemController.postFile, errorHanding)
        .post(fileItemController.profileUpload, fileItemController.postFile, errorHanding);
userRouter.route('/avatarImage/:user_id')
        .get(errorHanding)
        .put(fileItemController.avatarUpload, fileItemController.postFile, errorHanding)
        .post(fileItemController.avatarUpload, fileItemController.postFile, errorHanding);
        
userRouter.route('/friends/:user_id')
        .get(userController.getFriends, errorHanding);
userRouter.route('/classs/:user_id')

        .get(userController.getClasss, errorHanding);
userRouter.route('/check/:user_name')
        .get(userController.checkUserName, errorHanding);
userRouter.route('/check/email')
        .get(userController.checkEmail, errorHanding);
userRouter.route('/check/phone')
        .get(userController.checkPhoneNumber, errorHanding);

userRouter.route('/files/:user_id')
        .get(fileItemController.getFiles, errorHanding);//TEST
/*-------------------FILE_API------------------------*/
fileRouter.route('/upload')
        .post(fileItemController.fileUpload, fileItemController.postFile, errorHanding);
fileRouter.route('/get/:file_id')
        .get(fileItemController.getFile, errorHanding);
fileRouter.route('/attach/:file_id')
        .get(fileItemController.attachFile, errorHanding);
fileRouter.route('/delete/:file_id')
        .delete(fileItemController.deleteFile, errorHanding);
fileRouter.route('/image')
        .post(fileItemController.imageUpload, fileItemController.postFile, errorHanding);
fileRouter.route('/info/:file_id')
        .get(fileItemController.getInfoFile, errorHanding);

/*--------------------------------------------*/
testRouter.route('/files')
        .get(fileItemController.getFiles, errorHanding);
testRouter.route('/users')
        .get(userController.getUsers);

/*--------------------------------------------*/
app.use('/apis', apiRouter);
app.use('/files', fileRouter);
app.use('/users', userRouter);
app.use('/test', testRouter);

app.use('/', (req, res) => res.end('Education Social NetWork Service. Not support path'));
app.listen(Application.manager.portRunning);
console.log('Running at ' + Application.manager.portRunning);