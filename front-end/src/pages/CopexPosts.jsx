import { use } from "react";
import { Header } from "../components/Header";
import { SearchForm } from "../components/searchForm";
import { cidadeOpt, cursoOpt, vagas } from "../scripts/memoDB";
import { useNavigate, useSearchParams } from "react-router";
import jobIcon from "../assets/job-icon.png";
import "../styles/CopexPosts.css";
import lixeira from "../assets/lixeira.svg";
import editar from "../assets/editar.svg";

export function CopexPosts() {
  const [searchParams] = useSearchParams();
  const searchCity = searchParams.get("cidade") || null;
  const searchCourse = searchParams.get("curso") || null;
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data);
    navigate(`/posts?cidade=${payload.cidade}&curso=${payload.curso}`);
  };
  return (
    <>
      <Header />
      <main className="page-main">
        <SearchForm
          cidades={cidadeOpt}
          cursos={cursoOpt}
          onSubmit={handleSubmit}
        />
        <aside className="search-aside" id="post-search">
          <p className="search-results-info">
            {" "}
            {`${vagas.length} vagas encontradas ${
              searchCity ? "em " + searchCity : ""
            }`}
          </p>
          {vagas.map((vaga) => {
            return (
              <div className={`post-job-container`} key={vaga.id}>
                <img src={jobIcon} alt="Job icon" className="aside-job-icon" />
                <div className="post-job-info">
                  <h3 className="post-job-title">{vaga.titulo}</h3>
                  <p className="post-job-company">{vaga.empresa}</p>
                  <p className="post-job-p">{vaga.cidade}</p>
                  <p className="post-job-p">{vaga.turno}</p>
                </div>
                <div className="post-job-menu">
                  <img
                    src={editar}
                    alt="icone de editar"
                    className="post-job-option"
                  />
                  <img
                    src={lixeira}
                    alt="icone de excluir"
                    className="post-job-option"
                  />
                </div>
              </div>
            );
          })}
        </aside>
      </main>
    </>
  );
}
