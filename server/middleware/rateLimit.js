const rateLimit = require("express-rate-limit");

const reviewRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,

  message: {
    message:
      "Too many review requests. Please try again later."
  },

  standardHeaders: true,
  legacyHeaders: false
});

module.exports = reviewRateLimiter;