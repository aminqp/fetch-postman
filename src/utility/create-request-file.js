const fs = require('fs');

const {
  camelCase, pascalCase, snakeCase, paramCase
} = require('change-case');
const replaceQueryStrings = require('./replace-query-string');

// create request file per request
const createRequestFile = async (path, requestObject) => {
  const camelName = camelCase(requestObject.name.replace(' ', ''));
  const paramName = paramCase(requestObject.name.replace(' ', ''));

  const queryParams = requestObject.path_variable
          && requestObject.path_variable.reduce((acc, item) => [...acc, item.key], []);

  // eslint-disable-next-line no-undef
  const contents = requestTemplate({
    method: requestObject.method,
    name: camelName,
    query_params: queryParams && queryParams.join(' , '),
    query_url: replaceQueryStrings(queryParams, requestObject.absolute_url)
  });

  return fs.writeFile(
    [path, `${paramName}.js`].join('/'),
    contents,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(
        //     "\n createRequestFile successfully -> ",
        //     requestObject.name
        // );
        // console.log("createRequestFile path -> ", path);
        // console.log("\n\n");
      }
    }
  );
};

module.exports = createRequestFile;
