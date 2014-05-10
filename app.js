/*
    Server 
    - stores a DOM string
    - send back a DOM string
    - for now only one string saved at a time.
*/

var ws = require("nodejs-websocket");
var http = require("http");
var url = require("url");
var servePublicFiles = require("./servePublicFiles");
var requestHandlers = require("./requestHandlers");

/*request handlers */
handle=[];
handle["/log"] = requestHandlers.log;

/*The html server. Serves files from public directory*/
http.createServer(function (req, res) {
	var pathname = url.parse(req.url).pathname;
	console.log("\n> Request for " + pathname + " received.");

	//if handler exists, call it
	if (typeof handle[pathname] === 'function') {
		handle[pathname](req, res);
	}
	// if no handler, call servePublicFiles
	else {
		pathname = "/public" + pathname;
		servePublicFiles(pathname, res, req);
	}
}).listen(5002)

/*The websocket server*/
var DOMString;

var server = ws.createServer(function (connection) {
  connection.on("text", function (str) {		
    if(str[0]=='s'){
      console.log('command: s')
      DOMString = str.substr(1)
      //console.log(DOMString)
      connection.sendText("Saved")
    }
    else if(str[0]=='r'){
      console.log('command: r')
      connection.sendText(DOMString)
    }
    else{
      console.log('Not recognized command')
    }
    
	})
	connection.on("close", function () {
		console.log('closed')
	})
  connection.on("error", function () {
		//console.log('closed')
	})
})
server.listen(5003)

function broadcast(str) {
	server.connections.forEach(function (connection) {
		connection.sendText(str)
	})
}