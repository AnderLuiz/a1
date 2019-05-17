import expressWinston from 'express-winston';
import fluentd from 'fluent-logger';
import winston from 'winston';

import config from '../../config';

const FluentTransport = fluentd.support.winstonTransport();

const formatLog = winston.format(log => ({ ...log, ...{ origin: 'api', env: config.env } }));

const logger = expressWinston.errorLogger({
  format: winston.format.combine(
    formatLog(),
    winston.format.json(),
  ),
  transports: [
    ...(config.fluentd ? [new FluentTransport(config.appName, config.fluentd)] : []),
    new winston.transports.Console(),
  ],
  msg: '{{err.message}}',
});

module.exports = logger;
