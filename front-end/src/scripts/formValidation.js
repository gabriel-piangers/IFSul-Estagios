export function validatePassword(password) {
  if (password.length < 8) return false;

  let [upper, lower, number] = [false, false, false];
  for (const char of password) {
    if (!isNaN(parseInt(char))) {
      number = true;
      continue;
    } else {
      if (char === char.toLowerCase()) lower = true;
      if (char === char.toUpperCase()) upper = true;
    }
  }

  return upper && lower && number;
}

export function validateEmail(email) {
  const domainStart = email.indexOf("@");
  const domain = email.slice(domainStart, email.length);
  if (domain === "@academico.ifsul.edu.br" || domain === "@ifsul.edu.br")
    return true;
  return false;
}

export function loginErrors(status) {
  if(!status) return "Erro ao comunicar com o servidor! Tente novamente mais tarde"
  switch (status) {
    case 400:
      return "Preecha todos os campos!";
    case 401:
      return "Credênciais inválidas";
    case 500:
      return "Erro interno! Tente novamente mais tarde";
    default:
      return "Erro inesperado";
  }
}
