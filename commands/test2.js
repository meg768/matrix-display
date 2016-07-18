var Matrix = require('hzeller-matrix');
var matrix = new Matrix({width:32, height:32});

var schedule = require('node-schedule');

function callback1() {
	matrix.runText('callback1');
}

function callback2() {
	matrix.runText('callback2');
}

//setTimeout(callback1, 1000);
//setTimeout(callback2, 6000);

var rule    = new schedule.RecurrenceRule();
rule.second = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

schedule.scheduleJob(rule, function() {
	console.log('...');
});
