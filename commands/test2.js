var Matrix = require('hzeller-matrix');
var matrix = new Matrix({width:32, height:32});

/*
matrix.runText = function(text, options, cb) {
	console.log('runText:', text);
	cb();
}
*/

function callback1() {
 	//setTimeout(callback2, 6000);
	matrix.runText('callback1',{textColor: 'blue', delay:10}, function(){
		console.log('callback1 Text Complete');
	});
}

function callback2(){
	console.log('pixel update Complete');
	matrix.runText('callback2',{textColor: 'green', delay:10}, function(){
		console.log('callback2 Text Complete');
	});
}

function main() {
	matrix.runText('main');

}
setTimeout(main, 100);
setTimeout(callback1, 4000);
setTimeout(callback2, 8000);
