import { Header } from "../components/Header";
import { SearchForm } from "../components/SearchForm";
import { cidadeOpt, cursoOpt } from "../scripts/memoDB";
import "../styles/Home.css";
import { useEffect } from "react";

export function HomePage() {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <>
      <Header />
      <main className="home-main">
        <div className="home-section-container">
          <section className="home-left">Encontre vagas de Estágio</section>

          <section className="home-right">
            <SearchForm
              cidades={cidadeOpt}
              cursos={cursoOpt}
              id="home-form"
              color="var(--bg-color)"
            />
          </section>
        </div>
      </main>
    </>
  );
}
