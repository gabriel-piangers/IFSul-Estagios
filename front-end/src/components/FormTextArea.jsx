import "../styles/Form.css"

export function FormTextArea({ label = "", name, className = "", required = false }) {
    if(!name) name = label

  return (
    <div className="form-input-container">
      <textarea
        name={name}
        required={required}
        className={`form-textarea ${className}`}
      ></textarea>

      <label htmlFor={name} className="form-label-textarea">{label}</label>
    </div>
  );
}
