/*
Retrieve DOM bookmarklet code
 */

javascript:(function () {
	var connection = new WebSocket("ws://localhost:8081");
	connection.onopen = function () {
		console.log("Connection opened");
		connection.send('r');
	};
	connection.onclose = function () {
		console.log("Connection closed");
	};
	connection.onerror = function () {
		console.error("Connection error");
	};
	connection.onmessage = function (event) {
		console.log("DOM received");
		document.documentElement.innerHTML = event.data;
	};
})();
