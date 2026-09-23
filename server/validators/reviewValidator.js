const create = (req, res, next) => {
  const {
    rating,
    body,
    spoiler_flag
  } = req.body;

  const numericRating = Number(rating);

  if (
    rating === undefined ||
    !Number.isInteger(numericRating) ||
    numericRating < 1 ||
    numericRating > 5
  ) {
    return res.status(400).json({
      message:
        "Rating must be an integer between 1 and 5"
    });
  }

  if (
    !body ||
    typeof body !== "string" ||
    !body.trim()
  ) {
    return res.status(400).json({
      message: "Review body is required"
    });
  }

  if (body.trim().length > 5000) {
    return res.status(400).json({
      message:
        "Review cannot exceed 5000 characters"
    });
  }

  if (
    spoiler_flag !== undefined &&
    typeof spoiler_flag !== "boolean"
  ) {
    return res.status(400).json({
      message:
        "spoiler_flag must be true or false"
    });
  }

  next();
};

module.exports = {
  create
};