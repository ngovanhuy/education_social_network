// createGroupEventRequest = {
//     //Event Info of all events create
//     title: String,
//     content: String,
//     userCreate: {},
//     eventImageID: Number,
//     location: String,
//     contextData: {},
//     context: {},
//     isAllDay: Boolean,
//     startTime: Date,//default minDate in options
//     endTime: Date, //default maxDate in options
//     timeCreate: Date,
//     //Recurrent
//     options: {
//         years: [{
//             minDate: Date,
//             maxDate: Date,
//             dates: [
//                 { date: { startTime, endTime } }//
//             ],
//             ignores: [Number],//[xxxx..yyyy]
//             increment: Number,//year+=increment
//         }],
//         months: [{
//             minDate: Date,
//             maxDate: Date,
//             dates: [
//                 { date: { startTime, endTime } },//date[1..31]
//             ],
//             ignores: [Number],//[0..11]
//             increment: Number,//month +=increment
//         }],
//         weeks: [{
//             minDate: Date,
//             maxDate: Date,
//             days: [
//                 { day: { startTime, endTime } },//[0..6]->[su->sa]
//             ],
//             increment: Number,//week+=increment
//         }],
//         days:[{
//             minDate: Date,
//             maxDate: Date,
//             startTime: Date,//only getTime
//             endTime: Date, //only getTime
//             ignore: [Number],//[1..31]
//             increment: Number,//day +=increment
//         }]
//     }
// }
let fs = require('fs');
let moment = require('moment');
fs.readFile("I:/Temp/events2.json", "utf8", function(error, data) {
    if (error) return;
    try {
        let events = JSON.parse(data);
        let options = events.options;
        console.log(options);
    } catch(error) {
        return;
    }
});