import { FormInput } from "../components/FormInput";
import { FormSelect } from "../components/FormSelect";
import { FormSubmit } from "../components/FormSubmit";
import { FormTextArea } from "../components/FormTextArea";
import { TitleInput } from "../components/TitleInput";
import { LightButton } from "../components/LightButton";
import { Header } from "../components/Header";
import { cidadeOpt, cursoOpt, turnoOpt } from "../scripts/memoDB";
import "../styles/InsertionPage.css";
import { useNavigate } from "react-router";

export function InsertionPage() {
  const navigate = useNavigate();

  const handleInsertion = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data);

    console.log(payload);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/vagas`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: payload.titulo,
          descricao: payload.descricao,
          cidade: payload.cidade,
          turno: payload.turno,
          bolsa: payload.bolsa,
          contato: payload.contato,
          empresa_nome: payload.empresa_nome,
        }),
      });

      const data = await response.json();

      if (data.success) {
        e.target.reset();
        console.log("vaga criada com sucesso!");
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
          <form className="std-form insert-form" onSubmit={handleInsertion}>
            <TitleInput placeholder="Título da vaga..." />

            <div className="insert-form-container">
              <div className="insert-form-left">
                <FormInput
                  label={"Nome da empresa"}
                  name={"empresa_nome"}
                  required={true}
                />

                <FormSelect
                  label={"cidade"}
                  options={cidadeOpt}
                  required={true}
                />
                <FormInput label={"contato"} required={true} />
              </div>

              <div className="insert-form-right">
                <FormSelect
                  label={"curso"}
                  options={cursoOpt}
                  required={true}
                />
                <FormSelect
                  label={"turno"}
                  options={turnoOpt}
                  required={true}
                />

                <FormInput label={"bolsa (R$)"} name={"bolsa"} type="number" />
              </div>
            </div>

            <FormTextArea
              label="Descrição da vaga"
              name="descricao"
              className="insert-form-textarea"
              required={true}
            />

            <div className="flex-container">
              <LightButton
                label="Voltar"
                className="insert-return-button"
                onClick={handleReturn}
              />
              <FormSubmit
                label="Adicionar vaga"
                className="insert-form-submit"
              />
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
