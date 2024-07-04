// path: src/middlewares/websocket.js

module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
      await next();
  
      // Optionally, you can integrate WebSocket logic here
      // For example, sending a notification to WebSocket clients
      if (ctx.path.startsWith('/api/messages') && ctx.method === 'POST') {
        // You can add logic to notify WebSocket clients of new messages
      }
    };
  };
  