import { Header } from "../components/Header";
import { SearchForm } from "../components/SearchForm";
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
            <SearchForm id="home-form" color="var(--bg-color)" />
            <a
              className="home-right-link"
              href="https://www.sapiranga.ifsul.edu.br/coordenadoria-de-pesquisa-e-extensao/estagios"
            >
              Ver sobre o processo de estágio
            </a>
          </section>
        </div>
      </main>
    </>
  );
}
