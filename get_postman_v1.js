const {
  findNode,
  addIndexFile,
  createCollectionTree
} = require('./utility');


const getPostmanV1 = async ({
  postmanData,
  requestTemplate,
  indexTemplate,
  requestGroupTemplate,
  outputPath
}) => {
  try {
    // create collection tree from postman json file
    const collectionTree = await findNode(null,
      postmanData.folders, postmanData.requests);

    // generate folders and files from collectionTree object
    await createCollectionTree(collectionTree, outputPath,
      requestGroupTemplate, indexTemplate);

    const repoNames = await collectionTree.map(
      (item) => item.isRepo && item.name
    );
    await addIndexFile(indexTemplate, outputPath, repoNames, true);
  } catch (e) {
    console.log('##-> getPostmanV1 -> catch -> ', e);
  }
};

module.exports = getPostmanV1;
