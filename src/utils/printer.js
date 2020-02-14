const chalk = require('chalk');

const DEFAULT_TEMPLATE_GETTER = (message) => message;
const DEFAULT_WRITER = process.stdout;

function makePrinter(template = DEFAULT_TEMPLATE_GETTER, out = DEFAULT_WRITER) {
  return (message, removeLineBreak = false) => {
    const messageString =
      typeof message === 'function' ? message(chalk) : message;

    out.write(template(messageString) + (removeLineBreak ? '' : '\n'));
  };
}

const print = makePrinter();
const warn = makePrinter((str) => chalk`{yellow warning} ${str}`);
const error = makePrinter((str) => chalk`{red error} ${str}`, process.stderr);

function die(message, status = 1) {
  error(message);
  process.exit(status);
}

module.exports = {
  print,
  warn,
  error,
  die
};
