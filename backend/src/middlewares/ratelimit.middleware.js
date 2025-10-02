import rateLimit from 'express-rate-limit';

// Simple rate limiter for auth endpoints
const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 1 minute
    max: 10, // limit each IP to 5 requests per minute
    message: {
        error: "Too many requests, please try again later."
    }
});

export { authLimiter };
