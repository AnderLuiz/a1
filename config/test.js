
// Configuração de desenvolvimento
const testConfig = {
  express: {
    httpPort: process.env.HTTP_PORT || 3000,
    ip: process.env.IP || '0.0.0.0',
    corsWhitelist: [
      'http://localhost:3000',
      'http://localhost:3002',
      'http://localhost:3003',
    ],
  },
  fluentd: {
    host: 'fluentd',
    port: 24224,
    timeout: 3.0,
    reconnectInterval: 180000,
    requireAckResponse: false,
  },
};

module.exports = testConfig;
