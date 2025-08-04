import logo from "../assets/logo_transparente.png";
import profile from "../assets/profile-pic.svg";
import search from "../assets/Search.svg";
import {useNavigate} from "react-router"

export function Header() {
  const navigate = useNavigate()
  return (
    <header className="std-header">
      <nav className="header-nav">
        <img src={logo} alt="IFSul estágios logo" className="header-logo" 
        onClick={() => navigate("/login")}/>
        <div className="header-nav-right">
          <img src={search} alt="Search Icon" className="header-search" onClick={() => {
            navigate('/')
          }}/>

          <img
            src={profile}
            alt="Foto de perfil padrão"
            className="header-profile-pic"
            onClick={() => navigate("/under-development")}
          />
        </div>
      </nav>
    </header>
  );
}
