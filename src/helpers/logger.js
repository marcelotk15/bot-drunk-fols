import { bgBlue, black, green } from 'chalk'

const dateTimePad = (value, digits) => {
  let number = value
  while (number.toString().length < digits) {
    number = '0' + number
  }

  return number;
}

const formatDate = (date) => {
  return (
    date.getFullYear() + '-' +
    dateTimePad((date.getMonth() + 1), 2) + '-' +
    dateTimePad(date.getDate(), 2) + ' ' +
    dateTimePad(date.getHours(), 2) + ':' +
    dateTimePad(date.getMinutes(), 2) + ':' +
    dateTimePad(date.getSeconds(), 2) + "." +
    dateTimePad(date.getMilliseconds(), 2)
  )
}

export default {
  log (content, type = log) {
    const date = `[${formatDate(new Date(Date.now()))}]:`

    switch (type) {
      // Check the message type and then print him in the console
      case 'log': {
        return console.log(`${date} ${bgBlue(type.toUpperCase())} ${content} `);
      }
      case 'warn': {
        return console.log(`${date} ${black.bgYellow(type.toUpperCase())} ${content} `);
      }
      case 'error': {
        return console.log(`${date} ${black.bgRed(type.toUpperCase())} ${content} `);
      }
      case 'debug': {
        return console.log(`${date} ${green(type.toUpperCase())} ${content} `);
      }
      case 'cmd': {
        return console.log(`${date} ${black.bgWhite(type.toUpperCase())} ${content}`);
      }
      case 'ready': {
        return console.log(`${date} ${black.bgGreen(type.toUpperCase())} ${content}`);
      }
      default: throw new TypeError('Logger type must be either warn, debug, log, ready, cmd or error.');
    }
  }
}
