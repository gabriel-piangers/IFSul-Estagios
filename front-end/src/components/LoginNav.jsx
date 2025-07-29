import {useNavigate} from "react-router"

export function LoginNav({ selected = "login", setSelection}) {
  const navigate = useNavigate()

  return (
    <nav className="login-nav">
      <div className="login-nav-button" onClick={() => {
        setSelection('register')
        navigate('/register')
      }}>
        <p className={selected === "register" ? "login-nav-p selected" : "login-nav-p"}>Registrar</p>
      </div>

      <div className="login-nav-button" onClick={() => {
        setSelection('login')
        navigate('/login')
        }}>
        <p className={selected === "login" ? "login-nav-p selected" : "login-nav-p"}>Login</p>
      </div>
    </nav>
  );
}
