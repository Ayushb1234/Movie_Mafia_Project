import {
  useEffect,
  useState
} from "react";

import StarRating from "./StarRating";

import {
  saveReview
} from "../api/api";

import {
  validateReview
} from "../utils/validators";

const ReviewForm = ({
  movieId,
  existingReview,
  onSaved
}) => {
  const [rating, setRating] =
    useState(
      existingReview?.rating || 0
    );

  const [body, setBody] =
    useState(
      existingReview?.body || ""
    );

  const [
    spoilerFlag,
    setSpoilerFlag
  ] = useState(
    existingReview?.spoiler_flag ||
      false
  );

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    setRating(
      existingReview?.rating || 0
    );

    setBody(
      existingReview?.body || ""
    );

    setSpoilerFlag(
      existingReview?.spoiler_flag ||
        false
    );
  }, [existingReview]);

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError =
      validateReview({
        rating,
        body
      });

    if (validationError) {
      setError(
        validationError
      );
      return;
    }

    try {
      setSubmitting(true);

      await saveReview(
        movieId,
        {
          rating,
          body,
          spoiler_flag:
            spoilerFlag
        }
      );

      setSuccess(
        existingReview
          ? "Review updated successfully."
          : "Review added successfully."
      );

      if (onSaved) {
        await onSaved();
      }
    } catch (err) {
      setError(
        err.message
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="review-form"
      onSubmit={handleSubmit}
    >
      <h3>
        {existingReview
          ? "Update your review"
          : "Write a review"}
      </h3>

      <div className="form-group">

        <label>
          Your rating
        </label>

        <StarRating
          value={rating}
          onChange={setRating}
          size="large"
        />
      </div>

      <div className="form-group">

        <label htmlFor="review">
          Review
        </label>

        <textarea
          id="review"
          rows="5"
          placeholder="What did you think about this movie?"
          value={body}
          maxLength={5000}
          onChange={(e) =>
            setBody(
              e.target.value
            )
          }
        />

        <div className="character-count">
          {body.length}/5000
        </div>
      </div>

      <label className="checkbox-label">

        <input
          type="checkbox"
          checked={spoilerFlag}
          onChange={(e) =>
            setSpoilerFlag(
              e.target.checked
            )
          }
        />

        <span>
          Contains spoilers
        </span>

      </label>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      {success && (
        <div className="form-success">
          {success}
        </div>
      )}

      <button
        className="btn btn-primary"
        type="submit"
        disabled={submitting}
      >
        {submitting
          ? "Saving..."
          : existingReview
          ? "Update Review"
          : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;