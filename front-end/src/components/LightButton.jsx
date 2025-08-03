import "../styles/Button.css";

export function LightButton({
  onClick = () => console.log("clicked"),
  className = "",
  style = {},
  label = "Botão",
  icon,
  iconAlt = "button icon",
}) {
  return (
    <button
      className={`std-button light-button ${className}`}
      onClick={onClick}
      style={style}
    >
      {icon && <img src={icon} alt={iconAlt} className="std-button-icon" />}
      <p className="std-button-p">{label}</p>
    </button>
  );
}
