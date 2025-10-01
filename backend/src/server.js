import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messagesRoutes from "./routes/message.route.js"

dotenv.config();
const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

// Add middleware for parsing JSON
app.use(express.json());

// Add CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

// Remove the static file serving - Vercel handles this through routes
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
//     app.get((req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     });
// }

// For Vercel serverless functions, export the app
export default app;

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`server is started on ${PORT}`);
    });
}