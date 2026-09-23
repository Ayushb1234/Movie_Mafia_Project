import {
  Link,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const {
    user,
    isAdmin,
    logout
  } = useAuth();

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">

        <Link
          to="/"
          className="logo"
        >
          <span className="logo-mark">
            C
          </span>

          <span>
            Cine<span>Rate</span>
          </span>
        </Link>

        <nav className="nav-links">
          <Link to="/">
            Home
          </Link>

          {isAdmin && (
            <Link to="/admin">
              Admin Dashboard
            </Link>
          )}
        </nav>

        <div className="nav-user">

          {user ? (
            <>
              <div className="user-pill">
                <span className="avatar">
                  {user.username
                    ?.charAt(0)
                    .toUpperCase()}
                </span>

                <span>
                  {user.username}
                </span>
              </div>

              <button
                className="btn btn-secondary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-secondary"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-primary"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </header>
  );
};

export default Navbar;