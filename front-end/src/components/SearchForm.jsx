import { FormSelect } from "./FormSelect";
import { FormSubmit } from "./FormSubmit";
import { SearchableSelect } from "./SearchableSelect";
import { cursoOpt, getCidades } from "../scripts/memoDB";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function SearchForm({
  onSubmit = null,
  color = "var(--section-bg-color)",
  className = "",
  id = "",
  payload = {},
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
      navigate(url);
    };

  const [cidades, setCidades] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCidades()
      .then((e) => setCidades(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <form className={`search-form ${className}`} id={id} onSubmit={onSubmit}>
        <SearchableSelect
          label="cidade"
          defaultOption={payload.cidade || null}
          options={cidades}
          color={color}
        />
        <FormSelect
          label="curso"
          defaultValue={payload.curso || null}
          options={cursoOpt}
          color={color}
        />
        <FormSubmit label="buscar" />
      </form>
    );
  }
}
