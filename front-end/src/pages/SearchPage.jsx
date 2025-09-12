import { Header } from "../components/Header";
import { FormSelect } from "../components/FormSelect";
import { FormSubmit } from "../components/FormSubmit";
import { SearchForm } from "../components/searchForm";
import jobIcon from "../assets/job-icon.png";
import { printReais } from "../scripts/stringHandler";
import { useState } from "react";
import { cidadeOpt, cursoOpt, vagas } from "../scripts/memoDB";
import { useLocation, useSearchParams } from "react-router";
import { useEffect } from "react";

export function SearchPage() {
  const [matchingJobs, setMatchingJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const location = useLocation();
  let searchCity = null;
  const [error, setError] = useState({ status: false, msg: "" });
  const [loading, setLoading] = useState(false);

  const getJobs = async (url) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`);
    const data = await response.json();
    if (data.success) {
      setMatchingJobs(data.vagas);
      setSelectedJob(data.vagas[0] || null);
    } else {
      console.log("failed to get vagas: ", data.msg);
      setMatchingJobs([]);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      const searchParams = new URLSearchParams(location.search);
      let searchCity = searchParams.get("cidade") || null;
      let searchCourse = searchParams.get("cursoId") || null;
      let url = "/vagas";
      const params = [];

      if (searchCity) params.push(`cidade=${searchCity}`);
      if (searchCourse) params.push(`curso_id=${searchCourse}`);

      if (params.length > 0) url += "?" + params.join("&");
      getJobs(url);
      setError({ status: false });
    } catch (error) {
      console.log("erro ao carregar vagas: ", error);
      setMatchingJobs([]);
      setError({ status: true, msg: error });
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    if (matchingJobs.length > 0) {
      setSelectedJob(matchingJobs[0]);
    } else {
      setSelectedJob(null);
    }
  }, [matchingJobs]);

  return (
    <>
      <Header />
      <main className="page-main">
        <SearchForm cidades={cidadeOpt} cursos={cursoOpt} />
        {loading ? (
          <h2 className="jobs-not-found">Carregando...</h2>
        ) : error.status ? (
          <div className="jobs-not-found">
            <h2>Ocorreu um erro ao buscar buscar por vagas.</h2>
            <p>Entre em contato com nosso suporte!</p>
          </div>
        ) : matchingJobs.length > 0 ? (
          <div className="search-results">
            <aside className="search-aside">
              <p className="search-results-info">
                {" "}
                {`${matchingJobs.length} vagas encontradas ${
                  searchCity ? "em " + searchCity : ""
                }`}
              </p>
              {matchingJobs.map((vaga) => {
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
                {selectedJob.empresa_nome} • {selectedJob.cidade}
              </p>

              {selectedJob.link ? (
                <button
                  className="form-submit job-display-button"
                  onClick={() => window.open(selectedJob.link)}
                >
                  Candidatar-se
                </button>
              ) : (
                <button
                  className="form-submit job-display-button disabled "
                  title="Link de candidatura não disponibilizado"
                >
                  Candidatar-se
                </button>
              )}

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
                {selectedJob.bolsa == 0
                  ? "A combinar"
                  : printReais(selectedJob.bolsa)}
              </p>
              <p className="job-display-p">
                <strong>Contato</strong> <br />
                {selectedJob.contato}
              </p>
              <p className="job-display-p">
                <strong>Cursos Relacionados</strong> <br />
                {selectedJob.curso_nome}
              </p>
            </section>
          </div>
        ) : (
          <h2 className="jobs-not-found">Nenhuma Vaga encontrada</h2>
        )}
      </main>
    </>
  );
}
