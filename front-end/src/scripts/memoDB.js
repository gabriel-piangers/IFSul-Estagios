export const campusOpt = [{ name: "Sapiranga", value: "Sapiranga" }];
export const cursoOpt = [
  { name: "Informática", value: "1" },
  { name: "Eletromecânica", value: "2" },
];

export const turnoOpt = [
  { name: "Manhã", value: "Manhã" },
  { name: "Tarde", value: "Tarde" },
  { name: "Noite", value: "Noite" },
  { name: "Integral", value: "Integral" },
  { name: "Não informado", value: "Não informado" },
];

//cidades
let cidadesCache = null;
let cidadesPromise = null;

export async function getCidades() {
  if (cidadesCache) return cidadesCache;
  if (cidadesPromise) return cidadesPromise;

  cidadesPromise = fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados/RS/municipios?orderBy=nome"
  )
    .then((res) => res.json())
    .then((dados) => {
      cidadesCache = dados.map((cidade) => ({
        id: cidade.id,
        name: cidade.nome,
      }));
      cidadesPromise = null;
      return cidadesCache;
    })
    .catch((err) => {
      cidadesPromise = null;
      throw err;
    });

  return cidadesPromise;
}
