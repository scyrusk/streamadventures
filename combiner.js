const combine = require('stream-combiner');
const through = require('through');
const split = require('split');
const stream = require('stream');
const zlib = require('zlib');

module.exports = function() {
	var currGenre
	var currGenreObj
	var write 
	var tr = through(function(obj) {
		if (obj.length === 0) return;
		obj = JSON.parse(obj)
		if (obj.type === "genre") {
			if (currGenre)
				this.queue(JSON.stringify(currGenreObj) + '\n');
			currGenre = obj.name
			currGenreObj = {
				name: currGenre,
				books: []	
			}
		} else if (obj.type === "book") {
			currGenreObj.books.push(obj.name)
		}
	}, function () {
		this.queue(JSON.stringify(currGenreObj) + '\n');
		this.queue(null);
	});
	return combine(split(), tr, zlib.createGzip());
}
