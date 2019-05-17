const packageConfig = require('../package.json');

require('dotenv').config();
const devConfig = require('./dev');
const prodConfig = require('./prod');
const testConfig = require('./test');

const production = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod';
const test = process.env.NODE_ENV === 'test';
const development = !(production || test);

if (development) {
  devConfig.env = 'development';
  devConfig.appName = packageConfig.name;
  module.exports = Object.freeze(devConfig);
}
if (production) {
  prodConfig.env = 'production';
  prodConfig.appName = packageConfig.name;
  module.exports = Object.freeze(prodConfig);
}
if (test) {
  testConfig.env = 'test';
  testConfig.appName = packageConfig.name;
  module.exports = Object.freeze(testConfig);
}
