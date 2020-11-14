const {
  camelCase
} = require('change-case');
const replaceQueryStrings = require(
  './replace-query-string'
);
const {
  HTTP_INSTANCE, SERVER_URL, API_VERSION_KEY, API_VERSION_VALUE
} = require('../constans');

const makeRequest = (requestObject) => {
  const camelName = camelCase(requestObject.name);

  const queryParams = requestObject.request.url.variable
        && requestObject.request.url.variable.reduce((acc, item) => [...acc, item.key],
          []);


  let { url } = requestObject.request;
  if (typeof (requestObject.request.url) !== 'string') {
    url = requestObject.request.url.raw;
  }

  const query_url = replaceQueryStrings(queryParams, url.replace(SERVER_URL, '').replace(API_VERSION_KEY, API_VERSION_VALUE));
  const method = requestObject.request.method.toLowerCase();


  return {
    HTTP_INSTANCE,
    method,
    name: camelName,
    query_params: queryParams && queryParams.join(' , '),
    query_url
  };
};

module.exports = makeRequest;
