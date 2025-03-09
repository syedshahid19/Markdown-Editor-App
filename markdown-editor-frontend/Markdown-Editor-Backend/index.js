const express = require("express");
const cors = require("cors");
const http = require("http");
const { setupWebSocket } = require("./websocket/index");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({ origin: "https://markdown-editor-app-delta.vercel.app", credentials: true }));
app.use(express.json());

// Start WebSocket Server
setupWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server Successfully Started at ${PORT}`);
});
