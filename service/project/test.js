let Utils = require('./application/utils');

let dateString = "2017-11-20 14:44:20"
var date = new Date(dateString + "Z");
console.log(date.toLocaleDateString());