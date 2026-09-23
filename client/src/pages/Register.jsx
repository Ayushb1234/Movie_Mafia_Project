import {
  useState
} from "react";

import {
  Link,
  Navigate,
  useNavigate
} from "react-router-dom";

import {
  validateRegister
} from "../utils/validators";

import { useAuth } from "../context/AuthContext";

const Register = () => {
  const {
    register,
    user
  } = useAuth();

  const navigate =
    useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword
  ] = useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setError("");

    const validationError =
      validateRegister({
        username,
        email,
        password
      });

    if (validationError) {
      setError(
        validationError
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      setError(
        "Passwords do not match"
      );
      return;
    }

    try {
      setLoading(true);

      await register(
        username,
        email,
        password
      );

      navigate("/", {
        replace: true
      });
    } catch (err) {
      setError(
        err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <div className="auth-logo">
            🎬
          </div>

          <span className="eyebrow">
            JOIN CINERATE
          </span>

          <h1>
            Create an account
          </h1>

          <p>
            Join the movie
            community and start
            reviewing.
          </p>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>
              Username
            </label>

            <input
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Confirm password
            </label>

            <input
              type="password"
              placeholder="Repeat your password"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />
          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>

        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Register;