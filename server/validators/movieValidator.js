const create = (req, res, next) => {
  const {
    title,
    synopsis,
    poster_url,
    release_year
  } = req.body;

  // Validate title
  if (
    !title ||
    typeof title !== "string" ||
    !title.trim()
  ) {
    return res.status(400).json({
      message: "Movie title is required"
    });
  }

  if (title.trim().length > 200) {
    return res.status(400).json({
      message: "Movie title cannot exceed 200 characters"
    });
  }

  // Validate synopsis
  if (
    synopsis !== undefined &&
    typeof synopsis !== "string"
  ) {
    return res.status(400).json({
      message: "Synopsis must be a string"
    });
  }

  if (
    synopsis !== undefined &&
    synopsis.length > 5000
  ) {
    return res.status(400).json({
      message: "Synopsis cannot exceed 5000 characters"
    });
  }

  // Validate poster URL
  if (
    poster_url !== undefined &&
    typeof poster_url !== "string"
  ) {
    return res.status(400).json({
      message: "Poster URL must be a string"
    });
  }

  // Validate release year
  if (release_year !== undefined) {
    const year = Number(release_year);

    if (
      !Number.isInteger(year) ||
      year < 1888 ||
      year > 2100
    ) {
      return res.status(400).json({
        message: "Release year must be between 1888 and 2100"
      });
    }
  }

  next();
};


const update = (req, res, next) => {
  const {
    title,
    synopsis,
    poster_url,
    release_year
  } = req.body;

  // At least one field must be provided
  if (
    title === undefined &&
    synopsis === undefined &&
    poster_url === undefined &&
    release_year === undefined
  ) {
    return res.status(400).json({
      message: "At least one movie field is required"
    });
  }

  // Validate title
  if (
    title !== undefined &&
    (
      typeof title !== "string" ||
      !title.trim()
    )
  ) {
    return res.status(400).json({
      message: "Movie title cannot be empty"
    });
  }

  if (
    title !== undefined &&
    title.trim().length > 200
  ) {
    return res.status(400).json({
      message: "Movie title cannot exceed 200 characters"
    });
  }

  // Validate synopsis
  if (
    synopsis !== undefined &&
    typeof synopsis !== "string"
  ) {
    return res.status(400).json({
      message: "Synopsis must be a string"
    });
  }

  if (
    synopsis !== undefined &&
    synopsis.length > 5000
  ) {
    return res.status(400).json({
      message: "Synopsis cannot exceed 5000 characters"
    });
  }

  // Validate poster URL
  if (
    poster_url !== undefined &&
    typeof poster_url !== "string"
  ) {
    return res.status(400).json({
      message: "Poster URL must be a string"
    });
  }

  // Validate release year
  if (release_year !== undefined) {
    const year = Number(release_year);

    if (
      !Number.isInteger(year) ||
      year < 1888 ||
      year > 2100
    ) {
      return res.status(400).json({
        message: "Release year must be between 1888 and 2100"
      });
    }
  }

  next();
};


module.exports = {
  create,
  update
};