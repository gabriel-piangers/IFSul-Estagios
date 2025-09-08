import logo from "../assets/logo_transparente.png";
import { GreenButton } from "./GreenButton";
import search from "../assets/Search.svg";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import homeIcon from "../assets/house.svg";
import logoutIcon from "../assets/log-out.svg";

export function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleCopexAccess = () => {
    if (user && user.user_type === "copex") {
      navigate("/copex");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="std-header">
      <nav className="header-nav">
        <img
          src={logo}
          alt="IFSul estágios logo"
          className="header-logo"
          onClick={() => navigate("/")}
        />
        <div className="header-nav-right">
          <img
            src={search}
            alt="Search Icon"
            className="header-action"
            onClick={() => {
              navigate("/search");
            }}
          />
          {user && user.user_type === "copex" ? (
            <>
              <img
                src={homeIcon}
                alt="house-icon"
                className="header-action primary-hover"
                onClick={() => navigate("/copex")}
              />
              <img
                src={logoutIcon}
                alt="logout"
                className="header-action secondary-hover"
                onClick={handleLogout}
              />
            </>
          ) : (
            <GreenButton label="Acesso Copex" onClick={handleCopexAccess} />
          )}
        </div>
      </nav>
    </header>
  );
}
