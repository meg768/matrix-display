var schedule = require('node-schedule');
var sprintf  = require('yow').sprintf;
var Promise  = require('bluebird');
var Matrix   = require('../js/matrix.js');

var Module = module.exports = function() {

	var RequestAPI = require('rest-request');
	var yahoo      = new RequestAPI('https://query.yahooapis.com');

	function getQuote(ticker) {
		var options = {};

		options.q        = 'select * from yahoo.finance.quotes where symbol =  "' + ticker + '"';
		options.format   = 'json';
		options.env      = 'store://datatables.org/alltableswithkeys';
		options.callback = '';

		yahoo.get('v1/public/yql', options).then(function(data) {
			var quotes = data.query.results.quote;

			if (typeof qoutes != 'Array')
				quotes = [quotes];

			var text = sprintf(ticker, '=', quotes[0].LastTradePriceOnly);
			Matrix.runText(text);

		})

		.catch (function(error) {
			console.log(error);

		});

	}


	this.run = function() {
		console.log('sadf');
		getQuote('AAPL');

	}
}
