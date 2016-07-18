var Matrix = require('hzeller-matrix');
var matrix = new Matrix({width:32, height:32});

var schedule = require('node-schedule');

function callback1() {
	matrix.drawText('X');
}

function callback2() {
	matrix.drawText('Y');
}

//7setTimeout(callback1, 5000);
//setTimeout(callback2, 15000);

var rule    = new schedule.RecurrenceRule();
rule.second = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

schedule.scheduleJob(rule, function() {
	console.log('...');
	callback1();
});
