const fs = require('fs');
const path = require('path');
const {
  camelCase, pascalCase, snakeCase, paramCase
} = require('change-case');
const { COLLECTION_POSTFIX } = require('../constans');

const addIndexFile = async (indexTemplate, filePath, stackNames, isRepo = false) => {
  try {
    const convertedNames = stackNames.reduce((acc, item) => {
      const camelName = camelCase(item.replace(' ', ''));
      const pascalName = pascalCase(item.replace(' ', ''));
      const paramName = paramCase(item.replace(' ', ''));

      return {
        ...acc,
        [isRepo
          ? `${pascalName}${COLLECTION_POSTFIX}`
          : camelName]: paramName
      };
    }, {});

    const contents = indexTemplate({
      dirOrFile: convertedNames
    });

    return await fs.writeFile(path.join(filePath, 'index.js'), contents, (err) => {
      if (err) {
        console.log(err);
      } else {
        // console.log("\n addIndexFile successfully -> ", path);
        // console.log("\n\n");
      }
    });
  } catch (e) {
    throw new Error(`addIndexFile = ${e}`);
  }
};

module.exports = addIndexFile;
