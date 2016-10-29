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


	socket.on('hello', function() {
		console.log('Hello');
	});

	socket.emit('text', {text:'Magnus', fontSize:30, textColor:'blue'});
	socket.emit('text', {text:'Egelberg'});
	socket.emit('text', {text:'Nyheter från Google', textColor:'green'});
	socket.emit('text', {text:'Klar!'});
}

new App();
