const path = require('path');
const argsParser = require('./utility/arguments-parser');

const pkjson = require(path.resolve('package.json'));
const { config } = argsParser();

const defaultPostmanConfigPath = config || 'postman';

const {
  SERVER_URL,
  API_VERSION_VALUE,
  API_VERSION_KEY,
  POSTMAN_LOCAL_PATH,
  PACKAGE_JSON_PATH,
  COLLECTION_POSTFIX,
  // HTTP_INSTANCE_IMPORT,
  HTTP_INSTANCE
} = pkjson[defaultPostmanConfigPath].configs;

module.exports = {
  // API_VERSION_KEY,
  // API_VERSION_VALUE,
  COLLECTION_POSTFIX,
  HTTP_INSTANCE,
  OUT_PUT: pkjson[defaultPostmanConfigPath].OUT_PUT,
  // HTTP_INSTANCE_IMPORT,
  PACKAGE_JSON_PATH,
  POSTMAN_LOCAL_PATH,
  REPOSITORY_URL: pkjson[defaultPostmanConfigPath].REPOSITORY_URL,
  SERVER_URL
};
