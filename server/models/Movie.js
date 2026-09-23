const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },

    synopsis: {
      type: String,
      default: "",
      maxlength: 5000
    },

    poster_url: {
      type: String,
      default: ""
    },

    release_year: {
      type: Number,
      min: 1888,
      max: 2100
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Movie", movieSchema);