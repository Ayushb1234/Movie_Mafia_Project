const express = require("express");

const {
  register,
  login,
  me
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const authValidator = require("../validators/authValidator");

const router = express.Router();

router.post(
  "/register",
  authValidator.register,
  register
);

router.post(
  "/login",
  authValidator.login,
  login
);

router.get(
  "/me",
  protect,
  me
);

module.exports = router;