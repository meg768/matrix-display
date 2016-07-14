var Matrix = require('hzeller-matrix');
var matrix = new Matrix({width:32, height:32});

var Display = function() {

	this.text = function(text) {
		var options = {};
		options.fontName = 'fonts/Arial-Bold.ttf';
		matrix.runText(text, options);
	}

};


module.exports = new Display();
