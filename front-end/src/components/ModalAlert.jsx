import "../styles/ModalAlert.css";

export function ModalAlert({
  title = "",
  children,
}) {

    return (
      <div className="modal-backdrop">
        <div className="modal-panel">
          <h2 className="modal-title">{title}</h2>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    );
}
