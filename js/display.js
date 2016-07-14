var Matrix = require('hzeller-matrix');
var matrix = new Matrix({width:32, height:32});

var Display = function() {

	this.text = function(text) {
		matrix.runText(text, {fontName: 'fonts/Arial-Black.ttf'});
	}

};


module.exports = new Display();
