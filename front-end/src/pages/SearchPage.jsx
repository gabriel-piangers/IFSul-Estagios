import { Header } from "../components/Header";
import { FormSelect } from "../components/FormSelect";
import { FormSubmit } from "../components/FormSubmit";
import jobIcon from "../assets/job-icon.png";
import { printReais } from "../scripts/stringHandler";
import { useState } from "react";
import { cidadeOpt, cursoOpt, vagas } from "../scripts/memoDB";

export function SearchPage() {
  const [selectedJob, setSelectedJob] = useState(vagas[0]);

  return (
    <>
      <Header />
      <main className="search-main">
        <form className="search-form">
          <FormSelect label="Cidade" options={cidadeOpt} />
          <FormSelect label="Curso" options={cursoOpt} />
          <FormSubmit label="Buscar" />
        </form>

        <div className="search-results">
          <aside className="search-aside">
            <p className="search-results-info">
              {" "}
              20 vagas encontradas em Sapiranga, Rio Grande do Sul
            </p>
            {vagas.map((vaga) => {
              return (
                <div className="aside-job-container" key={vaga.id}>
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
          </section>
        </div>
      </main>
    </>
  );
}
