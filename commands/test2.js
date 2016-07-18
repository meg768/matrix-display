var Matrix = require('hzeller-matrix');
var matrix = new Matrix({width:32, height:32});

function callback1(){
	return;
	setTimeout(callback2, 6000);
	matrix.runText('callback1',{textColor: 'blue', delay:10}, function() {
		console.log('Scroll Text Complete'); // This works fine too, image does scroll
	});
}
function callback2() {
	console.log('pixel update Complete'); //callback does fire, but image does not work
	matrix.runText('callback2',{textColor: 'green', delay:10}, function(){ //Does not fire/display anything
		console.log('Scroll Text Complete'); //does fire
	});
}

matrix.runText('main',{},callback1); //This works fine

/*
matrix.runText('HELLO!', {}, function(){
	console.log('doneä');
});
*/
