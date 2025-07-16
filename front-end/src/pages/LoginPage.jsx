import { LoginBanner } from "../components/LoginBanner";
import { LoginNav } from "../components/LoginNav";
import { FormInput } from "../components/FormInput";
import { FormSubmit } from "../components/FormSubmit";
import { useState } from "react";

export function LoginPage() {
  const [selected, setSelection] = useState("login");

  const submitLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); // recebe os dados do form
    const payload = Object.fromEntries(formData); // converte para um objeto
    console.log(payload)
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
          <FormInput label={"email"} type="email" />
          <FormInput label={"senha"} name="password" type="password" />
          <FormSubmit label="Login" />
        </form>
      </section>
    </main>
  );
}
