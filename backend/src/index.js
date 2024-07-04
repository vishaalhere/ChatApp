"use strict";
const WebSocket = require("ws");

module.exports = {
  register(/*{ strapi }*/) {},

  bootstrap({ strapi }) {
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on("connection", (ws) => {
      console.log("New client connected");

      ws.on("message", (message) => {
        const messageString = message.toString();
        console.log("Received:", messageString);

        // Simulate a delay before sending the message back
        setTimeout(() => {
          ws.send(messageString);
        }, 1000); // 1-second delay
      });

      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });

    console.log("WebSocket server running on ws://localhost:8080");
  },
};
