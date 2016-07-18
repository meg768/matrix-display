var Matrix = require('hzeller-matrix');
var matrix = new Matrix({width:32, height:32});

function callback1() {
	// setTimeout(callback2, 6000);
	matrix.runText('callback1',{textColor: 'blue', delay:10}, function(){
		console.log('Scroll Text Complete');
		callback2();
	});
}

function callback2(){
	console.log('pixel update Complete');
	matrix.runText('callback2',{textColor: 'green', delay:10}, function(){
		console.log('Scroll Text Complete');
	});
}
matrix.runText('main',{},callback1);
