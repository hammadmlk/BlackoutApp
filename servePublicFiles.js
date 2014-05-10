fs = require("fs");
var path = require('path');

var servePublicFiles = function (pathname, response, request) {
	pathname = "/public" + pathname;

	fs.exists(path.join(__dirname, pathname), function (exists) {

		var isDirectory = false;
		if (exists) {
			isDirectory = fs.lstatSync(path.join(__dirname, pathname)).isDirectory();
		}

		if (exists && !isDirectory) {
			response.writeHead(200, {
				'Content-Type' : ''
			});
			fs.createReadStream('.' + pathname);
			var stream = fs.createReadStream('.' + pathname).pipe(response);
		} else {
			console.log("No request handle or static file found for " + pathname);
			response.writeHead(404, {
				"Content-Type" : "text/html"
			});
			response.write("404 not found");
			response.end();
		}
	});
};

module.exports = servePublicFiles;