import { LightButton } from "./LightButton";
import { GreenButton } from "./GreenButton";
import { useState } from "react";
import "../styles/ConfirmAlert.css";

export function ConfirmAlert({
  open = false,
  onCancel = null,
  onConfirm = null,
  title = "",
  message = "",
}) {
  const [isOpen, setIsOpen] = useState(open);
  if (!onCancel)
    onCancel = () => {
      setIsOpen(false);
    };
  if (!onConfirm)
    onConfirm = () => {
      setIsOpen(false);
    };
  if (isOpen) {
    return (
      <div className="confirm-backdrop">
        <div className="confirm-panel">
          <h2 className="conrifm-title">{title}</h2>
          <p className="confrim-p">{message}</p>

          <div className="flex-container">
            <LightButton
              label="Cancelar"
              onClick={onCancel}
            />
            <GreenButton
              label="Confirmar"
              onClick={onConfirm}
            />
          </div>
        </div>
      </div>
    );
  } else return null;
}
