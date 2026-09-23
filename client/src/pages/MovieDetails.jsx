import {
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

import {
  deleteReview,
  getMovie,
  getReviews
} from "../api/api";

import { useAuth } from "../context/AuthContext";

import StarRating from "../components/StarRating";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";

const MovieDetails = () => {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const {
    user,
    isAdmin
  } = useAuth();

  const [movie, setMovie] =
    useState(null);

  const [reviews, setReviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadMovie = async () => {
    try {
      const data =
        await getMovie(id);

      setMovie(data.movie);
    } catch (err) {
      setError(
        err.message
      );
    }
  };

  const loadReviews =
    async () => {
      try {
        const data =
          await getReviews(id);

        setReviews(
          data.reviews || []
        );
      } catch (err) {
        setError(
          err.message
        );
      }
    };

  const loadPage = async () => {
    try {
      setLoading(true);
      setError("");

      await Promise.all([
        loadMovie(),
        loadReviews()
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage();
  }, [id]);

  const handleDeleteReview =
    async (reviewId) => {
      const confirmed =
        window.confirm(
          "Delete this review?"
        );

      if (!confirmed) {
        return;
      }

      try {
        await deleteReview(
          reviewId
        );

        await loadReviews();
        await loadMovie();
      } catch (err) {
        setError(
          err.message
        );
      }
    };

  if (loading) {
    return (
      <div className="page-center">
        <div className="loader">
          Loading movie...
        </div>
      </div>
    );
  }

  if (error && !movie) {
    return (
      <div className="page-center">
        <div className="empty-state">
          <h2>
            Movie unavailable
          </h2>
          <p>{error}</p>
          <Link
            to="/"
            className="btn btn-primary"
          >
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const myReview =
    user
      ? reviews.find(
          (review) =>
            review.user_id?._id ===
            user.id
        )
      : null;

  return (
    <div className="container">

      <Link
        to="/"
        className="back-link"
      >
        ← Back to movies
      </Link>

      {error && (
        <div className="alert-error">
          {error}
        </div>
      )}

      <section className="movie-details">

        <div className="detail-poster">

          {movie.poster_url ? (
            <img
              src={movie.poster_url}
              alt={movie.title}
              onError={(e) => {
                e.currentTarget.style.display =
                  "none";

                e.currentTarget.nextElementSibling.style.display =
                  "flex";
              }}
            />
          ) : null}

          <div
            className="poster-placeholder large"
            style={{
              display: movie.poster_url
                ? "none"
                : "flex"
            }}
          >
            <span>🎬</span>
            <small>
              No Poster
            </small>
          </div>

        </div>

        <div className="detail-info">

          <span className="eyebrow">
            {movie.release_year ||
              "MOVIE"}
          </span>

          <h1>
            {movie.title}
          </h1>

          <div className="detail-rating">

            <StarRating
              value={Math.round(
                movie.averageRating ||
                  0
              )}
              readOnly
              size="medium"
            />

            <strong>
              {movie.averageRating
                ? movie.averageRating.toFixed(
                    1
                  )
                : "N/A"}
            </strong>

            <span>
              {movie.reviewCount ||
                0}{" "}
              reviews
            </span>

          </div>

          <p className="synopsis">
            {movie.synopsis ||
              "No synopsis available."}
          </p>

          <p className="created-by">
            Added by{" "}
            <strong>
              {movie.created_by
                ?.username ||
                "Admin"}
            </strong>
          </p>

          {isAdmin && (
            <div className="detail-actions">

              <Link
                to={`/admin/movies/${movie._id}/edit`}
                className="btn btn-secondary"
              >
                Edit Movie
              </Link>

            </div>
          )}

        </div>
      </section>

      <section className="reviews-section">

        <div className="section-header">
          <div>
            <h2>
              Reviews
            </h2>

            <p>
              What viewers think
            </p>
          </div>
        </div>

        {user ? (
          <ReviewForm
            movieId={movie._id}
            existingReview={
              myReview
            }
            onSaved={async () => {
              await loadReviews();
              await loadMovie();
            }}
          />
        ) : (
          <div className="login-prompt">

            <h3>
              Want to review this
              movie?
            </h3>

            <p>
              Login to rate and
              write your review.
            </p>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/login")
              }
            >
              Login
            </button>

          </div>
        )}

        <div className="reviews-list">

          {reviews.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                💬
              </div>

              <h3>
                No reviews yet
              </h3>

              <p>
                Be the first to
                review this movie.
              </p>
            </div>
          ) : (
            reviews.map(
              (review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  currentUser={user}
                  onDelete={
                    handleDeleteReview
                  }
                />
              )
            )
          )}

        </div>
      </section>

    </div>
  );
};

export default MovieDetails;