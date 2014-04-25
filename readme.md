#Setup Server

npm install nodejs-websocket

node app.js

#Setup Bookmarklet

Edit index.html --> change "ws://< hostname >:< portname >" to your own host and port.

#Run

0) Go to <host>:<port>/index.html

1) follow the instructions to add all 3 bookmarklets to your browser.

2) open a webpage you want to play with

3) run the BlackOut bookmarklet to blackout words (run multiple times if required)

4) click on the saveDOM bookmarklet and wait for the 'saved' notification.

5) refresh the page (now u see the original page without blackout)

6) click on retrieveDOM bookmarklet. TADA! the saved blackout state is back.


#More

For now it can save just one DOM state at a time. 

Tested with chrome only. 
