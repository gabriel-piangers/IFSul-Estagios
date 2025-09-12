import { capitalize } from "../scripts/stringHandler";

export function FormInput({
  label,
  name,
  type = "text",
  className = "",
  required = false,
  color = "var(--section-bg-color)",
  defaultValue = "",
  disabled = false,
}) {
  if (!name) name = label;
  return (
    <div className="form-input-container">
      <input
        type={type}
        name={name}
        id={name}
        className={`form-input ${disabled ? "disabled" : ""} ${className}`}
        placeholder=""
        defaultValue={defaultValue}
        required={required ? true : undefined}
        disabled={disabled}
        style={{
          backgroundColor: color,
        }}
      />
      <label
        htmlFor={name}
        className={`form-label ${disabled ? "disabled" : ""}`}
        style={{
          backgroundColor: color,
        }}
      >
        {capitalize(label)} {required ? "*" : ""}
      </label>
    </div>
  );
}
