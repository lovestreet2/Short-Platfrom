import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5173; // ✅ FIXED PORT

const __dirname = path.resolve();

// --------------------------
// 🔥 CORS FIX FOR LOCAL + RENDER
// --------------------------
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// --------------------------a
// Middleware
// --------------------------
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// --------------------------
// API Routes
// --------------------------
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

// --------------------------
// Serve Frontend (Production)
// --------------------------
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// --------------------------
// Start Server
// --------------------------
server.listen(PORT, () => {
  connectDB();

  const localURL = `http://localhost:${PORT}`;
  const renderURL = process.env.RENDER_EXTERNAL_URL || "Render URL not set";

  console.log("==========================================");
  console.log(`🚀 Server running at port ${PORT}`);
  console.log(`🔗 Local URL: ${localURL}`);
  console.log(`🌐 Render Public URL: ${renderURL}`);
  console.log("==========================================");
});

