const stream = require('stream');
const through = require('through2').obj;
const duplexer = require('duplexer2');

module.exports = function(counter) {
	counts = {};
	var tr = through(write, end);
	return duplexer({objectMode : true}, tr, counter);
	
	function write (chunk, _, next) {
		counts[chunk.country] = (counts[chunk.country] || 0) + 1;
		next();
	}

	function end (done) {
		counter.setCounts(counts);
		done();
	}
};
