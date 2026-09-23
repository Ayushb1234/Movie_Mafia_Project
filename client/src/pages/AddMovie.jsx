import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  createMovie
} from "../api/api";

import {
  validateMovie
} from "../utils/validators";

const AddMovie = () => {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      title: "",
      synopsis: "",
      poster_url: "",
      release_year: ""
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange =
    (e) => {
      const {
        name,
        value
      } = e.target;

      setForm((current) => ({
        ...current,
        [name]: value
      }));
    };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setError("");

    const validationError =
      validateMovie(form);

    if (validationError) {
      setError(
        validationError
      );
      return;
    }

    try {
      setLoading(true);

      await createMovie({
        title: form.title.trim(),
        synopsis:
          form.synopsis.trim(),
        poster_url:
          form.poster_url.trim(),
        release_year:
          form.release_year
            ? Number(
                form.release_year
              )
            : undefined
      });

      navigate("/admin");
    } catch (err) {
      setError(
        err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container narrow">

      <Link
        to="/admin"
        className="back-link"
      >
        ← Back to dashboard
      </Link>

      <div className="form-page">

        <div className="form-page-header">

          <span className="eyebrow">
            ADMIN
          </span>

          <h1>
            Add New Movie
          </h1>

          <p>
            Add a movie to the
            CineRate catalog.
          </p>

        </div>

        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>
              Movie title *
            </label>

            <input
              name="title"
              type="text"
              placeholder="Interstellar"
              value={form.title}
              onChange={
                handleChange
              }
            />
          </div>

          <div className="form-group">
            <label>
              Release year
            </label>

            <input
              name="release_year"
              type="number"
              min="1888"
              max="2100"
              placeholder="2014"
              value={
                form.release_year
              }
              onChange={
                handleChange
              }
            />
          </div>

          <div className="form-group">
            <label>
              Poster URL
            </label>

            <input
              name="poster_url"
              type="url"
              placeholder="https://..."
              value={
                form.poster_url
              }
              onChange={
                handleChange
              }
            />
          </div>

          <div className="form-group">
            <label>
              Synopsis
            </label>

            <textarea
              name="synopsis"
              rows="8"
              placeholder="Movie synopsis..."
              maxLength="5000"
              value={
                form.synopsis
              }
              onChange={
                handleChange
              }
            />

            <div className="character-count">
              {form.synopsis.length}/5000
            </div>
          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <div className="form-actions">

            <Link
              to="/admin"
              className="btn btn-secondary"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Movie"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddMovie;