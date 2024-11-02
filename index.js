const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
    "/"];

const form = document.getElementById('form')
const passwords = document.getElementsByClassName('password')

form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(form)
    const length = formData.get('passwordLength')
    const includeSymbols = formData.get('includeSymbols') === 'on'
    const includeNumbers = formData.get('includeNumbers') === 'on'
    const filteredArray = filterCharacters(includeNumbers, includeSymbols)


    for (let element of passwords) {
        element.lastChild.textContent =
            generatePassword(length, filteredArray)
    }
})

function generatePassword(lenght, filteredArray) {
    let password = ""
    for (let i = 0; i < lenght; i++) {
        const randomChar = filteredArray[
            Math.floor(Math.random() * filteredArray.length)]
        password += randomChar
    }
    return password
}

function filterCharacters(includeNumbers, includeSymbols) {
    let filteredCharacters = characters
    filteredCharacters = filteredCharacters.filter((char) =>
        (includeNumbers || isNaN(char)) &&
        (includeSymbols || isNotSymbol(char))
    )
    return filteredCharacters
}

function isNotSymbol(char) {
    const charCode = char.charCodeAt(0)
    return (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122) ||
        (charCode >= 48 && charCode <= 57)
}