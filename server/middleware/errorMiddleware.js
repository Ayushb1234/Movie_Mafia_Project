const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  if (err.code === 11000) {
    const duplicateField =
      Object.keys(err.keyPattern || {})[0] ||
      "field";

    return res.status(409).json({
      message: `${duplicateField} already exists`
    });
  }

  const statusCode =
    res.statusCode >= 400
      ? res.statusCode
      : 500;

  res.status(statusCode).json({
    message:
      err.message || "Internal server error"
  });
};

module.exports = errorHandler;