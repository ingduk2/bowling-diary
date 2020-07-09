export function getDateYYYYMMDD() {}

export function getMonthMM() {
  const nowDay = new Date();
  const currentMonth = (nowDay.getMonth() + 1).toString();
  return (currentMonth.length === 1 ? `0` : ``) + currentMonth;
}

export function getYearYYYY() {
  const nowDay = new Date();
  const currentYear = nowDay.getFullYear();
  return currentYear;
}

export function numberAppendZero(number) {
  const numberString = number.toString();
  const resultNumber = (numberString.length === 1 ? '0' : '') + numberString;
  return resultNumber;
}

export function getDayDD() {
  const nowDay = new Date();
  const currentDay = nowDay.getDate().toString();
  return (currentDay.length === 1 ? '0' : '') + currentDay;
}
