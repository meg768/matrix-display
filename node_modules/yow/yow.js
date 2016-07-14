module.exports.sprintf    = require('sprintf-js').sprintf;
module.exports.extend     = require('extend');

module.exports.isType     = require('./src/is.js').isType;
module.exports.isArray    = require('./src/is.js').isArray;
module.exports.isNumber   = require('./src/is.js').isNumber;
module.exports.isString   = require('./src/is.js').isString;
module.exports.isDate     = require('./src/is.js').isDate;
module.exports.isObject   = require('./src/is.js').isObject;
module.exports.isFunction = require('./src/is.js').isFunction;
module.exports.isInteger  = require('./src/is.js').isInteger;
module.exports.isFloat    = require('./src/is.js').isFloat;

module.exports.random     = require('./src/random.js').random;
	
module.exports.sprintf    = require("sprintf-js").sprintf; 
module.exports.extend     = require('extend'); 

module.exports.Events     = require('./src/events.js'); 

module.exports.mkdir      = require('./src/fs.js').mkdir;
module.exports.mkpath     = require('./src/fs.js').mkpath;
module.exports.fileExists = require('./src/fs.js').fileExists;
module.exports.readJSON   = require('./src/fs.js').readJSON;
module.exports.writeJSON  = require('./src/fs.js').writeJSON;

