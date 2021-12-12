const {
  deleteOldRepoDirectory,
  createDirectory,
  addIndexFile,
  createCollectionTreeV2
} = require('./utility');

const getPostmanV2 = async ({
  postmanData,
  requestTemplate,
  indexTemplate,
  requestGroupTemplate,
  outputPath
// eslint-disable-next-line consistent-return
}) => {
  if (!postmanData) {
    console.log('##--> getPostmanV2 => need postman data');
    return null;
  }

  try {
    // generate folders and files from collectionTree
    await createCollectionTreeV2(postmanData, outputPath,
      requestGroupTemplate, indexTemplate);

    const repoNames = await postmanData.map(
      (item) => item.name
    );
    await addIndexFile(indexTemplate, outputPath, repoNames, true);
  } catch (e) {
    console.log('##-> getPostmanV2 -> catch -> ', e);
  }
};

module.exports = getPostmanV2;
