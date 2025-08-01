import { Header } from "../components/Header";
import { FormSelect } from "../components/FormSelect";
import { FormSubmit } from "../components/FormSubmit";
import { useNavigate } from "react-router";
import { cidadeOpt, cursoOpt } from "../scripts/memoDB";
import "../styles/Home.css";

export function HomePage() {
  const navigate = useNavigate();

  const handleSearchFilter = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data);
    navigate(`/search?cidade=${payload.cidade}&curso=${payload.curso}`);
  };

  return (
    <>
      <Header />
      <main className="home-main">
        <div className="home-section-container">
          <section className="home-left">Encontre vagas de Estágio</section>

          <section className="home-right">
            <form
              className="search-form"
              id="home-form"
              onSubmit={handleSearchFilter}
            >
              <FormSelect
                label="cidade"
                options={cidadeOpt}
                color="var(--bg-color)"
                required={true}
              />
              <FormSelect
                label="curso"
                options={cursoOpt}
                color="var(--bg-color)"
                required={true}
              />
              <FormSubmit label="buscar" />
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
