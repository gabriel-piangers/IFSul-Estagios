import { Header } from "../components/Header";
import { SearchForm } from "../components/searchForm";
import {
  printReais,
  convertUrlsToLinks,
  printPublishedTime,
} from "../scripts/stringHandler";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import { useEffect } from "react";
import "../styles/LoginPage.css";

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
        <SearchForm />
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
                    <div className="aside-job-info">
                      <div
                        className="flex-container"
                        style={{ justifyContent: "space-between" }}
                      >
                        <h3 className="aside-job-title">{vaga.titulo}</h3>
                        <span className="aside-job-date">
                          {printPublishedTime(vaga.publicada_em)}
                        </span>
                      </div>
                      <p className="aside-job-company">{vaga.empresa_nome}</p>
                      <div
                        className="flex-container"
                        style={{
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <p className="aside-job-p">
                          {vaga.cidade} • {vaga.turno}
                        </p>
                        <span className={`aside-job-tag tag-${vaga.tipo}`}>
                          {vaga.tipo}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </aside>
            <section className="search-job-display">
              <h2 className="job-display-title">{selectedJob.titulo}</h2>
              <div
                className="flex-container"
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                <p className="job-display-p-thin">
                  {selectedJob.empresa_nome} • {selectedJob.cidade}
                </p>
                <span className="aside-job-date">
                  {printPublishedTime(selectedJob.publicada_em)}
                </span>
              </div>
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
                <span
                  dangerouslySetInnerHTML={{
                    __html: convertUrlsToLinks(selectedJob.descricao),
                  }}
                />
              </p>
              <p className="job-display-p">
                <strong>Turno</strong> <br />
                {selectedJob.turno}
              </p>
              <p className="job-display-p">
                <strong>Bolsa</strong> <br />
                {!selectedJob.remunerado
                  ? "Não remunerado"
                  : selectedJob.bolsa == 0
                  ? "Não informado"
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
