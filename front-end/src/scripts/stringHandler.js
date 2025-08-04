export function capitalize(string) {
    const newString = string[0].toUpperCase() + string.slice(1)
    return newString
}

export function printReais(valor) {
    valor = Number.parseFloat(valor).toFixed(2)
    return `R$ ${valor}`

}