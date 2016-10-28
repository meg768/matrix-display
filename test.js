#!/usr/bin/env node

var fs = require('fs');
var Path = require('path');
var mkpath = require('yow').mkpath;
var sprintf = require('yow').sprintf;
var isObject = require('yow').isObject;
var prefixLogs = require('yow').prefixLogs;



var App = function() {

	prefixLogs();


	var socket = require('socket.io-client')('http://app-o.se:3000');

	console.log('Connecting to %s...', url);

	socket.emit('text', {text:'HEJ'});

};

new App();
