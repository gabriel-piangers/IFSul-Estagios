export function capitalize(string) {
  const newString = string[0].toUpperCase() + string.slice(1);
  return newString;
}

export function printReais(valor) {
  valor = Number.parseFloat(valor).toFixed(2);
  return `R$ ${valor}`;
}

export function convertUrlsToLinks(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  );
}

export function printPublishedTime(data) {
  const date = new Date(data);
  const now = new Date();
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  if (diffInDays < 1) {
    return "Hoje";
  } else if (diffInDays === 1) {
    return "Ontem";
  } else {
    return `Há ${diffInDays} dias`;
  }
}
