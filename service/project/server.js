//Require package
let Application = require('./application/application');
let session = require('express-session');
let ejs = require('ejs');
let express = require('express');
let passport = require('passport');
let bodyParser = require('body-parser');
let app = express();

let apiRouter = require('./routes/api');
let fileRouter = require('./routes/file');
let groupRouter = require('./routes/group');
let userRouter = require('./routes/user');
let checkRouter = require('./routes/check');
let testRouter = require('./routes/test');
let taskRouter = require('./routes/task');
let postRouter = require('./routes/post');
let eventRouter = require('./routes/event');

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
        if (req.method === 'OPTIONS') {
                return res.status(200).end();
        } else {
                return next();
        }
});
//Init extends object, log request.
app.use(function (req, res, next) {
        req.posts = req.posts ? req.posts : {};
        req.fileitems = req.fileitems ? req.fileitems : {};
        req.users = req.users ? req.users : {};
        req.groups = req.groups ? req.groups : {};
        req.events = req.events ? req.events : {};
        req.comments = req.comments ? req.comments : {};
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
/*------------------GROUP_ROUTER--------------------------*/
app.use('/apis', apiRouter);
app.use('/files', fileRouter);
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/checks', checkRouter);
app.use('/tasks', taskRouter);
app.use('/test', testRouter);
app.use('/posts', postRouter);
app.use('/events', eventRouter);

app.use('/', (req, res) => res.end('Education Social NetWork Service. Not support path'));//handing error request path
app.use(function (err, req, res, next) {
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
    });//main error handding
});
app.listen(Application.manager.portRunning);
console.log('Running at ' + Application.manager.portRunning);