const SERVER_URL = '{{career_base_url}}';
const POSTMAN_LOCAL_PATH = './postman_local.json';
const PACKAGE_JSON_PATH = './package.json';
const COLLECTION_POSTFIX = 'Repository';
const HTTP_INSTANCE_IMPORT = 'import { HttpClient } from "[path]"'; // replace [path] with npm package name
const HTTP_INSTANCE_DIR_NAME = 'core'; // path from src
const IS_HTTP_INSTANCE_RELATIVE = true; // check if http instance isn't npm package
const HTTP_INSTANCE = 'HttpClient.instance';
const API_VERSION_VALUE = 'api/v1'; // variable value in postman
const API_VERSION_KEY = '{{api_version}}'; // variable key in postman

module.exports = {
  API_VERSION_KEY,
  API_VERSION_VALUE,
  COLLECTION_POSTFIX,
  HTTP_INSTANCE,
  HTTP_INSTANCE_DIR_NAME,
  HTTP_INSTANCE_IMPORT,
  IS_HTTP_INSTANCE_RELATIVE,
  PACKAGE_JSON_PATH,
  POSTMAN_LOCAL_PATH,
  SERVER_URL
};
