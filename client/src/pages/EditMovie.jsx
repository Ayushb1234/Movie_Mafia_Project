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
  getMovie,
  updateMovie
} from "../api/api";

import {
  validateMovie
} from "../utils/validators";

const EditMovie = () => {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      title: "",
      synopsis: "",
      poster_url: "",
      release_year: ""
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadMovie =
      async () => {
        try {
          setLoading(true);

          const data =
            await getMovie(id);

          const movie =
            data.movie;

          setForm({
            title:
              movie.title || "",
            synopsis:
              movie.synopsis || "",
            poster_url:
              movie.poster_url ||
              "",
            release_year:
              movie.release_year ||
              ""
          });
        } catch (err) {
          setError(
            err.message
          );
        } finally {
          setLoading(false);
        }
      };

    loadMovie();
  }, [id]);

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
      setSaving(true);

      await updateMovie(id, {
        title:
          form.title.trim(),

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

      navigate(
        `/movie/${id}`
      );
    } catch (err) {
      setError(
        err.message
      );
    } finally {
      setSaving(false);
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
            Edit Movie
          </h1>

          <p>
            Update movie details.
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
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditMovie;