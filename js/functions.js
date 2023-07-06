//Проверка количества символов

function stringLengthCheck(string, maxLength) {
  return string.length <= maxLength;
}

stringLengthCheck('рандомная строка', 15);

//Полиндром

function palindrome(string) {
  string = string.replaceAll(' ', '').toLowerCase();
  let newString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }
  return newString === string
}

//Проверка рабочего времени

function isMeetingWithinWorkingHours(startWorkingTime, endWorkingTime, startMeetingTime, meetingDuration) {
  const startWorking = convertTimeToMinutes(startWorkingTime);
  const endWorking = convertTimeToMinutes(endWorkingTime);
  const startMeeting = convertTimeToMinutes(startMeetingTime);
  const endMeeting = startMeeting + meetingDuration;

  if (startMeeting >= startWorking && endMeeting <= endWorking) {
    return true;
  } else {
    return false;
  }
}

function convertTimeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

console.log(isMeetingWithinWorkingHours('08:00', '17:30', '14:00', 90))
console.log(isMeetingWithinWorkingHours('8:0', '10:0', '8:0', 120))
console.log(isMeetingWithinWorkingHours('08:00', '14:30', '14:00', 90))
console.log(isMeetingWithinWorkingHours('14:00', '17:30', '08:0', 90))
console.log(isMeetingWithinWorkingHours('8:00', '17:30', '08:00', 900))
