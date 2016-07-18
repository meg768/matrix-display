var Matrix = require('hzeller-matrix');
var matrix = new Matrix({width:32, height:32});

function callback1(){

	console.log('Starting callback1...');

	//setTimeout(callback2, 6000);
	matrix.runText('callback1',{textColor: 'blue', delay:10}, function() {
		console.log('Callback1 completed.'); // This works fine too, image does scroll
		callback2();
	});
}
function callback2() {
	console.log('Starting callback2.');

	matrix.runText('callback2', {}, function() { //Does not fire/display anything
		console.log('Callback2 completed'); //does fire
	});
}

matrix.runText('main',{},callback1); //This works fine

/*
matrix.runText('HELLO!', {}, function(){
	console.log('doneä');
});
*/
