const express = require("express");

const {
  getReviews,
  createOrUpdateReview,
  deleteReview
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");
const reviewRateLimiter = require("../middleware/rateLimit");

const reviewValidator = require("../validators/reviewValidator");

const router = express.Router();

router.get(
  "/movies/:movieId/reviews",
  getReviews
);

router.post(
  "/movies/:movieId/reviews",
  protect,
  reviewRateLimiter,
  reviewValidator.create,
  createOrUpdateReview
);

router.delete(
  "/reviews/:id",
  protect,
  deleteReview
);

module.exports = router;