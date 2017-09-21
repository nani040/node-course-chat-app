var moment = require('moment');


// var date = moment();
// date.subtract(24,'hour');
// console.log(date.format('MM Do, YYYY'));
// console.log(date.format('h:mm A'));

var createdAt = 0000;
var date = moment(createdAt);
console.log(date.format('h:mm a'));

var date = moment();
console.log(date.format('h:mm a'));


var someTime = moment().valueOf();
console.log(someTime);

var someTimeS = new Date().getTime();
console.log(someTimeS);