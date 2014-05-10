fs = require("fs");
var path = require('path');

var servePublicFiles = function (pathname, response, request) {

	fs.exists(path.join(__dirname, pathname), function (exists) {

		if (exists) {

			/*Is pathname is directory, append index.html to pathname*/
			var isDirectory = fs.lstatSync(path.join(__dirname, pathname)).isDirectory();
      
      /*if directory, serve index.html of the directory.*/
			if (isDirectory) {
				pathname += "/index.html";
        servePublicFiles(pathname, response, request);
        return; //return here after a recursive call 
			}

			response.writeHead(200, {
				'Content-Type' : ''
			});
			fs.createReadStream('.' + pathname);
			var stream = fs.createReadStream('.' + pathname).pipe(response);
		} 
    else {
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