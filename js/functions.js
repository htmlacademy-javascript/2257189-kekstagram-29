function stringLengthCheck(string, maxLength) {
  return string.length <= maxLength;
}

stringLengthCheck('рандомная строка', 15);

function polindrom(string) {
  string = string.replaceAll(' ', '').toLowerCase();
  let newString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }
  return newString === string
}
