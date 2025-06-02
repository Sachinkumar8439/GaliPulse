// Package imports
const express = require("express");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const { createServer } = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Initialize app and environment
const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());

// Files import
const SocketConnection = require("./controllers/socket");
const route = require("./routes/route");
const databaseConnect = require("./configue/database");

// Database connection
databaseConnect();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Corrected the typo
  })
);

// Routes
app.use("/galipulse/app-1.0", route);

app.get("/", (req, res) => {
  res.send("Hello User");
});

// Server listening
const server = createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("server started at:", PORT);
});

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Corrected the typo
  },
});

io.on("connection", SocketConnection);
