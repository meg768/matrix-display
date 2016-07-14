
var isArray   = require('./is.js').isArray;
var isNumber  = require('./is.js').isNumber;
var isInteger = require('./is.js').isInteger;
var isFloat   = require('./is.js').isFloat;
var isObject  = require('./is.js').isObject;


var rand = module.exports.rand = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;	
}

	
var choose = module.exports.choose = function(items) {
	return items[Math.floor((Math.random() * items.length))];
}



var random = module.exports.random = function() {
	
	if (arguments.length == 0)
		return Math.random();
		
	if (arguments.length == 1) {
		var arg = arguments[0];
		
		if (isArray(arg)) {
			return choose(arg);
		}
		
		if (isInteger(arg)) {
			return Math.floor(Math.random() * arg);
		}
		
		if (isObject(arg)) {
			return arg[choose(Object.keys(arg))];
		}
	}
		
	if (arguments.length == 2) {
		if (isInteger(arguments[0]) && isInteger(arguments[1])) {
			return rand(arguments[0], arguments[1]);
		}		
	}

	return 42;
	
}





