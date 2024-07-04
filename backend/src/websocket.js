// ./src/websocket.js
const WebSocket = require('ws');

const startWebSocketServer = async (strapi) => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('message', (message) => {
      console.log('Received:', message);
      ws.send(message); // Echo the message back to the client
    });
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  console.log('WebSocket server running on ws://localhost:8080');
};

module.exports = startWebSocketServer;
