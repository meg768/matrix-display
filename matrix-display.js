#!/usr/bin/env node

var fs = require('fs');
var Path = require('path');
var mkpath = require('yow').mkpath;
var sprintf = require('yow').sprintf;
var isObject = require('yow').isObject;
var redirectLogs = require('yow').redirectLogs;
var prefixLogs = require('yow').prefixLogs;
var cmd = require('commander');
var Matrix = require('hzeller-matrix');
var Queue = require('./scripts/queue.js');

var FakeMatrix = function() {

	function fake() {

	};

	this.isRunning = function() {
		return false;
	}

	this.stop = function() {
		console.log('stop');
	};

	this.runText = function(text, options, callback) {
		console.log('runText:', text, JSON.stringify(options));
		setTimeout(callback, 1000);
	};


	this.runImage = function(image, options, callback) {
		console.log('runImage:', image, JSON.stringify(options));
		setTimeout(callback, 1000);
	};

	this.runAnimation = function(animation, options, callback) {
		console.log('runAnimation:', animation, JSON.stringify(options));
		setTimeout(callback, 1000);
	};

	this.runRain = function(options, callback) {
		console.log('runRain:', JSON.stringify(options));
		setTimeout(callback, 1000);
	};

	this.runPerlin = function(options, callback) {
		console.log('runPerlin:', JSON.stringify(options));
		setTimeout(callback, 1000);
	};

};


var App = function() {

	var _queue  = undefined;
	var _matrix = undefined;



	function createQueue() {
		var queue = new Queue();

		queue.on('idle', function() {
			console.log('Queue empty, nothing to do.');
		});

		queue.on('process', function(item, callback) {

			var message = item.message;
			var options = item.options;

			console.log('Running', message, JSON.stringify(options));

			switch (message) {
				case 'text': {
					var text = options.text ? options.text : 'ABC 123';

					if (options.fontName)
						options.fontName = sprintf('%s/%s.ttf', __dirname, options.fontName);

					_matrix.runText(text, options, function() {
						console.log('Done with text.');
						callback();
					});
					break;
				}
				case 'perlin': {
					_matrix.runPerlin(options, callback);
					break;
				}

				case 'emoji': {
					if (!options.id || options.id < 1 || options.id > 846)
						options.id = 704;

					var image = sprintf('%s/images/emojis/%d.png', __dirname, options.id);
					_matrix.runImage(image, options, callback);

					break;
				}

				case 'animation': {
					if (!options.name)
						options.name = 'pacman';

					var image = sprintf('%s/animations/%s.gif', __dirname, options.name);
					_matrix.runAnimation(image, options, callback);

					break;
				}

				case 'rain': {
					_matrix.runPerlin(options, callback);
					break;
				}

				default: {
					console.log('Invalid message: ', message);
					callback();
				}
			}

		});

		return queue;

	}

	function runMatrix(message, options) {

		if (options == undefined)
			options = {};

		if (_queue == undefined)
			_queue = createQueue();

		if (options.priority == 'high') {
			_matrix.stop(function() {
				_queue = createQueue();
				_queue.push({message:message, options:options});

			});
		}
		else if (priority == 'low') {
			if (!_matrix.isRunning()) {
				_queue.push({message:message, options:options});
			}
		}
		else
			_queue.push({message:message, options:options});
	}

	function run() {

		cmd.version('1.0.0');
		cmd.option('-l --log', 'redirect logs to file');
		cmd.option('-h --host <host>', 'connect to specified server', 'app-o.se');
		cmd.option('-p --port <port>', 'connect to specified port (3000)', 3000);
		cmd.option('-f --fakeit', 'do not access matrix hardware', false);
		cmd.parse(process.argv);

		prefixLogs();

		if (cmd.log) {
			var date = new Date();
			var path = sprintf('%s/logs', __dirname);
			var name = sprintf('%04d-%02d-%02d-%02d-%02d-%02d.log', date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

			mkpath(path);
			redirectLogs(Path.join(path, name));
		}

		_queue  = createQueue();
		_matrix = cmd.fakeit ? new FakeMatrix() : new Matrix({width:32, height:32});

		var url = sprintf('http://%s:%d/matrix-display-provider', cmd.host, cmd.port);
		var socket = require('socket.io-client')(url);

		console.log('Connecting to %s...', url);

		socket.on('text', function(options) {
			runMatrix('text', options);
		});

		socket.on('animation', function(options) {
			runMatrix('animation', options);
		});

		socket.on('emoji', function(options) {
			runMatrix('emoji', options);
		});

		socket.on('rain', function(options) {
			runMatrix('rain', options);
		});

		socket.on('perlin', function(options) {
			runMatrix('perlin', options);
		});

		socket.on('hello', function(data) {
			console.log('hello');
		})

		_matrix.runText('Ready');

		console.log('Started.');

	}

	run();

};

new App();
