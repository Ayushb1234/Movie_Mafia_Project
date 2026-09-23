const mongoose = require("mongoose");

const Movie = require("../models/Movie");
const Review = require("../models/Review");
const asyncHandler = require("../utils/asyncHandler");

const getMovies = asyncHandler(async (req, res) => {
  const { search = "", sort = "newest" } = req.query;

  const movieFilter = {};

  if (search.trim()) {
    movieFilter.title = {
      $regex: search.trim(),
      $options: "i"
    };
  }

  let sortStage = { createdAt: -1 };

  if (sort === "title") {
    sortStage = { title: 1 };
  }

  const movies = await Movie.find(movieFilter)
    .populate("created_by", "username")
    .lean();

  const movieIds = movies.map((movie) => movie._id);

  const ratingData = await Review.aggregate([
    {
      $match: {
        movie_id: {
          $in: movieIds
        }
      }
    },
    {
      $group: {
        _id: "$movie_id",
        averageRating: {
          $avg: "$rating"
        },
        reviewCount: {
          $sum: 1
        }
      }
    }
  ]);

  const ratingMap = new Map();

  for (const item of ratingData) {
    ratingMap.set(item._id.toString(), {
      averageRating: Number(item.averageRating.toFixed(1)),
      reviewCount: item.reviewCount
    });
  }

  const result = movies.map((movie) => {
    const stats = ratingMap.get(movie._id.toString()) || {
      averageRating: 0,
      reviewCount: 0
    };

    return {
      ...movie,
      averageRating: stats.averageRating,
      reviewCount: stats.reviewCount
    };
  });

  if (sort === "rating") {
    result.sort((a, b) => {
      if (b.averageRating !== a.averageRating) {
        return b.averageRating - a.averageRating;
      }

      return b.reviewCount - a.reviewCount;
    });
  } else if (sort === "title") {
    result.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else {
    result.sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  res.status(200).json({
    count: result.length,
    movies: result
  });
});

const getMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid movie ID"
    });
  }

  const movie = await Movie.findById(id)
    .populate("created_by", "username")
    .lean();

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found"
    });
  }

  const stats = await Review.aggregate([
    {
      $match: {
        movie_id: movie._id
      }
    },
    {
      $group: {
        _id: "$movie_id",
        averageRating: {
          $avg: "$rating"
        },
        reviewCount: {
          $sum: 1
        }
      }
    }
  ]);

  const averageRating =
    stats.length > 0
      ? Number(stats[0].averageRating.toFixed(1))
      : 0;

  const reviewCount =
    stats.length > 0
      ? stats[0].reviewCount
      : 0;

  res.status(200).json({
    movie: {
      ...movie,
      averageRating,
      reviewCount
    }
  });
});

const createMovie = asyncHandler(async (req, res) => {
  const {
    title,
    synopsis,
    poster_url,
    release_year
  } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: "Movie title is required"
    });
  }

  const movie = await Movie.create({
    title: title.trim(),
    synopsis: synopsis || "",
    poster_url: poster_url || "",
    release_year,
    created_by: req.user.sub
  });

  const populatedMovie = await Movie.findById(movie._id)
    .populate("created_by", "username");

  res.status(201).json({
    message: "Movie created successfully",
    movie: populatedMovie
  });
});

const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid movie ID"
    });
  }

  const {
    title,
    synopsis,
    poster_url,
    release_year
  } = req.body;

  const movie = await Movie.findById(id);

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found"
    });
  }

  if (title !== undefined) {
    if (!title.trim()) {
      return res.status(400).json({
        message: "Movie title cannot be empty"
      });
    }

    movie.title = title.trim();
  }

  if (synopsis !== undefined) {
    movie.synopsis = synopsis;
  }

  if (poster_url !== undefined) {
    movie.poster_url = poster_url;
  }

  if (release_year !== undefined) {
    movie.release_year = release_year;
  }

  await movie.save();

  const updatedMovie = await Movie.findById(movie._id)
    .populate("created_by", "username");

  res.status(200).json({
    message: "Movie updated successfully",
    movie: updatedMovie
  });
});

const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid movie ID"
    });
  }

  const movie = await Movie.findById(id);

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found"
    });
  }

  await Review.deleteMany({
    movie_id: movie._id
  });

  await movie.deleteOne();

  res.status(200).json({
    message: "Movie and its reviews deleted successfully"
  });
});

module.exports = {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie
};