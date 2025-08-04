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
  const handleInsertion = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data);

    console.log(payload);
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
              className="insert-form-textarea"
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
