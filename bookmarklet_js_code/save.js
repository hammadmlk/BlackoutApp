/*
save DOM bookmarklet code
 */

javascript:(function () {
	var markup = document.documentElement.outerHTML;
	/*console.log(markup)*/
	var connection = new WebSocket("ws://localhost:8081");
	connection.onopen = function () {
		console.log("Connection opened");
		connection.send('s' + markup);
	};
	connection.onclose = function () {
		console.log("Connection closed");
	};
	connection.onerror = function () {
		console.error("Connection error");
	};
	connection.onmessage = function (event) {
		console.log(event.data);
		alert(event.data);
	};
})();
