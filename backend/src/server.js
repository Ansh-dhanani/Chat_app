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


if (!process.env.CLIENT_URL) {
  console.error("CLIENT_URL environment variable is not defined");
  process.exit(1);
}


app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));


app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);



app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

if (!process.env.VERCEL) {

    const frontendPath = path.join(__dirname, "..", "frontend", "dist");
    
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


app.use((err, req, res, next) => {
    console.error("Server error:", err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});



(async ()=>{
    await connectDB();
    if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
        console.log(` Frontend served at: http://localhost:${PORT}`);
        console.log(` API available at: http://localhost:${PORT}/api`);
        console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    });
    }
})();

export default app;