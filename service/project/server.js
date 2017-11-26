//Require package
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
var groupController = require('./controllers/group');
var fileItemController = require('./controllers/fileitem');

//Router controller
var app = express();
var apiRouter = express.Router();
var fileRouter = express.Router();
var userRouter = express.Router();
var groupRouter = express.Router();
var checkRouter = express.Router();
var testRouter = express.Router();
var taskRouter = express.Router();

//Finally error handing.
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
//Clear upload folder action
var cleanUploadFolderInterval = null;
function startCleanUploadFolderTask() {
        if (cleanUploadFolderInterval) return;
        cleanUploadFolderInterval = setInterval(() => {
                fileItemController.cleanUploadFolder();
        }, 5000);
}
function stopCleanUploadFolderTask() {
        if (cleanUploadFolder) {
                clearInterval(cleanUploadFolderInterval);
        }
        cleanUploadFolderInterval = null;
}
Application.manager.connectToDB();
Application.manager.start();
app.set('view engine', 'ejs');
//CORS
app.all('/*', function (req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
        if (req.method == 'OPTIONS') {
                return res.status(200).end();
        } else {
                return next();
        }
});

//Init extends object, log request.
app.use(function (req, res, next) {
        req.files = req.files ? req.files : {};
        req.users = req.users ? req.users : {};
        req.groups = req.groups ? req.groups : {};
        console.log("Request:" + req.path + "[" + req.method + "]");
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
// app.use(passport.session());
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
        .get(authController.isAuthenticated, clientController.getClients)
        .post(authController.isAuthenticated, clientController.postClients)
        .delete(authController.isAuthenticated, clientController.deleteClient);

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
userRouter.route('/profileImage/:userID')
        .get(userController.checkUserNameRequest, userController.getProfileImageID, fileItemController.getFile)
        .put(userController.checkUserNameRequest, fileItemController.profileUpload, fileItemController.postFile, userController.putProfileImage)
        .post(userController.checkUserNameRequest, fileItemController.profileUpload, fileItemController.postFile, userController.putProfileImage);
userRouter.route('/coverImage/:userID')
        .get(userController.checkUserNameRequest, userController.getCoverImageID, fileItemController.getFile)
        .put(userController.checkUserNameRequest, fileItemController.coverUpload, fileItemController.postFile, userController.putProfileImage)
        .post(userController.checkUserNameRequest, fileItemController.coverUpload, fileItemController.postFile, userController.putCoverImage);

userRouter.route('/friends/:userID').get(userController.getFriends);
userRouter.route('/friends/:userID/:friendUserID')
        .post(userController.addFriend)
        .delete(userController.removeFriend);
userRouter.route('/classs/:userID').get(userController.getClasss);
userRouter.route('/classs/:userID/:groupID').delete(userController.removeFromClass);
userRouter.route('/request').get(userController.getRequests);
userRouter.route('/request/:userID').get(userController.getRequests);
userRouter.route('/request/:userID/:friendUserID')
        .post(userController.addRequest)
        .delete(userController.removeRequest);
userRouter.route('/requested').get(userController.getRequesteds);
userRouter.route('/requested/:userID').get(userController.getRequesteds);
userRouter.route('/requested/:userID/:friendUserID')
        .post(userController.confirmRequested)
        .delete(userController.removeRequested);

userRouter.route('/classrequest').get(userController.getClassRequests);
userRouter.route('/classrequest/:userID').get(userController.getClassRequests);
userRouter.route('/classrequest/:userID/:groupID')
        .post(userController.addClassRequests)
        .delete(userController.removeClassRequest);

userRouter.route('/login/').post(userController.login);
userRouter.route('/info/:userID').get(userController.getUserInfo);
userRouter.route('/files/:userID').get(userController.getFiles);
userRouter.route('/search').get(userController.searchUserByName);
userRouter.route('/:userID')
        .get(userController.getUser)
        .put(userController.putUser, userController.getUser)
        .delete(userController.deleteUser, userController.getUser);
/*-------------------GROUP_API-----------------------*/
// groupRouter.route('/').post(groupController.postGroup, groupController.getGroup);
groupRouter.route('/all').get(groupController.getGroups);
groupRouter.route('/create/:userID').post(groupController.postGroup, groupController.getGroup);
groupRouter.route('/info/:groupID').get(groupController.checkGroupRequest, groupController.getGroup);
groupRouter.route('/profileImage/:groupID')
        .get(groupController.checkGroupRequest, groupController.getProfileImageID, fileItemController.getFile)
        .put(groupController.checkGroupRequest, fileItemController.profileUpload, fileItemController.postFile, groupController.putProfileImage)
        .post(groupController.checkGroupRequest, fileItemController.profileUpload, fileItemController.postFile, groupController.putProfileImage, );
groupRouter.route('/members/:groupID').get(groupController.checkGroupRequest, groupController.getMembers)
groupRouter.route('/members/:groupID/:userID')
        .get(groupController.checkGroupRequest, userController.getUser)
        .post(groupController.checkGroupRequest, groupController.addMember)//, userController.getUser)
        .put(groupController.checkGroupRequest, groupController.updateMember)//, userController.getUser)
        .delete(groupController.checkGroupRequest, groupController.removeMember)//, userController.getUser)

groupRouter.route('/requested/:groupID').get(groupController.checkGroupRequest, groupController.getRequesteds);
groupRouter.route('/requested/:groupID/:userID')
        .post(groupController.checkGroupRequest, groupController.confirmRequested)
        .delete(groupController.checkGroupRequest, groupController.removeRequested);
groupRouter.route('/action/:groupID/:userID')
        .put(groupController.checkGroupRequest, groupController.putGroup, groupController.getGroup)
        .delete(groupController.checkGroupRequest, groupController.deleteGroup, groupController.getGroup);
groupRouter.route('/files/:groupID')
        .get(groupController.checkGroupRequest, groupController.getFiles)
        .post(groupController.checkGroupRequest, fileItemController.fileUpload, fileItemController.postFile, groupController.postFile, );
groupRouter.route('/search').get(groupController.checkGroupRequest, groupController.searchGroupByName);
groupRouter.route('/post/:groupID')
        .get(groupController.checkGroupRequest, groupController.getPosts)//, groupController.getGroup)
groupRouter.route('/post/:groupID/:userID')
        .get(groupController.checkGroupRequest, groupController.getPosts)//, groupController.getGroup)
        .post(groupController.checkGroupRequest, fileItemController.fileUpload, fileItemController.postFileIfHave, groupController.addPost, groupController.getGroup);
/*-------------------FILE_API------------------------*/
fileRouter.route('/upload').post(fileItemController.fileUpload, fileItemController.postFile, fileItemController.getInfoFile);
fileRouter.route('/image').post(fileItemController.imageUpload, fileItemController.postFile, fileItemController.getInfoFile);
fileRouter.route('/get/:fileID').get(fileItemController.getFile);
fileRouter.route('/attach/:fileID').get(fileItemController.attachFile);
fileRouter.route('/delete/:fileID').delete(fileItemController.deleteFile);
fileRouter.route('/info/:fileID').get(fileItemController.getInfoFile);

/*----------------CHECK_API--------------------- */
checkRouter.route('/username').get(userController.checkUserName);
checkRouter.route('/username/:username').get(userController.checkUserName);
checkRouter.route('/email').get(userController.checkEmail);
checkRouter.route('/phone').get(userController.checkPhoneNumber);
/*----------------TASK_API----------------------------*/
taskRouter.route('/cleanUploadFolder/start').post((req, res) => {
        startCleanUploadFolderTask();
        res.status(cleanUploadFolderInterval ? 200 : 500).end();
});
taskRouter.route('/cleanUploadFolder/stop').post((req, res) => {
        stopCleanUploadFolderTask();
        res.status(cleanUploadFolderInterval ? 500 : 200).end();
});
/*----------------TEST_API----------------------------*/
testRouter.route('/files').get(fileItemController.getFiles);
testRouter.route('/users').get(userController.getUsers);
testRouter.route('/groups').get(groupController.getGroups);
/*------------------GROUP_ROUTER--------------------------*/
app.use('/apis', apiRouter);
app.use('/files', fileRouter);
app.use('/users', userRouter);
app.use('/groups/', groupRouter);
app.use('/checks/', checkRouter);
app.use('/tasks', taskRouter);
app.use('/test', testRouter);

app.use('/', (req, res) => res.end('Education Social NetWork Service. Not support path'));//handing error request path
app.use(errorHanding);//main error handding
app.listen(Application.manager.portRunning);
console.log('Running at ' + Application.manager.portRunning);

//------------START _TASK-----------------------
// startCleanUploadFolderTask();