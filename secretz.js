const through = require('through2');
const crypto = require('crypto');
const tar = require('tar');
const zlib = require('zlib');

const stream = crypto.createDecipher(process.argv[2], process.argv[3]);
const parser = tar.Parse();

parser.on('entry', function(entry) {
	if (entry.type === "File") {
		var hash = crypto.createHash('md5', { encoding: 'hex' });
		entry.pipe(hash).pipe(through(function(data, _, next) {
			this.push(data.toString() + " " + entry.path + '\n');
			next();
		})).pipe(process.stdout);
	}
});

process.stdin.pipe(stream).pipe(zlib.createGunzip()).pipe(parser);
