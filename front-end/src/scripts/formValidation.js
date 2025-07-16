export function validatePassword(password) {
if (password.length < 8) return false

let [upper, lower, number] = [false, false, false]
    for (const char of password) {
        if(!isNaN(parseInt(char))) {
            number = true
            continue
        } else {
            if (char === char.toLowerCase()) lower = true
            if (char === char.toUpperCase()) upper = true
        }
    }

    return (upper && lower && number)
}