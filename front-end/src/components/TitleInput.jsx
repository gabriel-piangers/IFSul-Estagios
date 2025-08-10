import "../styles/Form.css"

export function TitleInput({
  placeholder = "Titulo...",
  className = "",
  color = "var(--section-bg-color)",
  required = true,
  name = "titulo"
}) {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      className={`form-title-input ${className}`}
      required = {required}
      style={{
        backgroundColor: color
      }}
    />
  );
}
