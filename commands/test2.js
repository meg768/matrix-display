var Matrix = require('hzeller-matrix');
var matrix = new Matrix({width:32, height:32});
/*

var schedule = require('node-schedule');

function callback1() {
	matrix.runText('X');
}

function callback2() {
	matrix.runText('Y');
}

//7setTimeout(callback1, 5000);
//setTimeout(callback2, 15000);

var rule    = new schedule.RecurrenceRule();
rule.second = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

schedule.scheduleJob(rule, function() {
	console.log('...');
	callback1();
});
*/

function callback1(){
setTimeout(callback2, 6000);
matrix.runText('callback1',{textColor: 'blue', delay:10}, function(){
console.log('Scroll Text Complete'); // This works fine too, image does scroll
});
}
function callback2(){
console.log('pixel update Complete'); //callback does fire, but image does not work
matrix.runText('callback2',{textColor: 'green', delay:10}, function(){ //Does not fire/display anything
console.log('Scroll Text Complete'); //does fire
});
}
matrix.runText('main',{},callback1); //This works fine
