export function capitalize(string) {
    const newString = string[0].toUpperCase() + string.slice(1).toLowerCase()
    return newString
}