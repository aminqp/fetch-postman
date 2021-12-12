const fs = require('fs');
const path = require('path');
const makeRequestV2 = require('./make-request-v2');
const makeRequestV1 = require('./make-request');
const { HTTP_INSTANCE_IMPORT, HTTP_INSTANCE_DIR_NAME, IS_HTTP_INSTANCE_RELATIVE } = require('../constans');

const createRequestGroupFile = async (
  pathDire, fileName, requests, requestGroupTemplate, isV2 = false) => {
  let requestForTemplate = null;

  const newPath = path.relative(pathDire, 'src');

  if (isV2) {
    requestForTemplate = await requests.map((req) => makeRequestV2(req));
  } else {
    requestForTemplate = await requests.map((req) => makeRequestV1(req));
  }

  let headerImporter = HTTP_INSTANCE_IMPORT;

  if (IS_HTTP_INSTANCE_RELATIVE) {
    headerImporter = HTTP_INSTANCE_IMPORT.replace(/\[path\]/, `${newPath}/${HTTP_INSTANCE_DIR_NAME}`);
  }

  const contents = requestGroupTemplate({
    HTTP_INSTANCE_IMPORT: headerImporter,
    requests: requestForTemplate
  });

  return fs.writeFile(
    [pathDire, `${fileName}.js`].join('/'),
    contents,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        // console.log("createRequestFile pathDire -> ", pathDire);
        // console.log("\n");
      }
    }
  );
};

module.exports = createRequestGroupFile;
