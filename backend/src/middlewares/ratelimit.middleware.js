import rateLimit from 'express-rate-limit';

// Simple rate limiter for auth endpoints
const authLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per minute
    message: {
        error: "Too many requests, please try again later."
    }
});

export { authLimiter };
