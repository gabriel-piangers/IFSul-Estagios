import { use, useEffect, useRef, useState } from "react";
import { capitalize } from "../scripts/stringHandler";
import "../styles/form.css";

export function SearchableSelect({
  options,
  defaultOption = null,
  required = false,
  label = "Selecione",
  name,
  id,
  color = "var(--section-bg-color)",
}) {
  if (!name) name = label;
  if (!id) id = name;
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const selectRef = useRef(null);
  const inputRef = useRef(null);

  const filtredOptions = options.filter((option) => {
    return option.name.toLowerCase().includes(filter.toLowerCase());
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} style={{ position: "relative" }}>
      <div className="form-input-container">
        <input
          ref={inputRef}
          type="text"
          className="form-input form-select"
          required={required}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onClick={() => setIsOpen(!isOpen)}
        />
        <label
          htmlFor={name}
          className="form-label"
          style={{ backgroundColor: color }}
        >
          {capitalize(label)} {required ? "*" : ""}
        </label>
      </div>
      {isOpen && (
        <div className="search-select-dropdown">
          {filtredOptions.map((option) => (
            <div
              className="search-select-option"
              key={option.name}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
                setFilter(option.name);
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
