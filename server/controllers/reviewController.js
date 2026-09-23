const mongoose = require("mongoose");

const Review = require("../models/Review");
const Movie = require("../models/Movie");
const asyncHandler = require("../utils/asyncHandler");

const getReviews = asyncHandler(async (req, res) => {
  const { movieId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({
      message: "Invalid movie ID"
    });
  }

  const movie = await Movie.findById(movieId);

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found"
    });
  }

  const reviews = await Review.find({
    movie_id: movieId
  })
    .populate("user_id", "username role")
    .sort({
      createdAt: -1
    });

  res.status(200).json({
    count: reviews.length,
    reviews
  });
});

const createOrUpdateReview = asyncHandler(
  async (req, res) => {
    const { movieId } = req.params;
    const {
      rating,
      body,
      spoiler_flag
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID"
      });
    }

    if (
      rating === undefined ||
      Number(rating) < 1 ||
      Number(rating) > 5
    ) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5"
      });
    }

    if (!body || !body.trim()) {
      return res.status(400).json({
        message: "Review body is required"
      });
    }

    if (body.trim().length > 5000) {
      return res.status(400).json({
        message: "Review cannot exceed 5000 characters"
      });
    }

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    const review = await Review.findOneAndUpdate(
      {
        user_id: req.user.sub,
        movie_id: movieId
      },
      {
        rating: Number(rating),
        body: body.trim(),
        spoiler_flag: Boolean(spoiler_flag)
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }
    ).populate("user_id", "username role");

    res.status(200).json({
      message: "Review saved successfully",
      review
    });
  }
);

const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid review ID"
    });
  }

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({
      message: "Review not found"
    });
  }

  const isOwner =
    review.user_id.toString() === req.user.sub;

  const isAdmin =
    req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return res.status(403).json({
      message: "You can only delete your own review"
    });
  }

  await review.deleteOne();

  res.status(200).json({
    message: "Review deleted successfully"
  });
});

module.exports = {
  getReviews,
  createOrUpdateReview,
  deleteReview
};