import { FormInput } from "../components/FormInput";
import { FormSelect } from "../components/FormSelect";
import { FormSubmit } from "../components/FormSubmit";
import { FormTextArea } from "../components/FormTextArea";
import { TitleInput } from "../components/TitleInput";
import { Header } from "../components/Header";
import { cidadeOpt, cursoOpt, turnoOpt } from "../scripts/memoDB";
import "../styles/InsertionPage.css";

export function InsertionPage() {
  const handleInsertion = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const payload = new Object.fromEntries(formData)

    console.log(payload)
  }

  return (
    <>
      <Header />

      <main className="page-main">
        <section className="insert-job-display">
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

                <FormInput label={"bolsa"} type="number" />
              </div>
            </div>

            <FormTextArea
              label="Descrição da vaga"
              className="insert-form-textarea"
            />

            <FormSubmit
              label="Cadastrar nova Vaga"
              className="insert-form-submit"
            />
          </form>
        </section>
      </main>
    </>
  );
}
