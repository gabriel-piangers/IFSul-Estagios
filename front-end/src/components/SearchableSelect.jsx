import { use, useEffect, useRef, useState } from "react";
import { capitalize } from "../scripts/stringHandler";
import "../styles/Form.css";

export function SearchableSelect({
  options = [],
  defaultOption = "",
  required = false,
  label = "Selecione",
  name,
  id,
  className = "",
  color = "var(--section-bg-color)",
}) {
  if (!name) name = label;
  if (!id) id = name;
  const [filter, setFilter] = useState(defaultOption || "");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ name: defaultOption });
  const selectRef = useRef(null);
  const inputRef = useRef(null);

  const filtredOptions = options.filter((option) => {
    if (!filter || filter === "") return true;
    return option.name.toLowerCase().includes(filter.toLowerCase());
  });

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setFilter(option.name);
    setIsOpen(false);
  };

  useEffect(() => {
    inputRef.current.value = filter;
  }, [filter]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        if (selectedOption) {
          setFilter(selectedOption.name);
        } else {
          setFilter(" ");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedOption]);

  return (
    <div ref={selectRef} style={{ position: "relative", width: "100%" }}>
      <div className="form-input-container">
        <input
          ref={inputRef}
          type="text"
          name={name}
          id={name}
          className={`form-input form-select ${className}`}
          required={required}
          value={filter || ""}
          style={{
            backgroundColor: color,
          }}
          autoComplete="off"
          onChange={(e) => setFilter(e.target.value)}
          onClick={() => setIsOpen(!isOpen)}
          onBlur={(e) => {
            if (selectedOption) {
              setFilter(selectedOption.name);
            } else {
              setFilter("");
            }
            setIsOpen(false);
          }}
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
              onMouseDown={() => handleOptionSelect(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
