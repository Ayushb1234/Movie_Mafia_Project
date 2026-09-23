export const validateEmail = (
  email
) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
};

export const validateRegister = ({
  username,
  email,
  password
}) => {
  if (!username.trim()) {
    return "Username is required";
  }

  if (
    username.trim().length < 3
  ) {
    return "Username must be at least 3 characters";
  }

  if (
    username.trim().length > 30
  ) {
    return "Username cannot exceed 30 characters";
  }

  if (!email.trim()) {
    return "Email is required";
  }

  if (!validateEmail(email.trim())) {
    return "Please enter a valid email";
  }

  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return "";
};

export const validateLogin = ({
  email,
  password
}) => {
  if (!email.trim()) {
    return "Email is required";
  }

  if (!validateEmail(email.trim())) {
    return "Please enter a valid email";
  }

  if (!password) {
    return "Password is required";
  }

  return "";
};

export const validateMovie = ({
  title,
  synopsis,
  poster_url,
  release_year
}) => {
  if (
    !title ||
    !title.trim()
  ) {
    return "Movie title is required";
  }

  if (title.trim().length > 200) {
    return "Movie title cannot exceed 200 characters";
  }

  if (
    synopsis &&
    synopsis.length > 5000
  ) {
    return "Synopsis cannot exceed 5000 characters";
  }

  if (
    poster_url &&
    typeof poster_url !== "string"
  ) {
    return "Poster URL must be a string";
  }

  if (
    release_year !== "" &&
    release_year !== undefined &&
    release_year !== null
  ) {
    const year = Number(
      release_year
    );

    if (
      !Number.isInteger(year) ||
      year < 1888 ||
      year > 2100
    ) {
      return "Release year must be between 1888 and 2100";
    }
  }

  return "";
};

export const validateReview = ({
  rating,
  body
}) => {
  const numericRating =
    Number(rating);

  if (
    !Number.isInteger(
      numericRating
    ) ||
    numericRating < 1 ||
    numericRating > 5
  ) {
    return "Rating must be between 1 and 5";
  }

  if (
    !body ||
    !body.trim()
  ) {
    return "Review cannot be empty";
  }

  if (body.trim().length > 5000) {
    return "Review cannot exceed 5000 characters";
  }

  return "";
};