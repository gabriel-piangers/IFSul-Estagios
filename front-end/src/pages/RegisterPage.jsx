import { LoginBanner } from "../components/LoginBanner";
import { LoginNav } from "../components/LoginNav";
import { FormInput } from "../components/FormInput";
import { FormSubmit } from "../components/FormSubmit";
import { FormSelect } from "../components/FormSelect";
import { useState } from "react";
import { validatePassword, validateEmail } from "../scripts/formValidation";
import { campusOpt, cursoOpt } from "../scripts/memoDB";

export function RegisterPage() {
  const [selected, setSelection] = useState("register");
  const [validPassword, setValidPassword] = useState(true);
  const [validEmail, setValidEmail] = useState({ status: true, msg: "" });

  const checkEmail = async (email) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/check-email/${email}`
      );
      const data = await response.json();

      if (data.success) {
        return data;
      } else {
        console.log(`Server error: ${data.msg}`);
        return data
      }
    } catch (error) {
      console.log(`Error checking email: ${error}`);
      return false
    }
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); // recebe os dados do form
    const payload = Object.fromEntries(formData); // converte para um objeto
    const isValidPassword = validatePassword(payload.password)
    const isValidEmail = validateEmail(payload.email)

    isValidPassword ? setValidPassword(true) : setValidPassword(false)
    isValidEmail? setValidEmail({status: true}) : setValidEmail({ 
      status: false, msg: "Utilize seu email institucional" 
    });

    if (isValidEmail && isValidPassword) {
      const emailData = await checkEmail(payload.email)
      if (emailData) {
        if (emailData.exists) return setValidEmail({ status: false, msg: "Email já registrado" });

        setValidEmail({status: true})

        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            name: payload.name,
            user_type: "aluno"
          })
        })

        const data = await response.json()

        if(data.success) {
          console.log("usuário criado com sucesso")

          e.target.reset()
        } else {
          console.log(`Erro ao registrar usuário: ${data.msg}`)
        }


      } else {
        console.log("Erro ao verrificar o email")
      }
    }
  };

  return (
    <main className="login-main">
      <LoginBanner />

      <section className="login-section">
        <LoginNav selected={selected} setSelection={setSelection} />
        <form className="register-form std-form" onSubmit={submitRegister}>
          <FormInput label="nome" name={"name"} required={true} />
          <div className="form-input-container">
            <FormInput
              label={"email"}
              type="email"
              required={true}
              className={validEmail.status ? "" : "invalid"}
            />
            {!validEmail.status && (
              <p className={`form-input-error`}>{validEmail.msg}</p>
            )}
          </div>
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
