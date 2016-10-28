const through = require('through2');
const split = require('split');

var lineNum = 1;
process.stdin.pipe(split()).pipe(through(function(line, _, next) {
	var lineStr = line.toString();
	this.push((lineNum++ % 2 == 0) ? lineStr.toUpperCase() : lineStr.toLowerCase());
	this.push('\n');
	next();
})).pipe(process.stdout);
