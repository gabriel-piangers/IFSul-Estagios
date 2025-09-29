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
      let url = "/search";
      const params = [];
      if (payload.cidade) {
        params.push(`cidade=${payload.cidade}`);
      }
      if (payload.curso) {
        params.push(`cursoId=${payload.curso}`);
      }

      if (params.length > 0) url += `?${params.join("&")}`;
      console.log(url);
      navigate(url);
    };

  return (
    <form className={`search-form ${className}`} id={id} onSubmit={onSubmit}>
      <FormSelect label="cidade" options={cidades} color={color} />
      <FormSelect label="curso" options={cursos} color={color} />
      <FormSubmit label="buscar" />
    </form>
  );
}
