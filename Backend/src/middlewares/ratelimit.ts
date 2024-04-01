const setRateLimit = require("express-rate-limit");

// Rate limit middleware
// only allow 5 requests per minute
const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "You have exceeded your 5 requests per minute limit.",
  headers: true,
});

module.exports = rateLimitMiddleware;
