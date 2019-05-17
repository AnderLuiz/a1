import expressWinston from 'express-winston';
import fluentd from 'fluent-logger';
import winston from 'winston';

import config from '../../config';

const FluentTransport = fluentd.support.winstonTransport();

const formatLog = winston.format(log => ({ ...log, ...{ origin: 'api', env: config.env } }));

const transports = [
  ...(config.fluentd ? [new FluentTransport(config.appName, config.fluentd)] : [new winston.transports.Console()]),
];

const logger = expressWinston.logger({
  format: winston.format.combine(
    formatLog(),
    winston.format.json(),
  ),
  transports,
  expressFormat: false,
  colorize: false,
  meta: true,
  msg: (req, res) => `${
    req.method} ${
    req.url} ${
    req.body.operationName || ''} ${
    res.statusCode} ${
    res.responseTime}ms `,
  requestWhitelist: [...expressWinston.requestWhitelist, 'body', 'user'],
  responseWhitelist: [...expressWinston.responseWhitelist, 'body'],
});

module.exports = logger;
