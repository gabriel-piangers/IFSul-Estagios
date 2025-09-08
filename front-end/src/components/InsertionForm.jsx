import { FormInput } from "../components/FormInput";
import { FormSelect } from "../components/FormSelect";
import { FormSubmit } from "../components/FormSubmit";
import { FormTextArea } from "../components/FormTextArea";
import { TitleInput } from "../components/TitleInput";
import { LightButton } from "../components/LightButton";

export function InsertionForm({
  cidadeOpt = [],
  cursoOpt = [],
  turnoOpt = [],
  onReturn = () => {
    console.log("return clicked");
  },
  onSubmit = () => {
    console.log("Submit clicked");
  },
  success = false,
  error = { status: false, msg: "" },
  submitText = "Adicionar vaga",
  payload = {},
}) {
  return (
    <form className="std-form" id="insert-form" onSubmit={onSubmit}>
      <TitleInput
        placeholder="Título da vaga..."
        defaultValue={payload.titulo || ""}
      />

      <div className="insert-form-container">
        <div className="insert-form-left">
          <FormInput
            label={"Nome da empresa"}
            name={"empresa_nome"}
            defaultValue={payload.empresa_nome || ""}
            required={true}
          />

          <FormSelect
            label={"cidade"}
            options={cidadeOpt}
            defaultValue={payload.cidade || null}
            required={true}
          />
          <FormInput
            label={"contato"}
            defaultValue={payload.contato || ""}
            required={true}
          />
        </div>

        <div className="insert-form-right">
          <FormSelect
            label={"curso"}
            name={"cursoId"}
            options={cursoOpt}
            defaultValue={payload.curso_id || null}
            required={true}
          />
          <FormSelect
            label={"turno"}
            options={turnoOpt}
            defaultValue={payload.turno || null}
            required={true}
          />

          <FormInput
            label={"bolsa (R$)"}
            name={"bolsa"}
            defaultValue={payload.bolsa || "0"}
            type="number"
          />
        </div>
      </div>

      <FormTextArea
        label="Descrição da vaga"
        name="descricao"
        className="insert-form-textarea"
        defaultValue={payload.descricao || ""}
        required={true}
      />

      <div className="flex-container">
        <LightButton
          label="Voltar"
          className="insert-return-button"
          onClick={onReturn}
        />
        <FormSubmit label={submitText} className="insert-form-submit" />
      </div>

      {error.status && <p className="insert-form-error">{error.msg}</p>}
      {success && (
        <p className="insert-form-success">Vaga criada com sucesso!</p>
      )}
    </form>
  );
}
