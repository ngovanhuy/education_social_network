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

var errorHanding = (err, req, res, next) => {
        err ?   res.status(500).send({ code: 500, message: 'Server Error', data: null, error: err.message }) :
        res.status(400).send({ code: 400, message: 'Client Error', data: null, error: err.message }); 
}
Application.manager.connectToDB();
app.set('view engine', 'ejs');
app.use((req, res, next) => { console.log("Request:" + req.path); next();});
app.use(bodyParser.urlencoded({
        extended: true
}));
// Use express session support since OAuth2orize requires it
app.use(session({
        secret: 'Super Secret Session Key',
        saveUninitialized: true,
        resave: true
}));
app.use(passport.initialize());
/*---------------------------------------------*/
apiRouter.route('/').get((req, res) => res.json({ message: 'API Service Running!' }));
apiRouter.route('/users')
        .post(userController.postUsers)
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
/*--------------------------------------------*/
userRouter.route('/')
        .post(userController.postUsers, errorHanding);

userRouter.route('/:user_id').get(userController.getUser, errorHanding);

/*-------------------------------------------*/
fileRouter.route('/upload').post(fileItemController.fileUpload, fileItemController.postFile, errorHanding);
fileRouter.route('/get/:file_id').get(fileItemController.getFile, errorHanding);
fileRouter.route('/attach/:file_id').get(fileItemController.attachFile, errorHanding);
fileRouter.route('/delete/:file_id').delete(fileItemController.deleteFile, errorHanding);
fileRouter.route('/image').post(fileItemController.imageUpload, fileItemController.postFile, errorHanding);
fileRouter.route('/info/:file_id').get(fileItemController.getInfoFile, errorHanding);
/*--------------------------------------------*/
testRouter.route('/files').get(fileItemController.getFiles, errorHanding);
testRouter.route('/users').get(userController.getUsers);
/*--------------------------------------------*/
app.use('/api', apiRouter);
app.use('/files', fileRouter);
app.use('/users', userRouter);
app.use('/test', testRouter);
app.listen(Application.manager.portRunning);
console.log('Running at ' + Application.manager.portRunning);