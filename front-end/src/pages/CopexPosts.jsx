import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { SearchForm } from "../components/searchForm";
import { cidadeOpt, cursoOpt, vagas } from "../scripts/memoDB";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import jobIcon from "../assets/job-icon.png";
import lixeira from "../assets/lixeira.svg";
import editar from "../assets/editar.svg";
import plusIcon from "../assets/plusIcon.svg";
import { LightButton } from "../components/LightButton";
import { ConfirmAlert } from "../components/ConfirmAlert";
import "../styles/CopexPosts.css";

export function CopexPosts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [postedVagas, setPostedVagas] = useState([]);
  const [openAlert, setOpenAlert] = useState();
  const [error, setError] = useState({ status: false, msg: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data);
    navigate(`/posts?cidade=${payload.cidade}&cursoId=${payload.curso}`);
  };

  const getPostedVagas = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`);
      const data = await response.json();

      if (data.success) {
        setPostedVagas(data.vagas);
        setError({ status: false });
        return data.vagas;
      } else {
        console.log("failed to get vagas: ", data.msg);
        setPostedVagas([]);
        setError({ status: true, msg: data.msg });
        return [];
      }
    } catch (error) {
      console.log(error);
      setError({ status: true, msg: error });
      setPostedVagas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vagaId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/vagas/${vagaId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setPostedVagas(postedVagas.filter((vaga) => vaga.id !== vagaId));
      } else {
        console.log("failed to delete vaga: ", data.msg);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(location.search);
      let searchCity = searchParams.get("cidade") || null;
      let searchCourse = searchParams.get("cursoId") || null;
      let url = "/vagas";
      const params = [];

      if (searchCity) params.push(`cidade=${searchCity}`);
      if (searchCourse) params.push(`curso_id=${searchCourse}`);

      if (params.length > 0) url += "?" + params.join("&");
      getPostedVagas(url);
    } catch (error) {
      console.log("erro ao carregar vagas: ", error);
      setPostedVagas([]);
    }
  }, [location]);

  return (
    <>
      <Header />
      <main className="page-main">
        <SearchForm
          cidades={cidadeOpt}
          cursos={cursoOpt}
          onSubmit={handleSubmit}
        />
        {loading ? (
          <h1>Carregando...</h1>
        ) : postedVagas.length > 0 && !error.status ? (
          <aside className="search-aside" id="post-search">
            {postedVagas.map((vaga) => {
              return (
                <>
                  <div className={`post-job-container`} key={vaga.id}>
                    <img
                      src={jobIcon}
                      alt="Job icon"
                      className="aside-job-icon"
                    />
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
                        onClick={() => setOpenAlert(true)}
                      />
                    </div>
                    {openAlert && (
                      <ConfirmAlert
                        title="Tem certeza que deseja exlcuir esta vaga?"
                        message="Esta ação não pode ser desfeita!"
                        open={true}
                        onConfirm={() => {
                          handleDelete(vaga.id);
                          setOpenAlert(false);
                        }}
                        onCancel={() => {
                          setOpenAlert(false);
                        }}
                      />
                    )}
                  </div>
                </>
              );
            })}
          </aside>
        ) : !error.status ? (
          <div className="jobs-not-found">
            <h2>Você ainda não publicou nenhuma vaga.</h2>
            <p>Para publicar uma vaga, clique no botão "Publicar Vaga".</p>
            <LightButton
              icon={plusIcon}
              iconAlt="Icone de camadas"
              label="Publicar Vaga"
              onClick={() => navigate("/insert")}
              style={{
                width: "25%",
                marginTop: "2rem",
                alignSelf: "center",
              }}
            />
          </div>
        ) : (
          <div className="jobs-not-found">
            <h2>Ocorreu um erro ao buscar buscar por vagas.</h2>
            <p>Entre em contato com nosso suporte!.</p>
          </div>
        )}
      </main>
    </>
  );
}
