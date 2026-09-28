import { useEffect, useRef, useState } from "react";

const SearchBar = ({ value, onChange }) => {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  // Press "/" anywhere to jump to search — a small pro touch.
  useEffect(() => {
    const onKey = (e) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={`search-box ${focused ? "focused" : ""}`}>
      <span className="search-icon">🔍</span>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search movies by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {value ? (
        <button className="clear-search" onClick={() => onChange("")}>
          ×
        </button>
      ) : (
        <span className="kbd">/</span>
      )}
    </div>
  );
};

export default SearchBar;
