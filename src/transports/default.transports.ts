import PrettyError from 'pretty-error';
import stripAnsi from 'strip-ansi';
import winston from 'winston';
const pe = new PrettyError();

export const devTransport = new winston.transports.Stream({
  stream: process.stdout,
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.timestamp(), // add timestamp key
    winston.format.colorize(), // add color to the level tag
    winston.format.simple(),
    /** custom log format for development */
    winston.format.printf((info) => {
      // unpack variables
      const { level, message, timestamp, ...meta } = info;
      // format for timestamp
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      // logger format to console
      let logMessage = `${ts} | ${
        meta.context || 'App'
      } | ${level} » ${message}`;
      // as level has some hidden ansi strings, we need to strip them before comparing if level type is 'error'
      if (stripAnsi(level) === 'error') {
        // render error message
        const errorMsg = meta.extra[0]?.trace;
        const pretty = pe.render(errorMsg);
        logMessage += '\n' + pretty;
      }
      return logMessage;
    }),
  ),
});

export const consoleTransport = new winston.transports.Stream({
  stream: process.stdout,
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.uncolorize(),
    winston.format.json({ space: 2 }),
    winston.format.logstash(),
    winston.format.metadata(),
  ),
});
