import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messagesRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors"

dotenv.config();
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// Validate required environment variables
if (!process.env.CLIENT_URL) {
  console.error("❌ CLIENT_URL environment variable is not defined");
  process.exit(1);
}

// CORS middleware (must be early for preflight requests)
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Essential middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);


// Basic health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Serve frontend static files (for both development and production)
if (!process.env.VERCEL) {
    // Path to frontend dist folder
    const frontendPath = path.join(__dirname, "..", "frontend", "dist");
    
    // Serve static files first
    app.use(express.static(frontendPath));
    
    // Handle React Router - serve index.html for all non-API routes
    app.use((req, res, next) => {
        if (req.path.startsWith('/api/')) {
            return next();
        }
        res.sendFile(path.join(frontendPath, "index.html"), (err) => {
            if (err) {
                res.status(404).json({ message: "Frontend not available" });
            }
        });
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Server error:", err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Start server (only in non-Vercel environment)

(async ()=>{
    await connectDB();
    if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📱 Frontend served at: http://localhost:${PORT}`);
        console.log(`🔗 API available at: http://localhost:${PORT}/api`);
        console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
    }
})();

export default app;