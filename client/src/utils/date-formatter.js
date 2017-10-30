function createDateObjectFromString(datestring) {
  let split = datestring.split('/');
  let date = new Date();
  date.setDate(split[0]);
  date.setMonth(split[1] - 1);
  date.setFullYear(split[2]);
  return date;
}

function setTimestamp(obj) {
  obj.timestamp = {
    created: createTimestamp(obj.Created),
    updated: createTimestamp(obj.Updated),
  };
  return obj;
}

function fileDate(datestring) {
  let date = createDate(datestring);
  let formatted = getDay(date) + getMonth(date) + getYear(date, 2);
  return formatted;
}

function formatDate(datestring) {
  let date = createDate(datestring);
  let formatted = getDay(date) + '/' + getMonth(date) + '/' + getYear(date, 4);
  return formatted;
}

function createTimestamp(dateString) {
  let date = createDate(dateString);
  return getDay(date) + '/' + getMonth(date) + '/' + getYear(date, 4) + ' ' + getHours(date) + ':' + getMinutes(date);
}

function createDate(string) {
  try {
    return new Date(string);
  } catch (e) {
    return new Error('not a date');
  }
}

function getDay(date) {
  return addZero(date.getDate());
}

function getMonth(date) {
  return addZero(date.getMonth() + 1);
}

function getYear(date, digits) {
  return date
    .getFullYear()
    .toString()
    .slice(-digits);
}

function getHours(date) {
  return addZero(date.getHours());
}

function getMinutes(date) {
  return addZero(date.getMinutes());
}

function addZero(number) {
  return ('0' + number).slice(-2);
}

function getTime(date) {
  return date.getHours() + ':' + date.getMinutes();
}

function getWeekday(date) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = weekdays[date.getDay()];
  return day;
}

function getLongDateString(d) {
  const locale = 'en-us';
  const time = getTime(d);
  const day = getWeekday(d);
  const date = d.getDate();
  const month = d.toLocaleString(locale, { month: 'long' });
  const year = d.getFullYear();
  return `${time} ${day} ${date} ${month} ${year}`;
}

const DateFormatter = {
  createTimestamp: createTimestamp,
  setTimestamp: setTimestamp,
  formatDate: formatDate,
  fileDate: fileDate,
  createDateObjectFromString: createDateObjectFromString,
  getLongDateString: getLongDateString,
};

export default DateFormatter;
