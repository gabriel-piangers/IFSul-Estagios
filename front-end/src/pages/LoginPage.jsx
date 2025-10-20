import { LoginBanner } from "../components/LoginBanner";
import { LoginNav } from "../components/LoginNav";
import { FormInput } from "../components/FormInput";
import { FormSubmit } from "../components/FormSubmit";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import { loginErrors } from "../scripts/formValidation";
import "../styles/LoginPage.css";

export function LoginPage() {
  const navigate = useNavigate();
  const [invalidCredentials, setInvalidCredencials] = useState({
    show: false,
    msg: "",
  });
  const { login } = useAuth();

  const submitLogin = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target); // recebe os dados do form
      const payload = Object.fromEntries(formData); // converte para um objeto

      const data = await login(payload.email, payload.password);

      if (data.success) {
        if (data.user.user_type === "copex") return navigate("/copex");
        return navigate("/");
      } else {
        console.log(data);
        setInvalidCredencials({ show: true, msg: loginErrors(data.status) });
      }
    } catch (error) {
      console.log(error);
      setInvalidCredencials({ show: true, msg: "Error in Fetch" });
    }
  };

  return (
    <main className="login-main">
      <LoginBanner />

      <section className="login-section">
        <LoginNav />
        <form className="login-form std-form" onSubmit={submitLogin}>
          <FormInput
            label={"email"}
            type="email"
            className={invalidCredentials.show ? "invalid" : ""}
            required={true}
          />
          <FormInput
            label={"senha"}
            name="password"
            type="password"
            className={invalidCredentials.show ? "invalid" : ""}
            required={true}
          />

          {invalidCredentials.show && (
            <p className="form-input-error">{invalidCredentials.msg}</p>
          )}

          <FormSubmit label="Login" />
        </form>
      </section>
    </main>
  );
}
