import http from 'http';

import app from './app';
import config from './config';
import logger from './logger';

const { httpPort, ip } = config.express;
let httpServer;

/**
 * Listener para o evento "error" do servidor HTTP.
 */
function onHttpError(error) {
  logger.on('finish', () => {
    process.exit(1);
  });
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      logger.error({ message: `http://${ip}:${httpPort} requer privilégios elevados` });
      logger.end();
      break;
    case 'EADDRINUSE':
      logger.error({ message: `http://${ip}:${httpPort} ja está em uso` });
      logger.end();
      // process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Listener para o evento "listening" do servidor HTTP.
 */
function onHttpListening() {
  const addr = httpServer.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `http://${addr.address}:${addr.port}`;
  logger.info({ message: `Rodando no endereço ${bind}` });
}

if (httpPort) {
  httpServer = http.createServer(app);
  httpServer.on('error', onHttpError);
  httpServer.on('listening', onHttpListening);
}

httpServer.listen(httpPort, ip);
