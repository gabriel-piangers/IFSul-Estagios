import { Header } from "../components/Header";
import { LightButton } from "../components/LightButton";
import { useNavigate } from "react-router";
import addIcon from "../assets/plusIcon.svg";
import LayersIcon from "../assets/Layers.svg";
import "../styles/CopexDashboard.css";

export function CopexDashboard() {
  const navigate = useNavigate();

  const handleAddVaga = () => {
    navigate("/insert");
  };

  const handleCheckVagas = () => {
    navigate("/posts");
  };

  return (
    <>
      <Header />

      <main className="copex-main">
        <h1 className="copex-title">Bem Vindo(a)</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
          quos?
        </p>

        <div className="copex-buttons">
          <LightButton
            icon={addIcon}
            iconAlt="Icone de mais"
            label="Adicionar Vaga"
            onClick={handleAddVaga}
            style={{ width: "50%", height: "4rem" }}
          />

          <LightButton
            icon={LayersIcon}
            iconAlt="Icone de camadas"
            label="Ver Vagas publicadas"
            onClick={handleCheckVagas}
            style={{ width: "50%", height: "4rem" }}
          />
        </div>
      </main>
    </>
  );
}
