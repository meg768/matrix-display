
var args         = require('minimist')(process.argv.slice(2));
var fs           = require('fs');
var sprintf      = require('yow').sprintf;
var isString     = require('yow').isString;
var mkdir        = require('yow').mkdir;
var fileExists   = require('yow').fileExists;
var prefixLogs   = require('yow').prefixLogs;
var redirectLogs = require('yow').redirectLogs;

var App = function() {

	this.run = function() {

		prefixLogs();

		try {

			if (process.argv.length > 2) {
				var match = process.argv[2].match('--(.+)');
				var args = require('minimist')(process.argv.slice(2));


				if (args.log) {
					delete args.log;
					redirectLogs();
				}

				if (match) {
					var cmd = match[1];
					var fileName = sprintf('./commands/%s.js', cmd);

					if (fileExists(fileName)) {
						var Module = require(fileName);
						var module = new Module(args);

						// Execute 'run' method if it has one
						if (typeof module.run == 'function')
							module.run();

					}
					else {
						console.error('Command %s not found.', cmd);
					}

				}

			}
		}
		catch (error) {
			if (false && error instanceof Error) {
				console.error(error.message);
			}
			else {
				console.error((error && error.stack) ? error.stack : error);

			}
			process.exit(-1);
		};
	};
};


var app = new App();
app.run();
