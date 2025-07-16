import { LoginBanner } from "../components/LoginBanner";
import { LoginNav } from "../components/LoginNav";
import { FormInput } from "../components/FormInput";
import { FormSubmit } from "../components/FormSubmit";
import { FormSelect } from "../components/FormSelect";
import { useState } from "react";
import { validatePassword } from "../scripts/formValidation";


export function RegisterPage() {
     const [selected, setSelection] = useState("register");
      const [validPassword, setValidPassword] = useState(true);

      const campusOpt = [{ name: "Sapiranga", value: "sg" }];
          const cursoOpt = [
            { name: "Informática", value: "inf" },
            { name: "Eletromecânica", value: "etm" },
          ];
      
          const submitRegister = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target); // recebe os dados do form
            const payload = Object.fromEntries(formData); // converte para um objeto
            setValidPassword(validatePassword(payload.password));
          };
      
          return (
            <main className="login-main">
              <LoginBanner />
      
              <section className="login-section">
                <LoginNav selected={selected} setSelection={setSelection} />
                <form className="register-form std-form" onSubmit={submitRegister}>
                  <FormInput label="nome" required={true} />
                  <FormInput label={"email"} type="email" required={true} />
                  <FormInput label="matricula" name="matrícula" required={true} />
                  <FormSelect label={"campus"} options={campusOpt} required={true} />
                  <FormSelect label={"curso"} options={cursoOpt} required={true} />
      
                  <div className="form-input-container">
                    <FormInput
                      label={"senha"}
                      name="password"
                      type="password"
                      className={validPassword ? "" : "invalid"}
                      required={true}
                    />
                    {!validPassword && (
                      <p className={`form-input-error`}>
                        {
                          "A senha deve ter um minino de 8 digitos, contendo 1 maiscula, 1 minuscula e 1 número"
                        }
                      </p>
                    )}
                  </div>
      
                  <FormSubmit label="Registrar" />
                </form>
              </section>
            </main>
          );
}