/*
    Server 
    - stores a DOM string
    - send back a DOM string
    - for now only one string saved at a time.
*/

var ws = require("nodejs-websocket")
var http = require("http")
var fs = require("fs")

http.createServer(function (req, res) {
	fs.createReadStream("home.html").pipe(res)
}).listen(8080)


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
server.listen(8081)

function broadcast(str) {
	server.connections.forEach(function (connection) {
		connection.sendText(str)
	})
}