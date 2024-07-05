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
        ws.send(messageString);
      });

      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });

    console.log("WebSocket server running on ws://localhost:8080");
  },
};
