import { capitalize } from "../scripts/stringHandler";

export function FormSubmit({ label = "Enviar", className = "" }) {
  return (
    <input
      type="submit"
      value={capitalize(label)}
      className={`form-submit ${className}`}
    />
  );
}
