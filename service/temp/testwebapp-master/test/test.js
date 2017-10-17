var promise1 = new Promise((resolve, reject) => {

});

// var buf = new Buffer('abc');
// var json = buf.toJSON();
// console.log(json);

//--------------------------------------
// var buf = new Buffer(26);
// for (var i = 0; i < 26; i++) {
//     buf[i] = i + 97;
// }
// console.log(buf.toString('ascii'));

//--------------------------------
// var events = require('events');
// var eventEmitter = new events.EventEmitter();

// var listner1 = function listner1() {
//     console.log('listner1 executed.');
// };

// var listner2 = function listner2(message) {
//     console.log('listner2 excuted:' + message);
// };

// eventEmitter.addListener('connection', listner1);
// eventEmitter.on('connection', listner2);

// var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
// console.log(eventListeners + " Listner(s) listening to connection event");
// eventEmitter.emit('connection');
// eventEmitter.removeListener('connection', listner1);
// console.log("Listner1 will not listen now.");
// eventEmitter.emit('connection', "test");
// eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
// console.log(eventListeners + " Listner(s) listening to connection event");

// console.log("Program Ended.");

//-----------------------------------------------------
// var events = require('events');
// var eventEmitter = new events.EventEmitter();

// var connectHandler = function connected() {
//     console.log('connection successful.');
//     eventEmitter.emit('data_received');
// }

// eventEmitter.on('connection', connectHandler);

// eventEmitter.on('data_received', function () {
//     console.log('data received succesfully.');
// });

// eventEmitter.emit('connection');
// console.log("Program Ended");
//-----------------------------------------------------------------
// const https = require('https');
// https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp)=>{
//     let data = '';
//     resp.on('data', (chunk) => {
//         data += chunk;
//     });
//     resp.on('end', () => {
//         console.log(JSON.parse(data).explanation);
//     });
// }).on('error', (err) => {
//     console.log("Error:" + err.message);
// });

//-----------------------------------------------
// var fs = require("fs");
// fs.readFile("note.txt", function(err, data){
//     if (err) {
//         return console.error(err);
//     }
//     console.log(data.toString());
// });
// console.log("Program Ended");