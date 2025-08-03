import "../styles/Form.css"

export function TitleInput({
  placeholder = "Titulo...",
  className = "",
  color = "var(--section-bg-color)",
  required = true,
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`form-title-input ${className}`}
      required = {required}
      style={{
        backgroundColor: color
      }}
    />
  );
}
