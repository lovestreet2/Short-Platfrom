import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js"; // your socket.io server
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5173;
const __dirname = path.resolve();

// --------------------------
// CORS setup
// --------------------------
const allowedOrigins = [
  "http://localhost:8000",
  "https://short-platfrom.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        return callback(
          new Error(`CORS policy does not allow origin: ${origin}`),
          false
        );
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// --------------------------
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
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

// --------------------------
// Start Server
// --------------------------
server.listen(PORT, async () => {
  await connectDB();

  console.log("==========================================");
  console.log(`🚀 Server running at port ${PORT}`);
  console.log(`🔗 Local URL: http://localhost:${PORT}`);
  console.log(`🌐 Render Public URL: ${process.env.RENDER_EXTERNAL_URL || "N/A"}`);
  console.log("==========================================");
});
