import { Link } from "react-router-dom";

/**
 * Sidebar — collection filters for the browse view.
 * `filters` is an array of { key, label, icon }.
 */
const Sidebar = ({ filters, active, onSelect, counts = {}, isAdmin }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-block">
        <h4 className="sidebar-title">Collections</h4>
        <div className="filter-list">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`filter-item ${active === f.key ? "active" : ""}`}
              onClick={() => onSelect(f.key)}
            >
              <span className="ic">
                <span>{f.icon}</span>
                {f.label}
              </span>
              <span className="count">{counts[f.key] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

      {isAdmin ? (
        <div className="sidebar-cta">
          <h4>Curate the catalog</h4>
          <p>Add a new title or update details from the admin dashboard.</p>
          <Link to="/admin/movies/add" className="btn btn-primary btn-small btn-full">
            + Add a Movie
          </Link>
        </div>
      ) : (
        <div className="sidebar-cta">
          <h4>Join the conversation</h4>
          <p>Create a free account to rate films and post your own reviews.</p>
          <Link to="/register" className="btn btn-primary btn-small btn-full">
            Get Started
          </Link>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
