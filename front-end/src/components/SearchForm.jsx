import { FormSelect } from "./FormSelect";
import { FormSubmit } from "./FormSubmit";
import { useNavigate } from "react-router";

export function SearchForm({
  onSubmit = null,
  cidades,
  cursos,
  color = "var(--section-bg-color)",
  className = "",
  id = "",
}) {
  const navigate = useNavigate();

  if (!onSubmit)
    onSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const payload = Object.fromEntries(data);
      navigate(`/search?cidade=${payload.cidade}&curso=${payload.curso}`);
    };

  return (
    <form className={`search-form ${className}`} id={id} onSubmit={onSubmit}>
      <FormSelect
        label="cidade"
        options={cidades}
        required={true}
        color={color}
      />
      <FormSelect
        label="curso"
        options={cursos}
        required={true}
        color={color}
      />
      <FormSubmit label="buscar" />
    </form>
  );
}
