import { Header } from "../components/Header";
import { SearchForm } from "../components/searchForm";
import { LightButton } from "../components/LightButton";
import { useNavigate } from "react-router";
import { cidadeOpt, cursoOpt } from "../scripts/memoDB";
import addIcon from "../assets/plusIcon.svg";
import LayersIcon from "../assets/Layers.svg";

export function CopexDashboard() {
  const navigate = useNavigate()

  const handleAddVaga = () => {
    navigate('/insert')
  };

  const handleCheckVagas = () => {
    navigate('/search')
  };

  return (
    <>
      <Header />

      <main className="copex-main">
        <SearchForm cidades={cidadeOpt} cursos={cursoOpt} />

        <div className="copex-buttons">
          <LightButton
            icon={addIcon}
            iconAlt="Icone de mais"
            label="Adicionar Vaga"
            onClick={handleAddVaga}
            style={{ width: "30%" }}
          />

          <LightButton
            icon={LayersIcon}
            iconAlt="Icone de camadas"
            label="Ver Vagas publicadas"
            onClick={handleCheckVagas}
            style={{ width: "30%" }}
          />
        </div>
      </main>
    </>
  );
}
