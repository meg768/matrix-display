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



var App = function() {

	cmd.version('1.0.0');
	cmd.option('-l --log', 'redirect logs to file');
	cmd.option('-h --host <host>', 'connect to specified server', 'localhost');
	cmd.option('-p --port <port>', 'connect to specified port', 3001);
	cmd.parse(process.argv);
/*
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

	socket.on('text', function(args) {
		matrix.runText(args.text, args);
	});


	socket.on('hello', function(data) {
		var options = {};
		options.service   = 'matrix-display';
		options.messages  = ['text'];
		options.events    = [];

		console.log('Registering matrix-display...');
		socket.emit('register', options);
	})
*/

	var options = {};
	options.fontName = __dirname + '/fonts/Arial-Bold.ttf';
	options.delay    = 8;
	matrix.runText('Ready', options);


};

new App();
