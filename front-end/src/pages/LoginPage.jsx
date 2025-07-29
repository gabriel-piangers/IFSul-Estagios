import { LoginBanner } from "../components/LoginBanner";
import { LoginNav } from "../components/LoginNav";
import { FormInput } from "../components/FormInput";
import { FormSubmit } from "../components/FormSubmit";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

export function LoginPage() {
  const navigate = useNavigate();

  const [selected, setSelection] = useState("login");
  const [invalidCredentials, setInvalidCredencials] = useState(false);
  const { login } = useAuth();

  const submitLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); // recebe os dados do form
    const payload = Object.fromEntries(formData); // converte para um objeto

    const data = await login(payload.email, payload.password);

    if (data.success) navigate("/");
    else {
      console.log(data.msg);
      setInvalidCredencials(true);
    }
  };

  return (
    <main className="login-main">
      <LoginBanner />

      <section className="login-section">
        <LoginNav
          selected={selected}
          setSelection={setSelection}
          onSubmit={submitLogin}
        />
        <form className="login-form std-form" onSubmit={submitLogin}>
          <FormInput
            label={"email"}
            type="email"
            className={invalidCredentials ? "invalid" : ""}
          />
          <FormInput
            label={"senha"}
            name="password"
            type="password"
            className={invalidCredentials ? "invalid" : ""}
          />

          {invalidCredentials && (
            <p className="form-input-error">
              Email ou senha incorretos! Preencha os campos corretamente
            </p>
          )}

          <FormSubmit label="Login" />
        </form>
      </section>
    </main>
  );
}
