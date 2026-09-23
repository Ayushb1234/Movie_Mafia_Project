const express = require("express");

const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie
} = require("../controllers/movieController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const movieValidator = require("../validators/movieValidator");

const router = express.Router();

router.get("/", getMovies);

router.get("/:id", getMovie);

router.post(
  "/",
  protect,
  adminOnly,
  movieValidator.create,
  createMovie
);

router.put(
  "/:id",
  protect,
  adminOnly,
  movieValidator.update,
  updateMovie
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteMovie
);

module.exports = router;