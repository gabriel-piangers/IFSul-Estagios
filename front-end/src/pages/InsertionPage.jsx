import { Header } from "../components/Header";
import "../styles/InsertionPage.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { InsertionForm } from "../components/InsertionForm";

export function InsertionPage() {
  const navigate = useNavigate();
  const [error, setError] = useState({ status: false, msg: "" });
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const handleInsertion = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data);

    setSuccess(false);
    setError({ status: false, msg: "" });

    if (payload.bolsa < 0) {
      setError({ status: true, msg: "Bolsa não pode ser negativa" });
      return;
    }

    if (!user || !user.user_type === "copex")
      return setError({
        status: true,
        msg: "Acesso negado, somente usuários Copex tem permissão para inserir uma vaga",
      });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/vagas`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "api-key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          titulo: payload.titulo,
          descricao: payload.descricao,
          cidade: payload.cidade,
          cursoID: payload.cursoId,
          turno: payload.turno,
          bolsa: payload.bolsa || 0,
          contato: payload.contato,
          empresa_nome: payload.empresa_nome,
          link: payload.link,
          remunerado: payload.sem_bolsa || false,
          tipo: payload.modalidade,
        }),
      });

      const data = await response.json();

      if (data.success) {
        e.target.reset();
        setSuccess(true);
      } else {
        return console.log(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturn = () => {
    navigate("/copex");
  };

  return (
    <>
      <Header />
      <main className="page-main">
        <section className="insert-job-display">
          <h1 className="insert-title">Adicionar nova vaga</h1>
          <InsertionForm
            onReturn={handleReturn}
            onSubmit={handleInsertion}
            success={success}
            error={error}
          />
        </section>
      </main>
    </>
  );
}
