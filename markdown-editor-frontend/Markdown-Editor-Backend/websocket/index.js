const { Server } = require("socket.io");
const { processMarkdown } = require("../utils/markdown");

const setupWebSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"], credentials: true },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (payload) => {
      try {
        let parsedPayload = JSON.parse(payload);

        if (!parsedPayload.event || !parsedPayload.data) {
          return socket.emit("error", { message: "Invalid request: Missing 'event' or 'data' field." });
        }

        if (!parsedPayload.data.trim()) {
          return socket.emit("error", { message: "Empty markdown input ignored." });
        }

        if (parsedPayload.event !== "markdown") {
          return socket.emit("error", { message: "Unsupported event type." });
        }

        const safeHtml = processMarkdown(parsedPayload.data);
        socket.emit("markdownUpdate", safeHtml);

      } catch (error) {
        console.error("Invalid JSON format:", error.message);
        socket.emit("error", { message: "Invalid JSON format. Please send a valid JSON object." });
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
};

module.exports = { setupWebSocket };
