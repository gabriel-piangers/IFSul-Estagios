import "../styles/Form.css";

export function FormTextArea({
  label = "",
  name,
  defaultValue = "",
  className = "",
  required = false,
}) {
  if (!name) name = label;

  return (
    <div className="form-input-container">
      <textarea
        name={name}
        defaultValue={defaultValue}
        required={required}
        className={`form-textarea ${className}`}
      ></textarea>

      <label htmlFor={name} className="form-label-textarea">
        {label}
      </label>
    </div>
  );
}
