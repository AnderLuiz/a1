import fluentd from 'fluent-logger';
import winston from 'winston';

import config from '../config';

const FluentTransport = fluentd.support.winstonTransport();

const formatLog = winston.format((l) => {
  const log = l;
  log.env = config.env;
  if (!log.origin) {
    log.origin = 'api';
    return log;
  }
  return log;
});

let transports;
if (process.env.DISABLE_LOGS === 'true' || process.env.DISABLE_NORMAL_LOGS === 'true') {
  transports = [new winston.transports.Console({ level: 'emerg', silent: true })];
} else {
  transports = [
    ...(config.fluentd
      ? [new FluentTransport(config.appName, config.fluentd)]
      : [new winston.transports.Console()]),
  ];
}

const logger = winston.createLogger({
  format: winston.format.combine(
    formatLog(),
    winston.format.json(),
  ),
  level: 'debug',
  transports,
  exceptionHandlers: [
    ...(config.fluentd ? [new FluentTransport(config.appName, config.fluentd)] : []),
    new winston.transports.Console(),
  ],
});

logger.exitOnError = true;

module.exports = logger;
