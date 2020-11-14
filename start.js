const { camelCase } = require('change-case');
const handlebars = require('handlebars');
const {
  loadPostman,
  saveNewPostmanData,
  deleteOldRepoDirectory,
  openFile,
  createDirectory
} = require('./utility');

const getPostmanV1 = require('./get_postman_v1');
const getPostmanV2 = require('./get_postman_v2');

const { POSTMAN_LOCAL_PATH, PACKAGE_JSON_PATH } = require('./constans');

// define global variables
let requestTemplateString;
let indexTemplateString;
let requestGroupTemplateString;
let requestTemplate;
let indexTemplate;
let requestGroupTemplate;
let POSTMAN_LOCAL;
let isV1 = false;

// define handlebars helper function
handlebars.registerHelper('ifEquals', function (a, b, opts) {
  if (a === b) {
    return opts.fn(this);
  }
  return opts.inverse(this);
});

handlebars.registerHelper('camelCase', (name) => camelCase(name));

// open local postman async
try {
  POSTMAN_LOCAL = JSON.parse(openFile(POSTMAN_LOCAL_PATH));
} catch (e) {
  POSTMAN_LOCAL = null;
}

// open package.json file
const PACKAGE_JSON = JSON.parse(openFile(PACKAGE_JSON_PATH));

// get config from package.json -> postman
const postmanRepositoryUrl = PACKAGE_JSON.postman.repository_url;
const outputPath = PACKAGE_JSON.postman.target;

const start = async (postmanData) => {
  try {
    isV1 = !!postmanData.folders;
    // open template files and store in globals
    requestTemplateString = await openFile(
      '/postman/templates/request-template.hbs'
    );
    indexTemplateString = await openFile(
      '/postman/templates/index-template.hbs'
    );
    requestGroupTemplateString = await openFile(
      '/postman/templates/request-group-template.hbs'
    );

    // make template
    requestTemplate = handlebars.compile(requestTemplateString);
    indexTemplate = handlebars.compile(indexTemplateString);
    requestGroupTemplate = handlebars.compile(requestGroupTemplateString);

    // cleaning old repository if exist
    await deleteOldRepoDirectory(outputPath);

    // create new root directory for repository folder
    await createDirectory(outputPath);

    if (isV1) {
      console.log('####################################');
      console.log('#####                          #####');
      console.log('#####---->    going V1    <----#####');
      console.log('#####                          #####');
      console.log('####################################\n\n');

      await getPostmanV1({
        indexTemplate,
        outputPath,
        postmanData,
        requestGroupTemplate,
        requestTemplate
      });
    } else {
      console.log('####################################');
      console.log('#####                          #####');
      console.log('#####---->    going V2    <----#####');
      console.log('#####                          #####');
      console.log('####################################\n\n');

      await getPostmanV2({
        indexTemplate,
        outputPath,
        postmanData: postmanData.item,
        requestGroupTemplate,
        requestTemplate
      });
    }
  } catch (e) {
    console.log('start -> catch -> ', e);
  }
};

loadPostman(postmanRepositoryUrl)
  .then((newPostmanData) => {
    // start after response
    start(newPostmanData);
    saveNewPostmanData(newPostmanData);
  })
  .catch((e) => {
    console.log('\n\n ##-> start => get postman failed');
    console.log('##-> start => e -> ', e);
    if (POSTMAN_LOCAL) {
      console.log('\n\n ##-> start postman from local');
      start(POSTMAN_LOCAL);
    }
  });
