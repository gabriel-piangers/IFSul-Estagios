import { Header } from "../components/Header";
import { LightButton } from "../components/LightButton";
import { useNavigate } from "react-router";
import addIcon from "../assets/plusIcon.svg";
import LayersIcon from "../assets/Layers.svg";


export function CopexDashboard() {
  const navigate = useNavigate()

  const handleAddVaga = () => {
    navigate('/insert')
  };

  const handleCheckVagas = () => {
    navigate('/posts')
  };

  return (
    <>
      <Header />

      <main className="copex-main">

        <div className="copex-buttons">
          <LightButton
            icon={addIcon}
            iconAlt="Icone de mais"
            label="Adicionar Vaga"
            onClick={handleAddVaga}
            style={{ width: "25%" }}
          />

          <LightButton
            icon={LayersIcon}
            iconAlt="Icone de camadas"
            label="Ver Vagas publicadas"
            onClick={handleCheckVagas}
            style={{ width: "25%" }}
          />
        </div>
      </main>
    </>
  );
}
