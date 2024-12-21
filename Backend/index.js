import express from "express";
import cors from "cors";
import connectDB from "./dbConnection.js";
import { createServer } from "http";
import { Server } from "socket.io";

// Importing routers
import studentRouter from "./routes/userRoute.js";
import homeRouter from "./routes/homeRouter.js";
import courseRouter from "./routes/courseRouter.js";
import subjectRouter from "./routes/subjectRouter.js";
import assignmentRouter from "./routes/assignmentRouter.js";

// Importing middleware
import verifyToken from "./middlewares/authMiddleware.js";

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Routes
app.get("/health", (req, res) => {
  res.send("Server is running");
});

app.use("/auth", studentRouter);
app.use("/home", homeRouter);
app.use("/courses", courseRouter);
app.use("/subjects", subjectRouter);
app.use("/assignments", assignmentRouter);

// Create HTTP server and bind Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Socket.IO Connection
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Listen for messages
  socket.on("message", (data) => {
    if (!data || !data.username || !data.text) {
      console.error("Invalid message data received");
      return;
    }

    console.log(`Message from ${data.username}: ${data.text}`);

    // Broadcast structured message
    io.emit("message", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Health check for active WebSocket connections
app.get("/active-connections", (req, res) => {
  const connectedClients = Array.from(io.sockets.sockets.keys());
  res.json({ activeConnections: connectedClients.length, clients: connectedClients });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await io.close();
  process.exit(0);
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
