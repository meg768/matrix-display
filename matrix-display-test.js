#!/usr/bin/env node

var fs = require('fs');
var Path = require('path');
var mkpath = require('yow').mkpath;
var sprintf = require('yow').sprintf;
var isObject = require('yow').isObject;
var prefixLogs = require('yow').prefixLogs;



var App = function() {

	prefixLogs();

	var matrix = require('socket.io-client')('http://app-o.se:3000/matrix-display');
	var tellstick = require('socket.io-client')('http://app-o.se:3000/tellstick');
	var counter = 0;

	function runText() {
		var text = sprintf('%d', ++counter);
		console.log(text);
		matrix.emit('text', {text:text, fontSize:24, textColor:'blue'});

	}

	tellstick.on('tellstick', function(device) {
		if (device.name == 'RV-01') {
			matrix.emit('text', {text:'Movement', fontSize:24, textColor:'red'});
		}

	});

	matrix.on('connect', function() {
		console.log('Connected');
	});

	matrix.on('disconnect', function() {
		console.log('Disconnected');
	});

	matrix.on('hello', function() {

		console.log('Hello!');
	});
	matrix.on('helloX', function() {

		console.log('HelloX!');
	});

	setInterval(runText, 6000);
}

new App();
