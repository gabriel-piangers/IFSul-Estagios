import greenBanner from "../assets/lateral-verde1.png";
import logo from "../assets/logo_transparente.svg"

export function LoginBanner({ id = "undefined-id" }) {
  return (
    <div className="login-banner" id={id}>
      <img src={greenBanner} alt="Logo do site IFSul Estágios" className="login-banner-bg"/>
      <img src={logo} alt="IFSul Estagios logo" className="login-banner-logo"/>
    </div>
  );
}
