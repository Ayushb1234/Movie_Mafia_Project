const SearchBar = ({
  value,
  onChange
}) => {
  return (
    <div className="search-box">
      <span className="search-icon">
        🔍
      </span>

      <input
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />

      {value && (
        <button
          className="clear-search"
          onClick={() =>
            onChange("")
          }
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;