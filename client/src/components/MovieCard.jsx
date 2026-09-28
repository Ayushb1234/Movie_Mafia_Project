import { Link } from "react-router-dom";

import { useReveal } from "../hooks/useReveal";

const MovieCard = ({ movie, index = 0 }) => {
  const [ref, visible] = useReveal();

  const rating = movie.averageRating
    ? movie.averageRating.toFixed(1)
    : null;

  return (
    <Link
      ref={ref}
      to={`/movie/${movie._id}`}
      className={`movie-card reveal ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="movie-poster-wrapper">
        {movie.poster_url ? (
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="movie-poster"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling.style.display = "flex";
            }}
          />
        ) : null}

        <div
          className="poster-placeholder"
          style={{ display: movie.poster_url ? "none" : "flex" }}
        >
          <span>🎬</span>
          <small>No Poster</small>
        </div>

        <div className="rating-badge">★ {rating || "N/A"}</div>

        <div className="card-overlay">
          <p>{movie.synopsis || "No synopsis available yet."}</p>
          <span className="view-cta">View details →</span>
        </div>
      </div>

      <div className="movie-card-content">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span className="year">🗓 {movie.release_year || "N/A"}</span>
          <span>{movie.reviewCount || 0} reviews</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
