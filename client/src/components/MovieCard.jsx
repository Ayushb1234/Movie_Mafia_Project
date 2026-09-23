import {
  Link
} from "react-router-dom";

const MovieCard = ({
  movie
}) => {
  return (
    <Link
      to={`/movie/${movie._id}`}
      className="movie-card"
    >
      <div className="movie-poster-wrapper">

        {movie.poster_url ? (
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="movie-poster"
            onError={(e) => {
              e.currentTarget.style.display =
                "none";

              e.currentTarget.nextElementSibling.style.display =
                "flex";
            }}
          />
        ) : null}

        <div
          className="poster-placeholder"
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

        <div className="rating-badge">
          ★{" "}
          {movie.averageRating
            ? movie.averageRating.toFixed(
                1
              )
            : "N/A"}
        </div>
      </div>

      <div className="movie-card-content">

        <h3>
          {movie.title}
        </h3>

        <div className="movie-meta">
          <span>
            {movie.release_year ||
              "N/A"}
          </span>

          <span>
            {movie.reviewCount || 0}{" "}
            reviews
          </span>
        </div>

      </div>
    </Link>
  );
};

export default MovieCard;