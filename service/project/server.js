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
var checkRouter = express.Router();
var testRouter = express.Router();

var errorHanding = function (err, req, res, next) {
        if (err) {
                let status = err.status ? err.status : 500;
                let logicCode = err.logicCode ? err.logicCode : status;
                return res.status(status).send({
                        code: logicCode,
                        message: err.detail ? err.detail : err.message ? err.message : 'Server Error',
                        data: null,
                        error: err,
                })
        }
        return res.status(400).send({
                code: 400,
                message: 'Client Error',
                data: null,
                error: 'Client Error'
        });
}
Application.manager.connectToDB();
Application.manager.start();
app.set('view engine', 'ejs');
app.use(function (req, res, next) {
        req.files = req.files ? req.files : {};
        req.users = req.users ? req.users : {};
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
        .get(userController.getUser)
        .post(userController.postUser, userController.getUser)
        .put(userController.putUser, userController.getUser)
        .delete(userController.deleteUser, userController.getUser);

userRouter.route('/:user_id')
        .get(userController.getUser)
        .put(userController.putUser, userController.getUser)
        .delete(userController.deleteUser, userController.getUser);
userRouter.route('/profileImage/:user_id')
        .get(userController.checkUserNameOrId,
                userController.getProfileImageID,
                fileItemController.getFile)
        .put(userController.checkUserNameOrId,
                fileItemController.profileUpload,
                fileItemController.postFile,
                userController.putProfileImage)
        .post(userController.checkUserNameOrId,
                fileItemController.profileUpload,
                fileItemController.postFile,
                userController.putProfileImage, );
userRouter.route('/coverImage/:user_id')
        .get(userController.checkUserNameOrId,
                userController.getCoverImageID,
                fileItemController.getFile)
        .put(userController.checkUserNameOrId,
                fileItemController.coverUpload,
                fileItemController.postFile,
                userController.putProfileImage)
        .post(userController.checkUserNameOrId,
                fileItemController.coverUpload,
                fileItemController.postFile,
                userController.putCoverImage, );

userRouter.route('/friends/:user_id')
        .get(userController.getFriends);
userRouter.route('/classs/:user_id')
        .get(userController.getClasss);

userRouter.route('/files/:user_id')
        .get(fileItemController.getFiles); //TEST
/*-------------------FILE_API------------------------*/
fileRouter.route('/upload')
        .post(fileItemController.fileUpload,
                fileItemController.postFile,
                fileItemController.getInfoFile);
fileRouter.route('/image')
        .post(fileItemController.imageUpload,
                fileItemController.postFile,
                fileItemController.getInfoFile);
// fileItemController.postFile);
fileRouter.route('/get/:file_id')
        .get(fileItemController.getFile);
fileRouter.route('/attach/:file_id')
        .get(fileItemController.attachFile);
fileRouter.route('/delete/:file_id')
        .delete(fileItemController.deleteFile);
fileRouter.route('/info/:file_id')
        .get(fileItemController.getInfoFile);

/*------------------------------------- */
checkRouter.route('/username')
        .get(userController.checkUserName);
checkRouter.route('/username/:username')
        .get(userController.checkUserName);
checkRouter.route('/email')
        .get(userController.checkEmail);
checkRouter.route('/phone')
        .get(userController.checkPhoneNumber);

/*--------------------------------------------*/
testRouter.route('/files')
        .get(fileItemController.getFiles, errorHanding);
testRouter.route('/users')
        .get(userController.getUsers);
/*--------------------------------------------*/
app.use('/apis', apiRouter);
app.use('/files', fileRouter);
app.use('/users', userRouter);
app.use('/checks/', checkRouter);
app.use('/test', testRouter);

app.use('/', (req, res) => res.end('Education Social NetWork Service. Not support path'));
app.use(errorHanding);
app.listen(Application.manager.portRunning);
console.log('Running at ' + Application.manager.portRunning);