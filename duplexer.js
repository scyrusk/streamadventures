const duplexer = require('duplexer2');

var spawn = require('child_process').spawn;

module.exports = function(cmd, args) {
	const process = spawn(cmd, args);
	return duplexer(process.stdin, process.stdout);		
};
