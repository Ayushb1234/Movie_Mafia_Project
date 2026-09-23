const StarRating = ({
  value = 0,
  onChange,
  size = "medium",
  readOnly = false
}) => {
  return (
    <div
      className={`star-rating ${size} ${
        readOnly
          ? "readonly"
          : ""
      }`}
    >
      {[1, 2, 3, 4, 5].map(
        (star) => (
          <button
            key={star}
            type="button"
            className={
              star <= value
                ? "star active"
                : "star"
            }
            onClick={() =>
              !readOnly &&
              onChange?.(star)
            }
            disabled={readOnly}
            aria-label={`${star} star`}
          >
            ★
          </button>
        )
      )}
    </div>
  );
};

export default StarRating;