import { capitalize } from "../scripts/stringHandler";

export function FormInput({ label, name, type = "text", className = "", required = false }) {
  if (!name) name = label;
  return (
    <div className="form-input-container">
      <input type={type} name={name} id={name} className={`form-input ${className}`} placeholder="" required={(required? true : undefined)}/>
      <label htmlFor={name} className="form-label">
        {capitalize(label)}
      </label>
    </div>
  );
}
