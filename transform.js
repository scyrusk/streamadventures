const through = require('through2');

const throughWrite = function(buffer, encoding, next) {
	this.push(buffer.toString().toUpperCase());
	next();
}

const throughEnd = function(done) {
	done();
}

const throughStream = through(throughWrite, throughEnd)

process.stdin.pipe(throughStream).pipe(process.stdout);
