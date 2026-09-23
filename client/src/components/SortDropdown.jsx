import {
  SORT_OPTIONS
} from "../utils/constants";

const SortDropdown = ({
  value,
  onChange
}) => {
  return (
    <select
      className="sort-dropdown"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    >
      {SORT_OPTIONS.map(
        (option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        )
      )}
    </select>
  );
};

export default SortDropdown;