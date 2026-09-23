import StarRating from "./StarRating";

const ReviewCard = ({
  review,
  currentUser,
  onDelete
}) => {
  const reviewer =
    review.user_id;

  const isOwner =
    currentUser &&
    reviewer &&
    reviewer._id ===
      currentUser.id;

  const isAdmin =
    currentUser?.role ===
    "admin";

  const canDelete =
    isOwner || isAdmin;

  const username =
    reviewer?.username ||
    "Anonymous";

  return (
    <article className="review-card">

      <div className="review-header">

        <div className="review-user">

          <div className="avatar large">
            {username
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <h4>
              {username}
            </h4>

            <span className="review-date">
              {new Date(
                review.createdAt
              ).toLocaleDateString()}
            </span>
          </div>

        </div>

        <StarRating
          value={review.rating}
          readOnly
          size="small"
        />
      </div>

      {review.spoiler_flag && (
        <div className="spoiler-tag">
          ⚠ Spoiler
        </div>
      )}

      <p className="review-body">
        {review.body}
      </p>

      {canDelete && (
        <button
          className="btn btn-danger btn-small"
          onClick={() =>
            onDelete(review._id)
          }
        >
          Delete
        </button>
      )}

    </article>
  );
};

export default ReviewCard;