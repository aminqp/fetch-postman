const {
  paramCase
} = require('change-case');
const createRequestGroupFile = require('./create-request-group-file');
const createDirectory = require('./create-directory');
const addIndexFile = require('./add-index-file');

const sortNote = (nodeItems, name) => {
  let requests = [];
  let subDirs = [];

  if (!Array.isArray(nodeItems)) {
    return ({
      requests,
      subDirs
    });
  }
  requests = nodeItems.filter((nodeItem) => nodeItem.request);
  subDirs = nodeItems.filter((nodeItem) => nodeItem.item);

  return ({
    requests,
    subDirs
  });
};

const createCollectionTreeV2 = async (
  treeMap, destPath, requestGroupTemplate, indexTemplate) => {
  try {
    if (Array.isArray(treeMap)) {
      treeMap.map(async (node) => {
        try {
          const paramCaseName = paramCase(node.name);
          const newPath = [destPath, paramCaseName].join('/');

          const { requests, subDirs } = sortNote(node.item, newPath);

          if (requests.length > 0) {
            await createRequestGroupFile(destPath, paramCaseName,
              requests,
              requestGroupTemplate, true);
          }
          // if current node has sub folder lets create that by recursive
          // callback
          if (subDirs.length > 0) {
            await createDirectory(newPath);
            const dirList = node.item.reduce((acc, dirObj) => {
              if (dirObj.item && dirObj.item.length > 0) {
                return [...acc, dirObj.name];
              }
              return [...acc];
            }, []);
            await addIndexFile(indexTemplate, newPath, dirList);

            return await createCollectionTreeV2(subDirs, newPath,
              requestGroupTemplate, indexTemplate);
          }
        } catch (e) {
          throw new Error(`createCollectionTreeV2 - treeMap.map = ${e}`);
        }
      });
    }
  } catch (e) {
    throw new Error(`createCollectionTreeV2 => e -> ${e}`);
  }
};

module.exports = createCollectionTreeV2;
