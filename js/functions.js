function stringLengthCheck(string, maxLength) {
  return string.length <= maxLength;
}

stringLengthCheck('рандомная строка', 15);

function palindrome(string) {
  string = string.replaceAll(' ', '').toLowerCase();
  let newString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }
  return newString === string
}


const startWorkDay =
const endWorkDay =
const startMeeting =
const durationMeeting = ;

const woktTime = {'08:00', '17:30', '14:00', 90}; // true
woktTime('8:0', '10:0', '8:0', 120);     // true
woktTime('08:00', '14:30', '14:00', 90); // false
woktTime('14:00', '17:30', '08:0', 90);  // false
woktTime('8:00', '17:30', '08:00', 900); // false

const phase = workTime.split(',');
console.log(phase)
