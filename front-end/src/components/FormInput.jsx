import { capitalize } from "../scripts/stringHandler";

export function FormInput({
  label,
  name,
  type = "text",
  className = "",
  required = false,
  color = "var(--section-bg-color)",
  defaultValue = "",
}) {
  if (!name) name = label;
  return (
    <div className="form-input-container">
      <input
        type={type}
        name={name}
        id={name}
        className={`form-input ${className}`}
        placeholder=""
        defaultValue={defaultValue}
        required={required ? true : undefined}
        style={{
          backgroundColor: color,
        }}
      />
      <label
        htmlFor={name}
        className="form-label"
        style={{
          backgroundColor: color,
        }}
      >
        {capitalize(label)}
      </label>
    </div>
  );
}
