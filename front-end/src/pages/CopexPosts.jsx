import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { SearchForm } from "../components/searchForm";
import { useLocation, useNavigate } from "react-router";
import lixeira from "../assets/lixeira.svg";
import editar from "../assets/editar.svg";
import plusIcon from "../assets/plusIcon.svg";
import { LightButton } from "../components/LightButton";
import { ModalAlert } from "../components/ModalAlert";
import { InsertionForm } from "../components/InsertionForm";
import "../styles/CopexPosts.css";
import { GreenButton } from "../components/GreenButton";

export function CopexPosts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [postedVagas, setPostedVagas] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [updatingVaga, setUpdatingVaga] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState({ status: false, msg: "" });

  const [error, setError] = useState({ status: false, msg: "" });
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
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
      } else {
        console.log("failed to get vagas: ", data.msg);
        setPostedVagas([]);
        setError({ status: true, msg: data.msg });
      }
    } catch (error) {
      console.log(error);
      setError({ status: true, msg: error });
      setPostedVagas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUpdate = (vaga) => {
    setUpdatingVaga(vaga);
    setUpdateAlert(true);
  };

  const handleOpenDelete = (vaga) => {
    setUpdatingVaga(vaga);
    setDeleteAlert(true);
  };

  const handleDelete = async (vaga) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/vagas/${vaga.id}`,
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
        setPostedVagas(
          postedVagas.filter((vagaState) => vagaState.id !== vaga.id)
        );
        setUpdatingVaga(null);
        setDeleteAlert(false);
      } else {
        console.log("failed to delete vaga: ", data.msg);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelUpdate = () => {
    setUpdateAlert(false);
    setUpdatingVaga(null);
    setUpdateSuccess(false);
    setUpdateError({ status: false });
  };

  const handleUpdate = (vaga) => async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/vagas/${vaga.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titulo: payload.titulo,
            descricao: payload.descricao,
            cidade: payload.cidade,
            cursoId: payload.cursoId,
            turno: payload.turno,
            bolsa: payload.bolsa || 0,
            contato: payload.contato,
            empresa_nome: payload.empresa_nome,
            link: payload.link,
            remunerado: payload.sem_bolsa || false,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log(data);
        setUpdateAlert(false);
        setUpdatingVaga(null);
        setUpdateError({ status: false });
        await getPostedVagas(`/vagas`);
      } else {
        console.log(data.error);
        setUpdateError({
          status: true,
          msg: "Ocorreu um erro ao atualizar a vaga!",
        });
      }
    } catch (error) {
      console.log(error);
      setUpdateError({
        status: true,
        msg: "Erro ao comunicar com o servidor. Entre em contato com nosso suporte.",
      });
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
        <SearchForm onSubmit={handleSearch} />
        {loading ? (
          <h1>Carregando...</h1>
        ) : postedVagas.length > 0 && !error.status ? (
          <aside className="search-aside" id="post-search">
            {postedVagas.map((vaga) => {
              return (
                <div className={`post-job-container`} key={vaga.id}>
                  <div className="post-job-info">
                    <h3 className="post-job-title">{vaga.titulo}</h3>
                    <p className="post-job-company">{vaga.empresa_nome}</p>
                    <p className="post-job-p">{vaga.cidade}</p>
                    <p className="post-job-p">{vaga.turno}</p>
                  </div>
                  <div className="post-job-menu">
                    <img
                      src={editar}
                      alt="icone de editar"
                      className="post-job-option primary-hover"
                      onClick={() => handleOpenUpdate(vaga)}
                    />
                    <img
                      src={lixeira}
                      alt="icone de excluir"
                      className="post-job-option secondary-hover"
                      onClick={() => handleOpenDelete(vaga)}
                    />
                  </div>
                  {deleteAlert && (
                    <ModalAlert title="Tem certeza que deseja excluir esta vaga?">
                      <p>Está ação não pode ser desfeita</p>
                      <div className="flex-container">
                        <LightButton
                          label="Cancelar"
                          onClick={() => setDeleteAlert(false)}
                        />
                        <GreenButton
                          label="Confirmar"
                          onClick={() => handleDelete(updatingVaga)}
                        />
                      </div>
                    </ModalAlert>
                  )}

                  {updateAlert && (
                    <ModalAlert title="Editar vaga publicada">
                      <InsertionForm
                        onReturn={handleCancelUpdate}
                        onSubmit={handleUpdate(updatingVaga)}
                        success={updateSuccess}
                        error={updateError}
                        submitText="Editar"
                        payload={updatingVaga}
                      />
                    </ModalAlert>
                  )}
                </div>
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
            <p>Entre em contato com nosso suporte!</p>
          </div>
        )}
      </main>
    </>
  );
}
