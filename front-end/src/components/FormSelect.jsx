import { capitalize } from "../scripts/stringHandler";

export function FormSelect({ label, name, id, options, required }) {
  if (!name) name = label;
  if(!id) id = name
  return (
    <div className="form-input-container ">
      <select name={name} id={id} defaultValue={null} className="form-input form-select" required={(required? true : undefined)}>
        <option value={null} defaultChecked></option>
        {options.map((opt) => {
          return <option value={opt.value} key={opt.value}> {opt.name} </option>;
        })}
      </select>
      <label htmlFor={name} className="form-label">
        {capitalize(label)}
      </label>
    </div>
  );
}
