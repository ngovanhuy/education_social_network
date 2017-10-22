var dotenv = require('dotenv');
var mongoose = require('mongoose');
dotenv.config();
//TODO: config mongoose: reconnect, readState...
mongoose.Promise = global.Promise;

//TODO: export
exports.portRunning = process.env.PORT_RUNNING || 3000;
exports.connectString = process.env.MONGODB_CONNECT_STRING || "mongodb://localhost:27017/education_social_network";
exports.connectToDB = async () => {
    try {
        await mongoose.connect(exports.connectString, {
            useMongoClient: true
        });
        console.log("Connection success db");
    } catch(error) {
        console.log("Connection failed db:" + error);
    }
}