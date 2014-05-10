#Setup

##Run Server

- install nodejs
- pull code to {your_directory}
- cd {your_directory}
- npm install nodejs-websocket
- node app.js
- The html server is now running on port 5002
- The ws server is ow running on port 5003

##About HTML Server
- Serves static file from /public directory

##About WS Server
- WebsocketServer: saves and send DOM strings

## Bookmarklet Setup
- Edit public/index.html --> change "ws://< hostname >:< portname >" to your own host and port.


#How to use

0) Go to <host>:<port>/indexold.html

1) follow the instructions to add all 3 bookmarklets to your browser.

2) open a webpage you want to play with

3) run the BlackOut bookmarklet to blackout words

4) click on the saveDOM bookmarklet and wait for the 'saved' notification.

5) refresh the page (now u see the original page without blackout)

6) click on retrieveDOM bookmarklet. TADA! the saved blackout state is back.


#Notes

For now the WS server can save just one DOM state at a time. 

Tested with chrome only. 
