import MovieCard from "./MovieCard";

const MovieGrid = ({
  movies,
  loading
}) => {
  if (loading) {
    return (
      <div className="movie-grid">
        {Array.from({
          length: 8
        }).map((_, index) => (
          <div
            className="movie-skeleton"
            key={index}
          />
        ))}
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          🎬
        </div>

        <h3>
          No movies found
        </h3>

        <p>
          Try a different search
          term.
        </p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map(
        (movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
          />
        )
      )}
    </div>
  );
};

export default MovieGrid;