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
		socket.emit('text', {text:'Magnus', fontSize:24, textColor:'blue'});

	}
	socket.on('hello', function() {
		console.log(sprintf('%d', ++counter));
	});

	setInterval(runText, 3000);
}

new App();
