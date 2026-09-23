import {
  useState
} from "react";

import {
  Link,
  Navigate,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  validateLogin
} from "../utils/validators";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const {
    login,
    user
  } = useAuth();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

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
      validateLogin({
        email,
        password
      });

    if (validationError) {
      setError(
        validationError
      );
      return;
    }

    try {
      setLoading(true);

      await login(
        email,
        password
      );

      const from =
        location.state?.from
          ?.pathname || "/";

      navigate(from, {
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
            WELCOME BACK
          </span>

          <h1>
            Login to CineRate
          </h1>

          <p>
            Continue discovering
            and reviewing movies.
          </p>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
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

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(
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
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Create one
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Login;