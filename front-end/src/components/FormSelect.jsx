import { capitalize } from "../scripts/stringHandler";

export function FormSelect({
  label,
  name,
  id,
  options = [],
  required,
  defaultValue = "",
  className = "",
  color = "var(--section-bg-color)",
}) {
  if (!name) name = label;
  if (!id) id = name;
  return (
    <div className="form-input-container ">
      <select
        name={name}
        id={id}
        className={`form-input form-select ${className}`}
        defaultValue={defaultValue}
        required={required ? true : undefined}
        style={{
          backgroundColor: color,
        }}
      >
        <option value={null}></option>
        {options.map((opt) => {
          return (
            <option value={opt.value} key={opt.value}>
              {" "}
              {opt.name}{" "}
            </option>
          );
        })}
      </select>
      <label
        htmlFor={name}
        className="form-label"
        style={{ backgroundColor: color }}
      >
        {capitalize(label)}
      </label>
    </div>
  );
}
