import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
// import cookieParser from "cookie-parser"
dotenv.config();
// VibeNest

/// importing routes
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import { connectDb } from "./lib/db.js";

const app = express();
app.use(cors({
  origin: "http://localhost:6020",
  credentials: true
} ));
const __dirname = path.resolve();

app.use(clerkMiddleware()); // this will add auth to req object => req.auth.userID

/// file upload....
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : err.message,
    });
});

const PORT = process.env.PORT || 8020;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});

// todo: socket.io
