var fs = require("fs");
var url = require('url');

function log(req, res) {
	console.log("Request handler 'log' was called.");
	var search = url.parse(req.url).search;

	fs.appendFile('log.txt', search + "\r\n", function (err) {
		if (err) {      
      res.writeHead(500, {
        'Content-Type' : 'text/plain', 
        'Access-Control-Allow-Origin': '*'
      });
      //res.setHeader("Access-Control-Allow-Origin", "*");
			res.write("0");
			res.end();
			//throw err;
		}
		console.log('The "data to append" was appended to file!');
		res.writeHead(200, {
			'Content-Type' : 'text/plain', 
      'Access-Control-Allow-Origin': '*'
		});
    //res.setHeader("Access-Control-Allow-Origin", "*");
		res.write("1");
		res.end();
	});
}

exports.log = log;