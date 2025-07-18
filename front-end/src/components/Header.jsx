import logo from "../assets/logo_transparente.png";
import profile from "../assets/profile-pic.svg";
import search from "../assets/Search.svg";

export function Header() {
  return (
    <header className="std-header">
      <nav className="header-nav">
        <img src={logo} alt="IFSul estágios logo" className="header-logo" />
        <div className="header-nav-right">
          <img src={search} alt="Search Icon" className="header-search"/>

          <img
            src={profile}
            alt="Foto de perfil padrão"
            className="header-profile-pic"
          />
        </div>
      </nav>
    </header>
  );
}
