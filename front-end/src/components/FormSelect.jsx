import { capitalize } from "../scripts/stringHandler";

export function FormSelect({ label, name, options }) {
  if (!name) name = label;
  return (
    <div className="form-input-container ">
      <select name={name} className="form-input form-select">
        <option value={null} selected></option>
        {options.map((opt) => {
          return <option value={opt.value}> {opt.name} </option>;
        })}
      </select>
      <label htmlFor={name} className="form-label">
        {capitalize(label)}
      </label>
    </div>
  );
}
