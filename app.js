
var args       = require('minimist')(process.argv.slice(2));
var sprintf    = require('yow').sprintf;
var isString   = require('yow').isString;
var fs         = require('fs');
var mkdir      = require('yow').mkdir;
var fileExists = require('yow').fileExists;

var App = function() {


	function prefixLogs() {
			require('./js/console-prefix.js')(function() {
			var date = new Date();
			return sprintf('%04d-%02d-%02d %02d:%02d.%02d: ', date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
		});
	}

	function redirectLogs() {

		var logFolder = './logs';

		mkdir(logFolder);

		require('./js/console-redirect.js')(function() {
			var date = new Date();
			return sprintf('%s/%04d-%02d-%02d-%02d-%02d.log', logFolder, date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes());
		});

	}

	this.run = function() {

		try {

			if (process.argv.length > 2) {
				var match = process.argv[2].match('--(.+)');
				var args = require('minimist')(process.argv.slice(2));

				prefixLogs();

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
