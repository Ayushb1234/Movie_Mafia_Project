import {
  useEffect,
  useState
} from "react";

import {
  getMovies
} from "../api/api";

import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import MovieGrid from "../components/MovieGrid";

const Home = () => {
  const [movies, setMovies] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState("newest");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getMovies({
          search,
          sort
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
    const timer =
      setTimeout(() => {
        loadMovies();
      }, 250);

    return () =>
      clearTimeout(timer);
  }, [search, sort]);

  return (
    <div className="container">

      <section className="hero">

        <div>
          <span className="eyebrow">
            MOVIE REVIEWS
          </span>

          <h1>
            Discover your next
            <span> favorite movie.</span>
          </h1>

          <p>
            Explore movies, rate
            what you watch and
            share your thoughts
            with other movie lovers.
          </p>
        </div>

        <div className="hero-icon">
          🎬
        </div>

      </section>

      <section className="toolbar">

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <SortDropdown
          value={sort}
          onChange={setSort}
        />

      </section>

      {error && (
        <div className="alert-error">
          {error}
        </div>
      )}

      <section className="section-header">

        <div>
          <h2>
            {search
              ? `Results for "${search}"`
              : "All Movies"}
          </h2>

          <p>
            {movies.length}{" "}
            movie
            {movies.length !== 1
              ? "s"
              : ""}
          </p>
        </div>

      </section>

      <MovieGrid
        movies={movies}
        loading={loading}
      />

    </div>
  );
};

export default Home;