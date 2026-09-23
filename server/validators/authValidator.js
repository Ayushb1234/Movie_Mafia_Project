const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const register = (req, res, next) => {
  const {
    username,
    email,
    password
  } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message:
        "Username, email and password are required"
    });
  }

  if (
    typeof username !== "string" ||
    username.trim().length < 3 ||
    username.trim().length > 30
  ) {
    return res.status(400).json({
      message:
        "Username must be between 3 and 30 characters"
    });
  }

  if (
    typeof email !== "string" ||
    !emailRegex.test(email.trim())
  ) {
    return res.status(400).json({
      message: "Please provide a valid email"
    });
  }

  if (
    typeof password !== "string" ||
    password.length < 6
  ) {
    return res.status(400).json({
      message:
        "Password must be at least 6 characters"
    });
  }

  next();
};

const login = (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  next();
};

module.exports = {
  register,
  login
};