import loadingGif from "../assets/loading.gif";

export function Loader({ className = "", style = {} }) {
  return (
    <div className={`loading-container ${className}`} style={style}>
      <img src={loadingGif} alt="Gif de carregando" className="loading-gif" />
    </div>
  );
}
