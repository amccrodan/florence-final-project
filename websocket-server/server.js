// server.js

const express = require('express');
const WebSocket = require('ws');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

// Broadcast to all clients
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Send only to master station
wss.sendToFlorence = function sendToFlorence(id, data) {
  wss.clients.forEach(function each(client) {
    if (client.florenceId === id) {
      client.send(data);
    }
  });
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.send(JSON.stringify({
    message: "Hello from server!"
  }));

  ws.on('message', function incoming(message) {
    const receivedMsg = JSON.parse(message);
    console.log(receivedMsg);

    switch(receivedMsg.type) {
      case 'refreshRequests':
        // tell nurse station to get all requests
        wss.sendToFlorence("master", JSON.stringify(receivedMsg));
        console.log(`Sending ${receivedMsg} to master.`);
        break;
      case 'updateRequest':
        // tell nurse station to update one request status? Maybe for scaling
        // tell specific bed to update request
        wss.sendToFlorence(receivedMsg.bed_id, JSON.stringify(receivedMsg));
        break;
      case 'assignId':
        ws.florenceId = receivedMsg.id
        ws.send(JSON.stringify({message: `Your connection ID is ${ws.florenceId}`}))
        break;
      default:
        console.log(`Unknown message type: ${receivedMsg.type}`)
    }

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    });
});
