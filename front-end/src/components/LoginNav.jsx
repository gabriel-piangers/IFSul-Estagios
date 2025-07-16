export function LoginNav({ selected = "login", setSelection}) {

  return (
    <nav className="login-nav">
      <div className="login-nav-button" onClick={() => setSelection('register')}>
        <p className={selected === "register" ? "login-nav-p selected" : "login-nav-p"}>Registrar</p>
      </div>

      <div className="login-nav-button" onClick={() => setSelection('login')}>
        <p className={selected === "login" ? "login-nav-p selected" : "login-nav-p"}>Login</p>
      </div>
    </nav>
  );
}
