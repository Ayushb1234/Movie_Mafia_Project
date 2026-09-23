const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    body: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000
    },

    spoiler_flag: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

reviewSchema.index(
  {
    user_id: 1,
    movie_id: 1
  },
  {
    unique: true
  }
);

reviewSchema.index({
  movie_id: 1
});

module.exports = mongoose.model("Review", reviewSchema);