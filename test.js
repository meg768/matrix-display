#!/usr/bin/env node

var fs = require('fs');
var Path = require('path');
var mkpath = require('yow').mkpath;
var sprintf = require('yow').sprintf;
var isObject = require('yow').isObject;
var prefixLogs = require('yow').prefixLogs;



var App = function() {

	prefixLogs();

	var socket = require('socket.io-client')('http://app-o.se:3000/matrix-display');
	var counter = 0;

	function runText() {
		var text = sprintf('%d', ++counter);
		console.log(text);
		socket.emit('text', {text:text, fontSize:24, textColor:'blue'});

	}
	socket.on('disconnect', function() {
		console.log('Disconnected');
	};

	socket.on('hello', function() {

		console.log('Hello!');
	});

	setInterval(runText, 3000);
}

new App();
