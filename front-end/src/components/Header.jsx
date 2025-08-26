import logo from "../assets/logo_transparente.png";
import { GreenButton } from "./GreenButton";
import search from "../assets/Search.svg";
import {useNavigate} from "react-router"
import { useAuth } from "../contexts/AuthProvider";

export function Header() {
  const navigate = useNavigate()
  const {user, logout} = useAuth()

  const handleCopexAccess = () => {
    if (user && user.user_type === "copex") {
      navigate('/copex')
    } else {
      navigate('/login')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="std-header">
      <nav className="header-nav">
        <img src={logo} alt="IFSul estágios logo" className="header-logo" 
        onClick={() => navigate("/")}/>
        <div className="header-nav-right">
          <img src={search} alt="Search Icon" className="header-search" onClick={() => {
            navigate('/search')
          }}/>

          {user && user.user_type === "copex" ? (
            <div className="flex-container">
              <GreenButton label="Sair" onClick={handleLogout}/>
              <GreenButton label="Área Copex" onClick={() => navigate("/copex")}/>
            </div>
          ) : (
            <GreenButton label="Acesso Copex" onClick={handleCopexAccess}/>
          ) }
        </div>
      </nav>
    </header>
  );
}
