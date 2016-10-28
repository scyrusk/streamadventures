const http = require('http');
const through = require('through2');

const server = http.createServer(function(req, res) {
	if (req.method === "POST") {
		req.pipe(through(function(line, _, next) {
			this.push(line.toString().toUpperCase());
			next();	
		})).pipe(res);
	}
});
server.listen(process.argv[2]);
