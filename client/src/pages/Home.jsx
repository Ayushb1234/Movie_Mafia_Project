import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getMovies } from "../api/api";
import { useAuth } from "../context/AuthContext";

import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import MovieGrid from "../components/MovieGrid";
import Sidebar from "../components/Sidebar";

const CURRENT_YEAR = new Date().getFullYear();

const COLLECTIONS = [
  { key: "all", label: "All Movies", icon: "🎬" },
  { key: "top", label: "Top Rated", icon: "⭐" },
  { key: "new", label: "New Releases", icon: "🆕" },
  { key: "classics", label: "Classics", icon: "🏛️" },
  { key: "unrated", label: "Undiscovered", icon: "🔎" }
];

const matchesCollection = (movie, key) => {
  switch (key) {
    case "top":
      return (movie.averageRating || 0) >= 4;
    case "new":
      return (movie.release_year || 0) >= CURRENT_YEAR - 6;
    case "classics":
      return movie.release_year && movie.release_year < 2000;
    case "unrated":
      return (movie.reviewCount || 0) === 0;
    default:
      return true;
  }
};

const Home = () => {
  const { user, isAdmin } = useAuth();

  const [movies, setMovies] = useState([]);  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [collection, setCollection] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getMovies({ search, sort });
      setMovies(data.movies || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(loadMovies, 250);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort]);

  const counts = useMemo(() => {
    const c = {};
    for (const col of COLLECTIONS) {
      c[col.key] = movies.filter((m) => matchesCollection(m, col.key)).length;
    }
    return c;
  }, [movies]);

  const visibleMovies = useMemo(
    () => movies.filter((m) => matchesCollection(m, collection)),
    [movies, collection]
  );

  const stats = useMemo(() => {
    const rated = movies.filter((m) => m.averageRating > 0);
    const avg = rated.length
      ? (rated.reduce((s, m) => s + m.averageRating, 0) / rated.length).toFixed(1)
      : "—";
    const reviews = movies.reduce((s, m) => s + (m.reviewCount || 0), 0);
    return { total: movies.length, avg, reviews };
  }, [movies]);

  const strip = movies.length
    ? movies.slice(0, 12)
    : [];

  const activeLabel =
    COLLECTIONS.find((c) => c.key === collection)?.label || "All Movies";

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <span className="hero-badge">
            <span className="dot" /> NOW STREAMING REVIEWS
          </span>

          <h1>
            Every great film
            <br />
            deserves a <span className="grad">real opinion.</span>
          </h1>

          <p>
            Explore a hand-picked catalog of modern hits and timeless classics.
            Rate what you watch, write reviews that matter, and find your next
            favorite movie through the eyes of a community that loves cinema.
          </p>

          <div className="hero-actions">
            <a href="#browse" className="btn btn-primary">
              Browse the catalog
            </a>
            {!user && (
              <Link to="/register" className="btn btn-secondary">
                Create free account
              </Link>
            )}
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="num">{stats.total}</div>
              <div className="label">Movies</div>
            </div>
            <div className="hero-stat">
              <div className="num">{stats.avg}</div>
              <div className="label">Avg Rating</div>
            </div>
            <div className="hero-stat">
              <div className="num">{stats.reviews}</div>
              <div className="label">Reviews</div>
            </div>
          </div>
        </div>

        {strip.length > 0 && (
          <div className="filmstrip">
            <div className="filmstrip-track">
              {[...strip, ...strip].map((m, i) => (
                <span className="filmstrip-chip" key={`${m._id}-${i}`}>
                  <b>★ {m.averageRating ? m.averageRating.toFixed(1) : "N/A"}</b>
                  &nbsp;{m.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="toolbar" id="browse">
        <SearchBar value={search} onChange={setSearch} />
        <SortDropdown value={sort} onChange={setSort} />
      </section>

      {error && <div className="alert-error">{error}</div>}

      <div className="browse">
        <Sidebar
          filters={COLLECTIONS}
          active={collection}
          onSelect={setCollection}
          counts={counts}
          isAdmin={isAdmin}
        />

        <div>
          <div className="section-header">
            <div>
              <h2>{search ? `Results for "${search}"` : activeLabel}</h2>
              <p>
                {visibleMovies.length} movie
                {visibleMovies.length !== 1 ? "s" : ""}
                {collection !== "all" ? " in this collection" : " to explore"}
              </p>
            </div>
            <span className="count-chip">{activeLabel}</span>
          </div>

          <MovieGrid movies={visibleMovies} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Home;
