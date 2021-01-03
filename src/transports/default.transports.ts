import prettyError from 'pretty-error';
import winston from 'winston';

const pe = new prettyError();

export const devTransport = new winston.transports.Stream({
  stream: process.stdout,
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.timestamp(), // add timestamp key
    winston.format.colorize(), // add color to the level tag
    winston.format.printf((info) => {
      // unpack variables
      const { level, message, timestamp, ...meta } = info;
      // format for timestamp
      const ts: string = timestamp.slice(0, 19).replace('T', ' ').split(' ')[1];
      // logger format to console
      const { extra, context } = meta;
      let logMessage = `${level}(${context || 'App'}) @ ${ts}  ${message}`;
      try {
        const object = extra[0];
        if (object.meta) {
          logMessage += `\n${JSON.stringify(object.meta, null, 2)}`;
        }
        if (object.trace) {
          const pretty = pe.render(object.trace);
          logMessage += `\n${pretty}`;
        }
      } catch (error) {}
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
