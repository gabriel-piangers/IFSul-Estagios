import { Header } from "../components/Header";
import { FormSelect } from "../components/FormSelect";
import { FormSubmit } from "../components/FormSubmit";
import { SearchForm } from "../components/searchForm";
import jobIcon from "../assets/job-icon.png";
import { printReais } from "../scripts/stringHandler";
import { useState } from "react";
import { cidadeOpt, cursoOpt, vagas } from "../scripts/memoDB";
import { useSearchParams } from "react-router";
import { useEffect } from "react";

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const searchCity = searchParams.get("cidade") || null
  const searchCourse = searchParams.get("curso") || null
  let mathcingJobs = null
  if (searchCity && searchCourse) {
    mathcingJobs = vagas.filter((vaga) => {
      return vaga.cidade === searchCity && vaga.curso === searchCourse;
    });
  } else {
    mathcingJobs = vagas;
  }
  const [selectedJob, setSelectedJob] = useState(mathcingJobs[0]);

  useEffect(() => {
    if (!mathcingJobs.includes(selectedJob)) setSelectedJob(mathcingJobs[0]);
  }, [mathcingJobs]);

  return (
    <>
      <Header />
      <main className="page-main">
        <SearchForm cidades={cidadeOpt} cursos={cursoOpt}/>

        <div className="search-results">
          <aside className="search-aside">
            <p className="search-results-info">
              {" "}
              {`${mathcingJobs.length} vagas encontradas ${
                searchCity ? "em " + searchCity : ""
              }`}
            </p>
            {mathcingJobs.map((vaga) => {
              return (
                <div
                  className={`aside-job-container ${
                    selectedJob.id === vaga.id ? "selected" : ""
                  }`}
                  key={vaga.id}
                  onClick={() => setSelectedJob(vaga)}
                >
                  <img
                    src={jobIcon}
                    alt="Job icon"
                    className="aside-job-icon"
                  />
                  <div className="aside-job-info">
                    <h3 className="aside-job-title">{vaga.titulo}</h3>
                    <p className="aside-job-company">{vaga.empresa}</p>
                    <p className="aside-job-p">{vaga.cidade}</p>
                    <p className="aside-job-p">{vaga.turno}</p>
                  </div>
                </div>
              );
            })}
          </aside>
          <section className="search-job-display">
            <img src={jobIcon} alt="Job icon" className="job-display-icon" />
            <h2 className="job-display-title">{selectedJob.titulo}</h2>
            <p className="job-display-p-thin">
              {selectedJob.empresa} • {selectedJob.cidade}
            </p>

            <button className="form-submit job-display-button">
              Candidatar-se
            </button>

            <p className="job-display-p">
              <strong>Sobre</strong> <br />
              {selectedJob.descricao}
            </p>
            <p className="job-display-p">
              <strong>Turno</strong> <br />
              {selectedJob.turno}
            </p>
            <p className="job-display-p">
              <strong>Bolsa</strong> <br />
              {printReais(selectedJob.bolsa)}
            </p>
            <p className="job-display-p">
              <strong>Contato</strong> <br />
              {selectedJob.contato}
            </p>
            <p className="job-display-p">
              <strong>Cursos Relacionados</strong> <br />
              {selectedJob.curso}
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
