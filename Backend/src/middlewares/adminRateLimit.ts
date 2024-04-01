const setAdminRateLimit = require("express-rate-limit");

// Admin Rate limit middleware
// only allow 100 requests per minute
const AdminRateLimit = setAdminRateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "You have exceeded your 100 requests per minute limit.",
  headers: true,
});

module.exports = AdminRateLimit;
