import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <span className="logo-mark">C</span>
            <span>
              Cine<b>Rate</b>
            </span>
          </Link>
          <p>
            A community for film lovers. Discover new releases and timeless
            classics, rate what you watch, and share honest reviews with people
            who care about cinema as much as you do.
          </p>
        </div>

        <div className="footer-col">
          <h5>Browse</h5>
          <Link to="/">All Movies</Link>
          <Link to="/">Top Rated</Link>
          <Link to="/">New Releases</Link>
          <Link to="/">Classics</Link>
        </div>

        <div className="footer-col">
          <h5>Account</h5>
          <Link to="/login">Sign In</Link>
          <Link to="/register">Create Account</Link>
          <Link to="/">My Reviews</Link>
        </div>

        <div className="footer-col">
          <h5>Company</h5>
          <a href="#about">About</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#contact">Contact</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} CineRate. Built for people who love movies.</span>
        <div className="footer-socials">
          <a href="#x" aria-label="X" title="X">𝕏</a>
          <a href="#ig" aria-label="Instagram" title="Instagram">◎</a>
          <a href="#yt" aria-label="YouTube" title="YouTube">▶</a>
          <a href="#gh" aria-label="GitHub" title="GitHub">❮❯</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
