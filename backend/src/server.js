import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messagesRoutes from "./routes/message.route.js"

dotenv.config();
const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

// Essential middleware
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

// Serve static files from frontend build
if (!process.env.VERCEL) {
    // In local development, serve the built frontend
    const frontendPath = path.join(__dirname, "..", "frontend", "dist");
    app.use(express.static(frontendPath));
    
    // Handle React Router - serve index.html for non-API routes
    app.get("/*splat", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

// Export for Vercel
export default app;

// Always run server locally, only skip in Vercel production
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`server is started on ${PORT}`);
    });
}