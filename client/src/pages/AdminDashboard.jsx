import {
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  deleteMovie,
  getMovies
} from "../api/api";

const AdminDashboard = () => {
  const [movies, setMovies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const navigate =
    useNavigate();

  const loadMovies =
    async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getMovies({
            sort: "newest"
          });

        setMovies(
          data.movies || []
        );
      } catch (err) {
        setError(
          err.message
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleDelete =
    async (movieId) => {
      const confirmed =
        window.confirm(
          "Delete this movie and all its reviews?"
        );

      if (!confirmed) {
        return;
      }

      try {
        await deleteMovie(
          movieId
        );

        setMovies((current) =>
          current.filter(
            (movie) =>
              movie._id !== movieId
          )
        );
      } catch (err) {
        setError(
          err.message
        );
      }
    };

  return (
    <div className="container">

      <div className="admin-header">

        <div>
          <span className="eyebrow">
            ADMIN
          </span>

          <h1>
            Movie Dashboard
          </h1>

          <p>
            Manage movies and
            ratings on CineRate.
          </p>
        </div>

        <Link
          to="/admin/movies/add"
          className="btn btn-primary"
        >
          + Add Movie
        </Link>

      </div>

      {error && (
        <div className="alert-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="page-center">
          <div className="loader">
            Loading...
          </div>
        </div>
      ) : (
        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>
              <tr>
                <th>
                  Movie
                </th>

                <th>
                  Year
                </th>

                <th>
                  Rating
                </th>

                <th>
                  Reviews
                </th>

                <th>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {movies.map(
                (movie) => (
                  <tr
                    key={movie._id}
                  >
                    <td>
                      <div className="table-movie">

                        {movie.poster_url ? (
                          <img
                            src={
                              movie.poster_url
                            }
                            alt={
                              movie.title
                            }
                          />
                        ) : (
                          <div className="table-poster">
                            🎬
                          </div>
                        )}

                        <strong>
                          {movie.title}
                        </strong>

                      </div>
                    </td>

                    <td>
                      {movie.release_year ||
                        "—"}
                    </td>

                    <td>
                      ★{" "}
                      {movie.averageRating
                        ? movie.averageRating.toFixed(
                            1
                          )
                        : "N/A"}
                    </td>

                    <td>
                      {movie.reviewCount ||
                        0}
                    </td>

                    <td>
                      <div className="table-actions">

                        <button
                          className="btn btn-secondary btn-small"
                          onClick={() =>
                            navigate(
                              `/admin/movies/${movie._id}/edit`
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-small"
                          onClick={() =>
                            handleDelete(
                              movie._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>
                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

          {!movies.length && (
            <div className="empty-state">
              <h3>
                No movies yet
              </h3>

              <p>
                Add your first movie.
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default AdminDashboard;