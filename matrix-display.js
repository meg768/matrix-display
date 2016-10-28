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
var matrix = new Matrix({width:32, height:32});
var Queue = require('./scripts/queue.js');


var App = function() {

	cmd.version('1.0.0');
	cmd.option('-l --log', 'redirect logs to file');
	cmd.option('-h --host <host>', 'connect to specified server', 'app-o.se');
	cmd.option('-p --port <port>', 'connect to specified port (3000)', 3000);
	cmd.parse(process.argv);

	var _queue = new Queue();

	_queue.on('idle', function() {
		console.log('Queue empty, nothing to do.');
	});

	_queue.on('process', function(item, callback) {

		var message = item.message;
		var options = item.options;

		switch (message) {
			case 'text': {
				var text = options.text ? options.text : 'ABC 123';

				if (options.fontName)
					options.fontName = sprintf('%s/%s.ttf', __dirname, options.fontName);

				matrix.runText(text, options, function() {
					console.log('Done with text.');
					callback();
				});
				break;
			}
			case 'perlin': {
				matrix.runPerlin(options, callback);
				break;
			}

			case 'rain': {
				matrix.runPerlin(options, callback);
				break;
			}

			default: {
				console.log('Invalid message: ', message);
				callback();
			}
		}
	});

	prefixLogs();

	if (cmd.log) {
		var date = new Date();
		var path = sprintf('%s/logs', __dirname);
		var name = sprintf('%04d-%02d-%02d-%02d-%02d-%02d.log', date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

		mkpath(path);
		redirectLogs(Path.join(path, name));
	}

	var url = sprintf('http://%s:%d', cmd.host, cmd.port);
	var socket = require('socket.io-client')(url);

	console.log('Connecting to %s...', url);

	socket.on('text', function(options) {
		console.log('Text message');
		console.log(options);
		_queue.push({message:'text', options:options});
	});

	socket.on('rain', function(options) {
		_queue.push({message:'rain', options:options});
	});

	socket.on('perlin', function(options) {
		_queue.push({message:'perlin', options:options});
	});

	socket.on('hello', function(data) {
		var options = {};
		options.service   = 'matrix-display';
		options.messages  = ['text', 'rain', 'perlin'];
		options.events    = [];

		console.log('Registering matrix-display...');
		socket.emit('register', options);
	})

	matrix.runText('Ready');


};

new App();
