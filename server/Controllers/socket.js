const { Server } = require("socket.io");

/**
 * Initialize Socket.io and handle events
 * @param {Object} server - HTTP server instance
 */
const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  console.log("Socket.io initialized");

 
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

   
    socket.on("chat:message", (message) => {
      console.log(`Message received: ${message}`);
      io.emit("chat:message", message); 
    });

  
    socket.on("custom:event", (data) => {
      console.log("Custom event received:", data);
      socket.emit("custom:event:response", { success: true, data });
    });

  
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

module.exports = { initSocket };
